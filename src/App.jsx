import React from "react";
import "./App.css";
import { Router, Redirect } from "react-router";
import { Provider, observer } from "mobx-react";
import PWAPrompt from "react-ios-pwa-prompt";

import { Header } from "./Atoms/Header";
import { Spacer } from "./AppleDesign/atoms/Spacer";
import { Recommendations } from "./Parts/Recommendations";
import { SubscriptionList } from "./Parts/SubscriptionList";
import { SubscriptionForm } from "./Parts/SubscriptionForm";
import { SubscriptionDetails } from "./Parts/SubscriptionDetails";

import { urlStore, history } from "./stores/UrlStore";
import { subscriptionsStore } from "./stores/SubscriptionsStore";
import { subscriptionFormStore } from "./stores/SubscriptionFormStore";

export const AppConfig = {
  dark: true,
};

export const AppRoutes = {
  ROOT: "/",
  SEE: "/details/:subscriptionId",
};

export const AppRouter = observer(() => {
  switch (urlStore.routePath) {
    case AppRoutes.ROOT:
      return (
        <>
          <SubscriptionForm dark={AppConfig.dark} />
          <SubscriptionList dark={AppConfig.dark} />
          <Spacer y={18} />
          <Recommendations dark={AppConfig.dark} />
        </>
      );
    case AppRoutes.SEE:
      return <SubscriptionDetails dark={AppConfig.dark} />;
    default:
      return <Redirect to="/" />;
  }
});

function App() {
  return (
    <div
      className="container"
      style={{ backgroundColor: AppConfig.dark ? "black" : "white" }}
    >
      <div className="App">
        <Provider stores={{ subscriptionsStore, subscriptionFormStore }}>
          <Router history={history}>
            <Header text="Subscribed" />
            <Spacer y={8} />

            <AppRouter />
          </Router>
          <PWAPrompt
            promptOnVisit={2}  // show prompt after 2nd visit
            timesToShow={3}    // show the prompt 3 times
            copyBody="This website has app functionality. Add it to your home screen in 2 steps to use it in fullscreen and while offline."
            copyShareButtonLabel="Press the 'Share' button."
            copyAddHomeButtonLabel="and then Press 'Add to Home Screen'"
          />
        </Provider>
      </div>
    </div>
  );
}

export default App;
