const BASE_URL = "https://api.everhour.com";

const api = {
  setToken(token) {
    this.token = token;
  },

  me() {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        "X-Api-Key": this.token,
      },
    }).then((res) => res.json());
  },

  time(uid, config = {}) {
    if (!config.from || !config.to) {
      config.from = formatDate(new Date());
      config.to = formatDate(new Date());
    }

    if(!config.limit){
      config.limt = 100;
    }

    if(!config.page){
        config.page = 1;
    }

    if (config.from instanceof Date) {
      config.from = formatDate(config.from);
    }

    if (config.to instanceof Date) {
      config.to = formatDate(config.to);
    }

    const query = new URLSearchParams(config).toString();

    return fetch(`${BASE_URL}/users/${uid}/time?${query}`, {
      headers: {
        "X-Api-Key": this.token,
      },
    }).then((res) => res.json());
  },

  currentTimer(){
    return new Promise((resolve) => {
      fetch(`${BASE_URL}/timers/current`, {
        headers: {
          "X-Api-Key": this.token,
        },
      }).then((res) => res.json())
      .then(res => {
        if(res.status !== 'active') {
          resolve(0)
        } else {
          resolve(res.duration)
        }
      });
    })
  }
};

export default api;

function formatDate(date){
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return `${ye}-${mo}-${da}`
}