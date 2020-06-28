import React from "react";
import styled, { css } from "styled-components";

const BodyTextStyled = styled.div`
  ${(props) =>
    props.dark &&
    css`
      color: white;
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const BodyText = (props) => {
  const type = props.type || "body15-regular";
  const colorClass = props.colorClass || "";
  const pointer = props.pointer || "";
  const dark = props.dark || false;

  return (
    <BodyTextStyled
      className={`${type} ${colorClass} ${pointer && "pointer"}`}
      dark={dark}
      color={props.color}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.children}
    </BodyTextStyled>
  );
};
