import React, { useState, useEffect } from "react";
import { Paper } from "../AppleDesign/atoms/Paper";
import { Avatar } from "../AppleDesign/atoms/Avatar";
import { Headline } from "../AppleDesign/atoms/Headline";
import { BodyText } from "../AppleDesign/atoms/BodyText";
import forwardArrowSvg from "../AppleDesign/svgs/ForwardArrow.svg";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
/*
const getStatusColor = (status) => {
  const defaultStatusColor = "green";
  return status.toLowerCase().includes("paid ") ? defaultStatusColor : "orangered";
}

const getReadableDate = (unixTimestamp) => {
  // 1585267200 => Fri, 27 March 2020, 01:00:00

  const d = new Date(unixTimestamp * 1000);
  var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second:"numeric" };
  return new Intl.DateTimeFormat('default', options).format(d);
}
*/

const SubscriptionRowStyled = styled.div`
  display: flex;
`;

export const SubscriptionRow = ({
  id,
  subscriptionName,
  logo,
  planName,
  price,
  currency,
  frequency,
  paymentStatus,
  dueAt,
  addedAt,
  onAvatarClick,
  dark,
  newlyCreated,
}) => {
  const [greenBgVisible, setGreenBgVisibility] = useState(false);
  let timerDispose = null;

  useEffect(() => {
    if (newlyCreated) {
      setGreenBgVisibility(true);
      timerDispose = setTimeout(() => setGreenBgVisibility(false), 4000);
    }
    return () => clearTimeout(timerDispose);
  }, []);

  return (
    <div className="mb-2">
      <Paper rounded dark={dark} hover showSuccess={greenBgVisible} pointer>
        <SubscriptionRowStyled>
          <Avatar
            image={logo}
            onClick={() => {
              onAvatarClick && onAvatarClick(id);
            }}
            dark={dark}
          />
          <div style={{ flexGrow: 1, alignSelf: "center" }}>
            <Headline type="body20-bold" dark={dark}>
              {subscriptionName || ""}
            </Headline>
            {planName && (
              <BodyText type="body15-regular" colorClass={"basic-gray"}>
                {planName}
              </BodyText>
            )}
          </div>
          <div style={{ alignSelf: "center", textAlign: "end" }}>
            {price && (
              <Headline type="body15-semibold" colorClass="basic-gray">{`${
                formatPrice(price, currency) || ""
              } ${currency || ""}`}</Headline>
            )}
            {frequency && (
              <BodyText type="caption13-regular" colorClass={"gray1"}>
                {frequency.toUpperCase()}
              </BodyText>
            )}
          </div>
          <div style={{ marginLeft: "10px", alignSelf: "center" }}>
            <img alt="" src={forwardArrowSvg} />
          </div>
        </SubscriptionRowStyled>
      </Paper>
    </div>
  );
};
