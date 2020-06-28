import { SubscriptionsStore } from "../SubscriptionsStore";
import { SubscriptionsLocalStorageClient } from "../../clients/SubscriptionsLocalStorageClient";

const testLocalStorage = () => {
  const store = {};

  return {
    set: (key, value) => {
      this.store[key] = value;
    },
    get: (key) => {
      return store[key];
    },
  };
};
const testSubscriptionsStoreClient = new SubscriptionsLocalStorageClient(
  testLocalStorage()
);
const testSubscriptionsStore = new SubscriptionsStore(
  testSubscriptionsStoreClient
);

describe("Add subscription", () => {
  let subscription = {};
  beforeEach(() => {
    // Runs before each test (it)
    // Arrange
    subscription = {
      id: "ef764959-68b4-482a-b033-b20eaf4fa58b",
      logo: "//logo.clearbit.com/netflix.com",
      subscriptionName: "Netflix",
      planName: "Basic",
      price: "999",
      currency: "USD",
      frequency: "weekly",
    };
    testSubscriptionsStore.clearAll();
    testSubscriptionsStore.addSubscription(subscription);
  });

  it("can add valid subscription", () => {
    // Assert
    expect(testSubscriptionsStore.subscriptions[0].subscriptionName).toBe('Netflix');
    expect(testSubscriptionsStore.totalSubscriptions).toBe(1);
  });

  it("can edit subscription", () => {
    //Act
    testSubscriptionsStore.updateSubscription({
      ...subscription,
      subscriptionName: "Amazon"
    });
    // Assert
    expect(testSubscriptionsStore.totalSubscriptions).toBe(1);
    expect(testSubscriptionsStore.subscriptions[0].subscriptionName).toBe('Amazon');
  });

  it("can delete subscription", () => {
    //Act
    testSubscriptionsStore.removeSubscription(subscription.id);
    // Assert
    expect(testSubscriptionsStore.totalSubscriptions).toBe(0);
  });

  it("can find subscription", () => {
    //Act
    const foundSubscription = testSubscriptionsStore.findSubscription(subscription.id)
    // Assert
    expect(foundSubscription.id).toBe(subscription.id);
  });
  

  it("can get subscriptions by frequency correctly", () => {
    // Assert
    expect(testSubscriptionsStore.weeklySubscriptions.length).toBe(1);
    expect(testSubscriptionsStore.monthlySubscriptions.length).toBe(0);
    expect(testSubscriptionsStore.yearlySubscriptions.length).toBe(0);
  });
});
