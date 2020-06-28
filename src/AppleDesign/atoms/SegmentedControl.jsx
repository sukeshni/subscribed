import React, { useState } from "react";
import styled, { css } from "styled-components";
import { BodyText } from "./BodyText";

const SegmentedControlContainer = styled.div`
  border-radius: 8px;
`;
const Choice = styled.div`
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  flex-grow: 1;
  text-align: center;

  color: white;

  &:hover {
    background-color: #3a3a3c;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #3a3a3c;
    `}
`;

export const SegmentedControl = ({ choices, defaultChoice, onSelect }) => {
  choices = choices || [];
  const [selected, setSelected] = useState(defaultChoice);

  return (
    <SegmentedControlContainer className="flex">
      {choices.map((choice, index) => (
        <Choice
          key={index}
          active={choice === selected}
          onClick={(e) => {
            setSelected(choice);
            onSelect && onSelect(choice);
          }}
        >
          <BodyText
            colorClass={choice === selected ? "white" : "gray1"}
            type="tagline13-semibold"
          >
            {choice}
          </BodyText>
        </Choice>
      ))}
    </SegmentedControlContainer>
  );
};
