import Hour from '@/packages/hours'

class SingleTrack {
  constructor(history) {
    this.history = history;
    this.time = new Hour(history.time);
  }

  get started() {
    return new Date(this.history.createdAt);
  }

  get length() {
    return this.time;
  }

  get ended() {
    return new Date(this.started.valueOf() + this.length * 1000);
  }
}

export default SingleTrack;