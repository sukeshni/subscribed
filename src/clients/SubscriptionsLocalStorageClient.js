import { LocalStorage } from "./LocalStorage";


export class SubscriptionsLocalStorageClient {
  /* This class manages how subscriptions are added/edited/read/deleted from LocalStorage, 
     it only has knowledge that persistance has get and set methods
  */

  keys = {
    SUBSCRIPTIONS_LIST: "subscribed_subscriptions"
  }
 
 localStorage = null;

  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  setSubscriptionsList(subscriptions) {
    this.localStorage.set(this.keys.SUBSCRIPTIONS_LIST, subscriptions);
  }

  getAllSubscriptions() {
    return this.localStorage.get(this.keys.SUBSCRIPTIONS_LIST) || [];
  }
}

const localStorage = new LocalStorage();
export const subscriptionsStoreClient = new SubscriptionsLocalStorageClient(localStorage);