import React from "react";
import styled, { css } from "styled-components";

const PaperStyled = styled.div`
  
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(27.1828px);
  padding: 12px;
  margin: 1px 0px;
  -webkit-transition: background-color 1s ease-out;
  transition: background-color 0.4s ease-out;
  

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 10px;
    `}
    
  ${(props) =>
    props.hover &&
    css`
      &:hover {
        background: rgba(22, 22, 22, 0.94);
      }
    `}
  ${(props) =>
    props.dark &&
    css`
      background-color: #1c1c1e;
    `}
  ${(props) =>
    props.transparent &&
    css`
      background-color: transparent;
    `}

    ${(props) =>
      props.showSuccess &&
      css`
        background-color: darkgreen;
      `}

    ${(props) =>
      props.flexGrow &&
      css`
        flex-grow: 1;
      `}
    
    ${(props) =>
      props.pointer &&
      `
        cursor: pointer;
      `}
`;

export const Paper = (props) => {
  return (
    <PaperStyled
      dark={props.dark}
      rounded={props.rounded}
      hover={props.hover}
      transparent={props.transparent}
      showSuccess={props.showSuccess}
      flexGrow={props.flexGrow}
      pointer={props.pointer}
    >
      {props.children}
    </PaperStyled>
  );
};
