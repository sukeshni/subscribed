import React, { useRef } from "react";
import { observer, inject } from "mobx-react";

import { Paper } from "../AppleDesign/atoms/Paper";
import { Spacer } from "../AppleDesign/atoms/Spacer";
import { CancelButton, AddButton } from "../AppleDesign/atoms/buttons/Buttons";
import { AddSubscriptionForm } from "../Atoms/AddSubscriptionForm";

export const SubscriptionForm = inject("stores")(
  observer(({ stores, dark }) => {
    const { subscriptionsStore, subscriptionFormStore } = stores;
    const boxRef = useRef(null);

    const handleAddSubscription = () => {
      const newSubscription = subscriptionFormStore.getFormState;

      subscriptionFormStore.updateFormVisibility(false);

      subscriptionsStore.addSubscription({
        ...newSubscription,
        newlyCreated: true,
      });
    };

    const scrollIntoView = () => {
      boxRef.current && boxRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <>
        <Paper dark rounded transparent>
          <div ref={boxRef}>
            {subscriptionFormStore.formVisibilityFlag ? (
              <CancelButton
                onClick={() => {
                  subscriptionFormStore.clear();
                  subscriptionFormStore.updateFormVisibility(false);
                }}
              />
            ) : (
              <AddButton
                onClick={() => {
                  subscriptionFormStore.updateFormVisibility(true);

                  setTimeout(() => {
                    scrollIntoView();
                  }, 100);
                }}
              />
            )}
          </div>
        </Paper>

        <Spacer />

        {subscriptionFormStore.formVisibilityFlag && (
          <AddSubscriptionForm
            subscriptionLogo={subscriptionFormStore.formState.subscription_logo}
            subscriptionName={subscriptionFormStore.formState.subscription_name}
            subscriptionPlan={subscriptionFormStore.formState.subscription_plan}
            plans={subscriptionFormStore.formState.plans}
            onFormInputChange={(name, value) => {
              subscriptionFormStore.updateFormState(name, value);
            }}
            onFormSubmit={() => {
              handleAddSubscription();
              subscriptionFormStore.clear();
            }}
            nameSuggestions={subscriptionFormStore.serviceSuggestions}
            onServiceSelect={(suggestion) => {
              subscriptionFormStore.updateFormStateFromSuggestion(suggestion);
            }}
          />
        )}
      </>
    );
  })
);
