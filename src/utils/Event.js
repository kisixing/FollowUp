/* eslint-disable no-multi-assign */
class Event {
  constructor() {
    this.events = {};
  }

  on(name, fn) {
    let exists = this.events[name];
    if (!exists) {
      exists = this.events[name] = [];
    }
    exists.push(fn);
  }

  off(name, fn) {
    const exists = this.events[name] || [];
    if (!exists) return;
    if (fn) {
      const index = exists.indexOf(fn);
      if (index > -1) {
        exists.splice(index, 1);
      }
      return;
    }
    delete this.events[name];
  }

  once(name, fn) {
    this.on(name, () => {
      this.off(name, fn);
    });
  }

  emit(name, ...args) {
    const exists = this.events[name];
    if (!exists) return;
    exists.forEach(_ => {
      _(...args);
    });
  }
}
export default new Event();
