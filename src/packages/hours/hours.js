import { map } from "./utils/functions.js"

class Hours {
  constructor(params, ...rest) {
    if (!new.target) {
      return new Hours(params, ...rest);
    }

    if (typeof params === "number") {
      this.fromMinutes(params);
    }

    if (typeof params === "object") {
      if (Array.isArray(params)) {
        throw new Error("[HOURS]: The array passed. Object or number expected");
      }

      this.hour = Math.floor(params.hour);
      this.minute = params.minute + Math.round(map(params.hour % 1, 0, 1, 0, 60));
    }

    if (!params) {
      this.hour = 0;
      this.minute = 0;
    }
  }

  toString() {
    return `${this.hour}h ${Math.abs(Math.floor(this.minute))}m`;
  }

  toNumber() {
    return this.hour * 60 + this.minute;
  }

  fromMinutes(minutes) {
    const func = minutes < 0 ? Math.ceil : Math.floor;
    this.hour = func(minutes / 60);
    this.minute = minutes % 60;
    return this;
  }

  update() {
    this.fromMinutes(this.toNumber());
    return this;
  }

  add(...args) {
    args = [this, ...args];
    args = args.map((hours) => hours.toNumber());
    let totalMins = args.reduce((a, b) => a + b);
    return new Hours(totalMins);
  }

  sub(...args) {
    args = [this, ...args];
    args = args.map((hours) => {
      return hours.toNumber()
    });
    let totalMins = args.reduce((a, b) => a - b);
    return new Hours(totalMins);
  }
}

const callWihoutNew = function (...args) {
  return new Hours(...args);
};

export default callWihoutNew;