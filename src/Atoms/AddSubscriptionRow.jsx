import React, { useState } from "react";
import { Paper } from "../AppleDesign/atoms/Paper";
import { Spacer } from "../AppleDesign/atoms/Spacer";
import { CancelButton, AddButton } from "../AppleDesign/atoms/buttons/Buttons";
import { AddSubscriptionForm } from "./AddSubscriptionForm";

function uuid() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

const subscriptions = [
  {
    logo: "//logo.clearbit.com/netflix.com",
    subscriptionName: "Netflix",
    planName: "Premium",
    price: "99",
    currency: "SEK",
    frequency: "week",
    paymentStatus: "Due in 2 days",
    dueAt: "1590162130",
    addedAt: "1590162130",
  },
  {
    logo: "//logo.clearbit.com/spotify.com",
    subscriptionName: "Spotify",
    planName: "Family",
    price: "139",
    currency: "SEK",
    frequency: "month",
    paymentStatus: "Paid 3 days ago",
    dueAt: "1590162130",
    addedAt: "1590162130",
  },
  {
    logo: "//logo.clearbit.com/apple.com",
    subscriptionName: "Apple TV",
    planName: "Premium",
    price: "1000",
    currency: "SEK",
    frequency: "year",
    dueAt: "1585267200",
    addedAt: "1590162130",
  },
];

const newSubscription = () => {
  const item = subscriptions[Math.floor(Math.random() * subscriptions.length)];
  return { ...item, id: uuid() };
};



export const AddSubscriptionRow = ({ onSubmit, dark }) => {
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleAddSubscription = (subscriptionFormInput) => {
    setFormVisibility(false);
    onSubmit(subscriptionFormInput);
  }

  return (
    <>
        <Paper dark rounded transparent>
          {isFormVisible ? (
            <CancelButton onClick={() => setFormVisibility(false)} />
          ) : (
            <AddButton onClick={() => setFormVisibility(true)} />
          )}
        </Paper>

      <Spacer />
      {isFormVisible && <AddSubscriptionForm onFormSubmit={() => handleAddSubscription(newSubscription())} />}
    </>
  );
};
