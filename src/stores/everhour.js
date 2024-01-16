import { todayString, thatYearAndMonth } from "@/utils";
import { defineStore } from 'pinia'
import EHapi from "@/packages/everHourAPI";

import { lastMonthDay } from "@/utils.js";
import Task from "@/packages/Task"

const storageName = "EH_token";
let intervalId = -1;

export const useEHourStore = defineStore("EHour", {
  state: () => ({
    apiKey: null,
    loggedIn: false,
    loading: false,
    meLoading: false,
    currentStateLoading: false,
    _currentTimer: 0,
    _tasks: {},
    _self: null,
  }),

  actions: {
    setToken(token) {
      this.apiKey = token;
      EHapi.setToken(token);
      localStorage.setItem(storageName, token);
    },

    init() {
      const token = localStorage.getItem(storageName);
      if (token) {
        this.setToken(token);
        this.loggedIn = true;
      }
    },

    async me() {
      if (this._self) {
        return this._self;
      }

      this.meLoading = true;
      try {
        this._self = await EHapi.me();
        this.loggedIn = true;
        return this._self;
      } finally {
        this.meLoading = false;
      }
    },

    async getTasks(data) {
      if (this.loading) return;

      this.loading = true;
      const me = await this.me();
      try {
        return await EHapi.time(me.id, data);
      } finally {
        this.loading = false;
      }
    },

    async getTasksFromTo(from, to) {
      let tasks
      if (!to) {
        tasks = await this.getTasks(from);
      } else {
        tasks = await this.getTasks({
          from,
          to,
        });
      }

      if (!tasks) {
        return [];
      }
      tasks.reverse();

      const clearedDates = [];
      tasks.forEach((task) => {
        if (!this._tasks[task.date] || !clearedDates.includes(task.date)) {
          this._tasks[task.date] = [];
          clearedDates.push(task.date);
        }
        this._tasks[task.date].push(new Task(task));
      });
      return tasks;
    },

    async getMonthTasks(dateWithMonth = new Date()) {
      const month = dateWithMonth.getMonth();
      const dataToFetch = {
        from: new Date(dateWithMonth.setMonth(month, 1)),
        to: lastMonthDay(dateWithMonth, month)
      };
      return await this.getTasksFromTo(dataToFetch);
    },

    getCurrentTimer() {
      if (this.currentStateLoading) return;
      this.currentStateLoading = true;
      return new Promise((resolve) => {
        EHapi.currentTimer()
          .then((res) => {
            if (intervalId >= 0) {
              clearInterval(intervalId);
            }

            this._currentTimer = res;
            if (res !== 0) {
              this._currentTimer = res;
              intervalId = setInterval(() => {
                this._currentTimer += 1;
              }, 1000);
            }
            resolve(res);
          })
          .finally(() => {
            this.currentStateLoading = false;
          });
      });
    },

    logout() {
      localStorage.removeItem(storageName);
    },
  },

  getters: {
    isLoading: (state) => (state.loading || state.meLoading) && !state._tasks,
    isLoggedIn: (state) => state.loggedIn,
    tasks: (state) => state._tasks,
    self: (state) => state._self,
    currentTimer: (state) => state._currentTimer,
    thatMonthHours: (state) => {
      const todayYearAndMonth = thatYearAndMonth();
      return state.getMonthHours(todayYearAndMonth);
    },
    getMonthHours: (state) => (yearAndMonth) => {
      if (state._tasks.length == 0) return 0;
      const times = [];
      Object.entries(state._tasks).forEach(([date, day]) => {
        if (date.startsWith(yearAndMonth)) {
          times.push(...day.map((task) => task.time));
        }
      });
      if (!times || times.length == 0) return 0;
      const result =
        (times.reduce((a, b) => a + b) + state._currentTimer) / 3600;
      return result;
    },
    todayHours: (state) => {
      const today = todayString();
      const todayTasks = state?._tasks[today]
      if(!todayTasks) return 0
      const times = todayTasks.map((el) => el.time);
      if (times.length == 0) return state._currentTimer / 3600;
      const result =
        (times.reduce((a, b) => a + b) + state._currentTimer) / 3600;
      return result;
    },
    id: (state) => {
      return state._self ? state._self.id : null;
    },
    getTasksFromDateToDate: (state) => (from, to) => {
      const fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);
      const toDate = new Date(to);
      toDate.setUTCHours(23, 59, 59, 999);

      const days = {};
      Object.entries(state._tasks).forEach(([date, day]) => {
        const dayDate = new Date(date);
        if(dayDate >= fromDate && dayDate <= toDate) {
          days[date] = day
        }
      })

      return days;
    }
  },
});
