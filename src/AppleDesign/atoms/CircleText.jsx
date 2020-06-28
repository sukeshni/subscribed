import React from "react";
import styled from "styled-components";
import { BodyText } from "./BodyText";

const CircleTextStyled = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;

  background: dimgray;
  opacity: 0.5;
  margin-left: 10px;
`;

export const CircleText = ({ size = 22, text, textType, dark }) => {
  return (
    <CircleTextStyled size={size}>
      <BodyText type={textType} dark={dark}>{text}</BodyText>
    </CircleTextStyled>
  );
};

const FlatCircleTextStyled = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: auto;
  border-radius: 15px;

  background: dimgray;
  opacity: 0.5;
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 5px 15px;
`;

export const FlatCircleText = ({ text, textType, dark }) => {
  return (
    <FlatCircleTextStyled>
      <BodyText type={textType} dark={dark}>{text}</BodyText>
    </FlatCircleTextStyled>
  );
};
