import React from "react";
import styled from "styled-components";

const DividerStyled = styled.div`
  border-top: 1px solid;
`;

export const Divider = ({ propName }) => {
  return <DividerStyled className="gray3" />;
};
