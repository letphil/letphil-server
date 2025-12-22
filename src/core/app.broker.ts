class AppBroker {
  events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  on(event: string, handler: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(handler);
  }

  emit(event: string, payload?: any) {
    const handlers = this.events.get(event);
    (this.events.get(event) || []).forEach((fn) => fn(payload));
  }
}

const appBroker = new AppBroker();

export default appBroker;
