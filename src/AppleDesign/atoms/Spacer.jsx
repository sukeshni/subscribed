import React from "react";

export const Spacer = ({ x, y }) => {
return <div style={{margin: `${y || 1}vh ${x || 1}vw`}}>{''}</div>;
};
