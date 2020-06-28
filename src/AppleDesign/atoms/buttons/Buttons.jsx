import React from "react";
import addBlueSvg from "../../svgs/Add.svg";
import deleteSvg from "../../svgs/Delete.svg";
import backSvg from "../../svgs/Back.svg";
import closeBlueSvg from "../../svgs/CloseBlue.svg";
import checkMarkBlueSvg from "../../svgs/CheckMarkBlue.svg";

import { BodyText } from "../BodyText";

export const Button = ({ text, colorClass, iconSvg, verticalAlign, onClick }) => (
  <BodyText
    type="body20-regular"
    colorClass={colorClass ?? "accent-blue-light"}
    pointer
    onClick={() => onClick && onClick()}
  >
    {iconSvg && (
      <img
        alt=""
        className="size25"
        style={{ verticalAlign: verticalAlign ?? "text-top", color: colorClass ?? "#60a9f9" }}
        src={iconSvg}
      />
    )}{" "}
    &nbsp;
    {text}
  </BodyText>
);

export const AddButton = (props) => (
  <Button
    text="New subscription"
    iconSvg={addBlueSvg}
    onClick={props.onClick}
  />
);

export const BackButton = (props) => (
  <Button
    text="Back"
    iconSvg={backSvg}
    verticalAlign="baseline"
    onClick={props.onClick}
    
  />
);

export const CancelButton = (props) => (
  <Button text="Cancel" iconSvg={closeBlueSvg} onClick={props.onClick} />
);

export const DeleteButton = (props) => (
  <Button
    text="Delete"
    iconSvg={deleteSvg}
    colorClass="destructive-red"
    onClick={props.onClick}
  />
);

export const SaveButton = (props) => {
  return (
    <BodyText
      type="body20-regular"
      colorClass="accent-blue-light"
      pointer
      onClick={() => props.onClick && props.onClick()}
    >
      <img
        alt=""
        className="size18"
        style={{ verticalAlign: "middle", marginRight: "8px" }}
        src={checkMarkBlueSvg}
      />{" "}
      Save
    </BodyText>
  );
};
