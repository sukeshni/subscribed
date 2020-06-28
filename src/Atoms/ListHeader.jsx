import React from "react";
import { CircleText } from "../AppleDesign/atoms/CircleText";
import { Headline } from "../AppleDesign/atoms/Headline";
import { Spacer } from "../AppleDesign/atoms/Spacer";

export const Header = ({ title, count }) => (
  <Headline type="body20-bold" colorClass="gray1">
    {title}
    {count && count > 1 && (
      <CircleText textType="body15-regular" text={count} dark />
    )}
  </Headline>
);

export const ListHeader = ({ title, count }) => {
  return (
    <>
      <Spacer y={7} />
      {count !== undefined ? (
        count > 0 && <Header title={title} count={count} />
      ) : (
        <Header title={title} />
      )}

      <Spacer y={3} />
    </>
  );
};
