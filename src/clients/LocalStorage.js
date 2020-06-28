import store from "store";


export class LocalStorage {

  get(key) {
    return store.get(key);
  };

  set(key, value) {
    store.set(key, value);
  }
}



