import { defineStore } from 'pinia'
import EHapi from "@/packages/everHourAPI";
import { isReferencedIdentifier } from '@vue/compiler-core';

const storageName = "EH_token";

export const useEHourStore = defineStore("EHour", {
  state: () => ({
    apiKey: null,
    loggedIn: false,
    loading: false,
    _tasks: null,
    _self: null,
  }),

  actions: {
    setToken(token) {
      this.apiKey = token;
      EHapi.setToken(token);
      localStorage.setItem("EH_token", token);
    },

    me() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        EHapi.me()
          .then((res) => {
            console.log(res);
            this._self = res;
            this.loggedIn = true;
            resolve(res);
          })
          .catch((err) => {
            console.error(`outer err`, err);
            reject(err);
          })
          .finally(() => {
            this.loading = false;
          });
      })
    },

    getTasks(data) {
      this.loading = true;
      if (this._self) {
        return new Promise((resolve, reject) => {
          EHapi.time(this._self.id, data)
            .then((res) => {
              this._tasks = res;
              resolve(res);
            })
            .catch((err) => {
              console.error("err", err);
              reject(err);
            })
            .finally(() => {
              this.loading = false;
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          EHapi.me()
            .then((res) => {
              this._self = res;
              const id = this._self.id;

              EHapi.time(id, data)
                .then((res) => {
                  this._tasks = res;
                  resolve(res);
                })
                .catch((err) => {
                  console.error("err", err);
                  reject(err);
                })
                .finally(() => {
                  console.log('loaded')
                  this.loading = false;
                });
            })
            .catch((err) => {
              console.error(`outer err`, err);
              reject(err);
            })
        });
      }
    },

    getMonthTasks() {
      return this.getTasks({
        from: new Date(new Date().setDate(1)),
        to: lastMonthDay(),
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
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    isLoggedIn: (state) => state.loggedIn,
    tasks: (state) => state._tasks,
    self: (state) => state._self,
    hours: (state) => {
      const times = state?._tasks?.map(el => el.time);
      if (times.length == 0) return 0;
      const result = times.reduce((a,b) => a + b) / 3600;
      return result;
    }
  },
});

function lastMonthDay() {
  const date = new Date();
  const currentmonth = date.getMonth();
  const nextmonth = currentmonth + 1;
  const nextmonthfirstday = new Date(date.getFullYear(), nextmonth, 1);
  const oneday = 1 * 24 * 3600 * 1000;
  const lasttime = new Date(nextmonthfirstday - oneday);
  console.log(lasttime);
  return lasttime;
}