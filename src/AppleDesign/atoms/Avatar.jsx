import React from "react";
import styled, { css } from "styled-components";

const AvatarStyled = styled.div`
  display: inline-block;
  border-radius: 8px;
  margin-right: 20px;
  width: 40px;
  height: 40px;
  align-self: center;
  overflow: hidden;
  background-color: black;

  ${(props) =>
    props.dark &&
    css`
    background-color: black;
    `}
`;

export const Avatar = (props) => {
  return <AvatarStyled dark={props.dark} onClick={() => props.onClick && props.onClick()}>
    { props.image && <img alt="" className="cover" src={props.image} />}
  </AvatarStyled>;
};
