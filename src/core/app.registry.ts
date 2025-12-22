class AppRegistry {
  static instance: AppRegistry;
  instances: any; // Store registered instances

  constructor() {
    if (AppRegistry.instance) {
      return AppRegistry.instance;
    }
    this.instances = new Map();
    AppRegistry.instance = this;
  }

  /**
   * Register an instance with a name
   * @param {string} name
   * @param {object} instance
   */
  register(name: string, instance: object) {
    this.instances.set(name, instance);
  }

  /**
   * Retrieve an instance by name
   * @param {string} name
   * @returns {object|undefined} the stored instance or undefined if not found
   */
  get(name: string) {
    return this.instances.get(name);
  }
}

const appRegistry = new AppRegistry();

export default appRegistry;
