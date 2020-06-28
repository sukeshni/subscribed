import { inject, observer } from "mobx-react";
import React from "react";
import { BodyText } from "../AppleDesign/atoms/BodyText";
import { FlatCircleText } from "../AppleDesign/atoms/CircleText";
import { Paper } from "../AppleDesign/atoms/Paper";
import { ListHeader } from "../Atoms/ListHeader";
import { NoDataMessage } from "../Atoms/NoDataMessage";
import { SubscriptionRow } from "../Atoms/SubscriptionRow";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

export const SubscriptionList = inject("stores")(
  observer(({ stores, dark }) => {
    const { subscriptionsStore } = stores;
    const weeklySubscriptions = subscriptionsStore.weeklySubscriptions;
    const monthlySubscriptions = subscriptionsStore.monthlySubscriptions;
    const yearlySubscriptions = subscriptionsStore.yearlySubscriptions;

    const weeklyTotal = subscriptionsStore.weeklyTotal;
    const monthlyTotal = subscriptionsStore.monthlyTotal;
    const yearlyTotal = subscriptionsStore.yearlyTotal;

    const noData =
      weeklySubscriptions.length === 0 &&
      monthlySubscriptions.length === 0 &&
      yearlySubscriptions.length === 0;

    return (
      <>
        <ListHeader title="Weekly" count={weeklySubscriptions.length} />
        {weeklySubscriptions.map((subscription, index) => (
          <Link
            to={`/details/${subscription.id}`}
            key={index}
            className="no-underline"
          >
            <SubscriptionRow dark {...subscription} />
          </Link>
        ))}

        {/* total spendings: TODO move to Atom */}
        {weeklySubscriptions.length > 0 && (
          <div style={{ alignSelf: "center", textAlign: "end" }}>
            <Paper transparent>
              <BodyText type="body15-regular" colorClass={"gray1"}>
              {Object.keys(weeklyTotal).map((currency, index) =>
                  !!weeklyTotal[currency] && (
                    <FlatCircleText
                      textType="caption13-regular"
                      text={`${formatPrice(weeklyTotal[currency], currency)} ${currency}`}
                      key={index}
                      dark
                    />
                ))}
                <span
                  style={{ marginLeft: "10px" }}
                  className="caption13-regular gray2"
                >
                  per week
                </span>
              </BodyText>
            </Paper>
          </div>
        )}

        <ListHeader title="Monthly" count={monthlySubscriptions.length} />
        {monthlySubscriptions.map((subscription, index) => (
          <Link
            to={`/details/${subscription.id}`}
            key={index}
            className="no-underline"
          >
            <SubscriptionRow dark {...subscription} />
          </Link>
        ))}

        {/* total spendings: TODO move to Atom */}
        {monthlySubscriptions.length > 0 && (
          <div style={{ alignSelf: "center", textAlign: "end" }}>
            <Paper transparent>
              <BodyText type="body15-regular" colorClass={"gray1"}>
                {Object.keys(monthlyTotal).map((currency, index) =>
                  !!monthlyTotal[currency] && (
                    <FlatCircleText
                      textType="caption13-regular"
                      text={`${formatPrice(monthlyTotal[currency], currency)} ${currency}`}
                      key={index}
                      dark
                    />
                ))}

                <span
                  style={{ marginLeft: "10px" }}
                  className="caption13-regular gray2"
                >
                  per month
                </span>
              </BodyText>
            </Paper>
          </div>
        )}

        <ListHeader title="Yearly" count={yearlySubscriptions.length} />
        {yearlySubscriptions.map((subscription, index) => (
          <Link
            to={`/details/${subscription.id}`}
            key={index}
            className="no-underline"
          >
            <SubscriptionRow dark {...subscription} />
          </Link>
        ))}
        {/* total spendings: TODO move to Atom */}
        {yearlySubscriptions.length > 0 && (
          <div style={{ alignSelf: "center", textAlign: "end" }}>
            <Paper transparent>
              <BodyText type="body15-regular" colorClass={"gray1"}>
              {Object.keys(yearlyTotal).map((currency, index) =>
                  !!yearlyTotal[currency] && (
                    <FlatCircleText
                      textType="caption13-regular"
                      text={`${formatPrice(yearlyTotal[currency], currency)} ${currency}`}
                      key={index}
                      dark
                    />
                ))}
                <span
                  style={{ marginLeft: "10px" }}
                  className="caption13-regular gray2"
                >
                  per year
                </span>
              </BodyText>
            </Paper>
          </div>
        )}

        {noData && <NoDataMessage />}
      </>
    );
  })
);
