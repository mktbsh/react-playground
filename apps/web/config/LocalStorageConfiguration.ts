export type AppConfigurationValue<T> = T | undefined;

export type ChangeHandler<T> = (newValue: AppConfigurationValue<T>) => void;

// Exposes an interface for reading and writing user-configurable options and other persistent application state.
export interface AppConfiguration {
  // get the current value for the key
  get<T>(key: string): AppConfigurationValue<T>;
  // set key to value - This returns a promise to track the progress for setting the value
  set<T>(key: string, value: AppConfigurationValue<T>): Promise<void>;
  // register a change handler for a particular key
  addChangeListener<T>(key: string, cb: ChangeHandler<T>): void;
  // remove a change handler on a given key
  removeChangeListener<T>(key: string, cb: ChangeHandler<T>): void;
}

let instance: AppConfiguration = null;

const keyPrefix = "react-playground";

export function LocalStorageConfiguration(defaults?: {
  [key: string]: AppConfigurationValue<unknown>;
}): AppConfiguration {
  if (instance) return instance;

  const changeListeners = new Map<string, Set<ChangeHandler<unknown>>>();

  function get<T>(key: string): AppConfigurationValue<T> {
    const value = localStorage.getItem(keyPrefix + key);
    try {
      return value == null ? defaults?.[key] : JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  async function set<T>(
    key: string,
    value: AppConfigurationValue<T>
  ): Promise<void> {
    const _key = keyPrefix + key;
    if (value == null) {
      localStorage.removeItem(_key);
    } else {
      const str = JSON.stringify(value);
      localStorage.setItem(_key, str);
    }

    const listeners = changeListeners.get(key);
    if (listeners) {
      [...listeners].forEach((listener) => listener(value));
    }
  }

  function addChangeListener<T>(key: string, cb: ChangeHandler<T>): void {
    const listeners = changeListeners.get(key) || new Set();
    changeListeners.set(key, listeners);
    listeners.add(cb);
  }

  function removeChangeListener<T>(key: string, cb: ChangeHandler<T>): void {
    const listeners = changeListeners.get(key);
    listeners && listeners.delete(cb);
  }

  return {
    get,
    set,
    addChangeListener,
    removeChangeListener,
  };
}
