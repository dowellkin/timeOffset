import { defineStore } from 'pinia'
import EHapi from "@/packages/everHourAPI";

const storageName = "EH_token";

export const useEHourStore = defineStore("EHour", {
  state: () => ({
    apiKey: null,
    loggedIn: false,
    loading: false,
    meLoading: false,
    currentStateLoading: false,
    _currentTimer: 0,
    _tasks: null,
    _self: null,
  }),

  actions: {
    setToken(token) {
      this.apiKey = token;
      EHapi.setToken(token);
      localStorage.setItem("EH_token", token);
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
        this._tasks = await EHapi.time(me.id, data);
        return this._tasks;
      } finally {
        this.loading = false;
      }
    },

    getMonthTasks() {
      return this.getTasks({
        from: new Date(new Date().setDate(1)),
        to: lastMonthDay(),
      });
    },

    getCurrentTimer() {
      if (this.currentStateLoading) return;
      this.currentStateLoading = true;
      return new Promise((resolve) => {
        EHapi.currentTimer().then((res) => {
          if(res?.status == "stopped"){
            this._currentTimer = 0;
          } else {
            this._currentTimer = res;
          }
          resolve(res);
        })
        .finally(() => {
          this.currentStateLoading = false;
        })
      });
    },

    init() {
      const token = localStorage.getItem(storageName);
      if (token) {
        this.setToken(token);
        this.loggedIn = true;
      }
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
    hours: (state) => {
      const times = state?._tasks?.map((el) => el.time);
      if (!times || times.length == 0) return 0;
      const result =
        (times.reduce((a, b) => a + b) + state._currentTimer) / 3600;
      return result;
    },
    todayHours: (state) => {
      const d = new Date();
      const todayParts = [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0"),
      ];
      const today = todayParts.join("-");      
      const times = state?._tasks
        ?.filter((el) => {
          return el.date === today;
        })
        .map((el) => el.time);
      if (times.length == 0) return state._currentTimer / 3600;
      const result =
        (times.reduce((a, b) => a + b) + state._currentTimer) / 3600;
      return result;
    },
  },
});

function lastMonthDay() {
  const date = new Date();
  const currentmonth = date.getMonth();
  const nextmonth = currentmonth + 1;
  const nextmonthfirstday = new Date(date.getFullYear(), nextmonth, 1);
  const oneday = 1 * 24 * 3600 * 1000;
  const lasttime = new Date(nextmonthfirstday - oneday);
  return lasttime;
}