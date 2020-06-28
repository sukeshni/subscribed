import React from "react";
import { Redirect } from "react-router-dom";
import { urlStore, history } from "../stores/UrlStore";
import { inject, observer } from "mobx-react";
import { Paper } from "../AppleDesign/atoms/Paper";
import { Avatar } from "../AppleDesign/atoms/Avatar";
import { Headline } from "../AppleDesign/atoms/Headline";
import { BodyText } from "../AppleDesign/atoms/BodyText";
import { DeleteButton } from "../AppleDesign/atoms/buttons/Buttons";
import { BackButton } from "../AppleDesign/atoms/buttons/Buttons";
import { Spacer } from "../AppleDesign/atoms/Spacer";
import { formatPrice } from "../utils/helpers";

export const SubscriptionDetails = inject("stores")(
  observer(({ stores, dark }) => {
    const { subscriptionsStore } = stores;
    if (!urlStore.params.subscriptionId) return <Redirect to="/" />;

    const subscription = subscriptionsStore.findSubscription(
      urlStore.params.subscriptionId
    );

    if (!subscription) return <Redirect to="/" />;

    const handleDeleteSubscription = (subscriptionId) => {
      subscriptionsStore.removeSubscription(subscriptionId);
      urlStore.pushUrl({ url: "/" });
    };

    return (
      <>
        <Paper transparent flexGrow rounded dark={dark}>
          <BackButton
            onClick={() => {
              history.back();
            }}
          />
          <Spacer y={5} />

          <div className="flex" style={{ minWidth: "30vw" }}>
            <Avatar image={subscription.logo} dark={dark} />
            <div
              style={{
                flexGrow: 1,
                alignSelf: "center",
                marginRight: "20px",
              }}
            >
              <Headline type="body20-bold" dark={dark}>
                {subscription.subscriptionName}
              </Headline>
              <Spacer y={0.5} />
              <BodyText type="body15-regular" colorClass={"basic-gray"}>
                {subscription.planName}
              </BodyText>
            </div>
          </div>
          <div className="thin-line" />
          <Spacer y={5} />
          <div style={{ marginLeft: "50px" }}>
            {subscription.frequency && (
              <Paper transparent flexGrow rounded dark={dark}>
                <BodyText type="body17-semibold" colorClass={"gray2"}>
                  Frequency &nbsp;&nbsp;
                  <span className="basic-gray">
                    {subscription.frequency.toUpperCase()}
                  </span>
                </BodyText>
              </Paper>
            )}
            {subscription.price && (
              <Paper transparent flexGrow rounded dark={dark}>
                <BodyText type="body17-semibold" colorClass={"gray2"}>
                  Amount &nbsp;&nbsp;
                  <span className="basic-gray">{`${formatPrice(
                    subscription.price,
                    subscription.currency
                  )} ${subscription.currency}`}</span>
                </BodyText>
              </Paper>
            )}
          </div>
          <Spacer y={5} />
          <div className="thin-line" />
          <DeleteButton
            onClick={() => {
              handleDeleteSubscription(subscription.id);
            }}
          />
        </Paper>
      </>
    );
  })
);
