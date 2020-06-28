import React from "react";
import { Headline } from "../AppleDesign/atoms/Headline";
import { Spacer } from "../AppleDesign/atoms/Spacer";
import { FlatCircleButton } from "../AppleDesign/atoms/buttons/FlatCircleButton";

export const NoDataMessage = (props) => {
  return (
    <>
      <Spacer y={8} />
      <div className="flex center-x">
        <div className="text-center">
          {/* <img alt="" src={noDataSvg} className="size250" /> */}
          <Spacer y={4} />
          <Headline type="headline3-bold" colorClass="basic-gray">
            Start tracking ...
          </Headline>
          <br />
          <Headline type="body20-regular" colorClass="gray1">
            ✅ &nbsp; Digital subscriptions
          </Headline>
          <br />
          <Headline type="body20-regular" colorClass="gray1">
            ✅ &nbsp; Offline subscriptions
          </Headline>
          <br /><br />
          <FlatCircleButton text="+ Add to Home screen" onTap={() => {}} />
          <Spacer y={16} />
        </div>
      </div>
    </>
  );
};
