import SingleTrack from "@/packages/SingleTrack";

class Task {
  constructor(data) {
    this.data = data;
    this.history = []
    this.data.history.forEach((historyItem) => {
      const st = new SingleTrack(historyItem);
      this.history.push(st)
    });

    this.collapse = false;
  }

  get asanaLink() {
    return this.data.task?.url
  }

  get rawHistory() {
    return this.data.history
  }

  get time() {
    return this.data.time
  }

  get name() {
    return this.data.task.name
  }
}

export default Task