import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BodyText } from "./BodyText";

const SuggestionsContainer = styled.div`
  background: black;
  position: absolute;
  width: 100%;
  z-index: 1;
  max-height: 300px;
  overflow: scroll;
`;

const SuggestionRow = styled.div`
  cursor: pointer;

  &:hover {
    background-color: #1c1c1e;
  }
`;

const Suggestion = styled.div`
  margin: 0 1rem;
  padding: 12px;
  border-bottom: 1px solid #48484a;
`;

export const AutoSuggestionsList = ({ suggestions, onSuggestionSelect }) => {
  const [visible, setVisibility] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(
    (v) => {
      setSelected(false);
      if (!selected) {
        setVisibility(true);
      }
    },
    [suggestions]
  );

  return (
    <>
      {visible && suggestions.length > 0 && (
        <SuggestionsContainer>
          {suggestions.map(
            (suggestion, index) =>
              suggestion.search && (
                <SuggestionRow
                  key={index}
                  onClick={() => {
                    onSuggestionSelect && onSuggestionSelect(suggestion);
                    setVisibility(false);
                    setSelected(true);
                  }}
                >
                  <Suggestion>
                    <BodyText type="body15-regular" dark>
                      {suggestion.search}
                    </BodyText>
                  </Suggestion>
                </SuggestionRow>
              )
          )}
        </SuggestionsContainer>
      )}
    </>
  );
};
