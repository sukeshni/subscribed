import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const InputStyled = styled.input`
  width: fill-available;
  background-color: #1c1c1e;
  border: 0;
  padding: 8px 0px;
  text-transform: capitalize;
  letter-spacing: 0.4px;

  ${(props) =>
    props.uppercase &&
    `
    text-transform: uppercase;
    `}

  ${(props) =>
    props.dark &&
    css`
      color: white;
    `}
`;

const Label = styled.div`
  display: inline;
  color: gray;
`;

export const Input = (props) => {
  const [text, setText] = useState(props.initialText);

  // https://medium.com/@digruby/do-not-use-props-as-default-value-of-react-usestate-directly-818ee192f454
  useEffect(() => {
    setText(props.initialText);
  }, [props.initialText]);

  return (
    <>
      {props.label && <Label className={`${props.type}`}>{props.label}</Label>}
      <InputStyled
        {...props}
        name={props.name}
        type={props.inputType || "text"}
        className={`${props.type}`}
        placeholder={props.placeholder}
        dark={props.dark}
        value={text}
        autocomplete="nope"
        onChange={(e) => {
          setText(e.target.value);
          props.instant && props.onInputChange && props.onInputChange(e);
        }}
        onBlur={(e) =>
          !props.instant && props.onInputChange && props.onInputChange(e)
        }
        onFocus={e => props.onFocus && props.onFocus(e)}
      />
    </>
  );
};
