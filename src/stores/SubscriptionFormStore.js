import { action, computed, decorate, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { getServiceSuggestions } from "../utils/serviceSuggestions";

const capitalizeSentence = (sentence) =>
  sentence.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

class SubscriptionFormStore {
  /*
    The purpose of this Store is to hold form state.
  */

  initStore = {
    subscription_logo: "",
    subscription_name: "",
    subscription_plan: "",
    plans: [],
    subscription_currency: "",
    subscription_amount: "",
    subscription_frequency: "monthly",
  }

  formState = {...this.initStore};
  formVisibilityFlag = false;

  get getFormState() {
    return {
      id: uuidv4(),
      logo: this.formState.subscription_logo,
      subscriptionName: capitalizeSentence(this.formState.subscription_name).trim(),
      planName: capitalizeSentence(this.formState.subscription_plan),
      price: this.formState.subscription_amount,
      currency: this.formState.subscription_currency,
      frequency: this.formState.subscription_frequency,
      paymentStatus: "Due in 2 days",
      dueAt: "1590162130",
      addedAt: `${(+new Date() / 1e3) | 0}`, // unix timestamp
    };
  }

  // action
  updateFormState(key, value) {
    this.formState[key] = value;
  }

  // action
  updateFormStateFromSuggestion(serviceSuggestion) {
    this.formState.subscription_logo = serviceSuggestion.logo;
    this.formState.subscription_name = serviceSuggestion.name.trim();
    this.formState.subscription_plan = serviceSuggestion.plan.trim();
    this.formState.plans = serviceSuggestion.plans;
  }

  // action
  updateFormVisibility(value) {
    this.formVisibilityFlag = value;
  }
  

  // action
  clear() {
    this.formState = {...this.initStore};
  }

  // computed
  get subscriptionName() {
    return this.formState.subscription_name;
  }

  // computed
  get serviceSuggestions() {
    return getServiceSuggestions(this.subscriptionName);
  }
}

decorate(SubscriptionFormStore, {
  formState: observable,
  formVisibilityFlag: observable,
  subscriptionName: computed,
  getFormState: computed,
  serviceSuggestions: computed,
  updateFormState: action,
  updateFormStateFromSuggestion: action,
  updateFormVisibility: action,
});

export const subscriptionFormStore = new SubscriptionFormStore();
