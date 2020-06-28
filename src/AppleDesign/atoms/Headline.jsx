import React from "react";
import styled, { css } from "styled-components";

const HeadlineStyled = styled.div`
  display: flex;
  align-items: center;
  ${(props) => 
    props.dark &&
      css`
        color: white;
      `
  }

  ${(props) => 
    props.color &&
      css`
        color: ${props.color};
      `
  }
`;

export const Headline = (props) => {
  const type = props.type || "headline1";
  const colorClass = props.colorClass || "white";
  const dark = props.dark || false;

  return (
    <HeadlineStyled className={`${type} ${colorClass}`} dark={dark} color={props.color}>
      {props.children}
    </HeadlineStyled>
  );
};
