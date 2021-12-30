class EventBus {
  listeners: Record<string, Array<<T>(...args: [T]) => void>> = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: <T>(...args: [T]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: <T>(...args: [T]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit<T>(event: string, ...args: Array<T>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      listener(...args);
    });
  }
}

export default EventBus;
