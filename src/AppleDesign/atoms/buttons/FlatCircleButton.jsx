import React, { useState } from "react";
import styled, { css } from "styled-components";
import { BodyText } from "../BodyText";

const FlatCircleButtonContainer = styled.div`
  cursor: pointer;  
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  flex-grow: 1;
  text-align: center;
  background-color: #2c2c2c;
  white-space: nowrap;

  &:hover {
    background-color: #007aff;
  }

  ${(props) =>
    props.filled &&
    css`
      background-color: #007aff;
    `}
  
`;

export const FlatCircleButton = ({ text, filled, onTap, textColorClass, textOnClick }) => {
  const [selected, setSelected] = useState(false);
  textColorClass = textColorClass || 'accent-blue-light';
  textOnClick = textOnClick || text;

  return (
    <FlatCircleButtonContainer
      className="flex"
      onClick={(e) => {
        setSelected(true);
        onTap && onTap();
      }}
      filled={filled}
    >
      <BodyText colorClass={textColorClass} type="tagline13-semibold">
        {selected ? textOnClick : text}
      </BodyText>
    </FlatCircleButtonContainer>
  );
};
