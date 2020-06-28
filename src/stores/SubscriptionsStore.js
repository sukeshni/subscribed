import { action, computed, decorate, observable, reaction, toJS } from "mobx";
import { subscriptionsStoreClient } from "../clients/SubscriptionsLocalStorageClient";

const getCurrencyPriceMap = (subscriptions) => {
  const currencyPriceMap = {};

  for (const subscription of subscriptions) {
    const currency = subscription.currency;
    const amount = Number(subscription.price);

    currencyPriceMap[currency] = currencyPriceMap[currency] || [];
    currencyPriceMap[currency].push(amount);
  }

  for (const [currency, amounts] of Object.entries(currencyPriceMap)) {
    currencyPriceMap[currency] = amounts.reduce((acc, curr) => acc + curr, 0);
  }

  return currencyPriceMap;
};

const allowedKeys = [
  "id",
  "logo",
  "subscriptionName",
  "planName",
  "price",
  "currency",
  "frequency",
  "dueAt",
  "addedAt",
];

const filterAllowedKeys = (obj, allowedKeysList = []) => {
  const subset = Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedKeysList.includes(key))
  );
  return subset;
};

export class SubscriptionsStore {
  /*
    The purpose of this Store is to act as a cache that provides data to UI.
  */

  _storageClient = null;
  _subscriptions = [];

  constructor(storageClient) {
    this._storageClient = storageClient;
    this._subscriptions = this._storageClient.getAllSubscriptions();
    reaction(
      () => this._subscriptions.length,
      (subscriptionsCount) => {
        const subs = toJS(
          this._subscriptions.map((sub) => filterAllowedKeys(sub, allowedKeys))
        );
        subscriptionsStoreClient.setSubscriptionsList(subs);
      },
      { name: "OnSubscriptionUpdateReaction", fireImmediately: true }
    );
  }

  // computed
  get subscriptions() {
    return this._subscriptions;
  }

  // computed
  get totalSubscriptions() {
    return this.subscriptions.length;
  }

  // computed
  get monthlySubscriptions() {
    return this.subscriptions.filter(
      (subscription) => subscription.frequency === "monthly"
    );
  }

  // computed
  get weeklySubscriptions() {
    return this.subscriptions.filter(
      (subscription) => subscription.frequency === "weekly"
    );
  }

  // computed
  get yearlySubscriptions() {
    return this.subscriptions.filter(
      (subscription) => subscription.frequency === "yearly"
    );
  }

  // computed
  get weeklyTotal() {
    return getCurrencyPriceMap(this.weeklySubscriptions);
  }

  // computed
  get monthlyTotal() {
    return getCurrencyPriceMap(this.monthlySubscriptions);
  }

  // computed
  get yearlyTotal() {
    return getCurrencyPriceMap(this.yearlySubscriptions);
  }

  //action
  addSubscription(subscription) {
    this._subscriptions = [...this._subscriptions, subscription];
  }

  //action
  updateSubscription(subscription) {
    this.removeSubscription(subscription.id);
    this.addSubscription(subscription);
  }

  //action
  findSubscription(id) {
    return this._subscriptions.find((subscription) => subscription.id === id);
  }

  //action
  removeSubscription(id) {
    this._subscriptions = this._subscriptions.filter(
      (subscription) => subscription.id !== id
    );
  }

  //action
  clearAll(id) {
    this._subscriptions = [];
  }
}

decorate(SubscriptionsStore, {
  _subscriptions: observable,
  subscriptions: computed,
  totalSubscriptions: computed,
  monthlySubscriptions: computed,
  weeklySubscriptions: computed,
  yearlySubscriptions: computed,
  weeklyTotal: computed,
  monthlyTotal: computed,
  yearlyTotal: computed,
  addSubscription: action,
  updateSubscription: action,
  findSubscription: action,
  clearAll: action,
});

export const subscriptionsStore = new SubscriptionsStore(
  subscriptionsStoreClient
);
