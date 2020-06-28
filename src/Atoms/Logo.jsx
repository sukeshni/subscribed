import React from "react";

export const Logo = ({ logo }) => {
  return (
    <>
      <img alt=""
        className="size30"
        style={{ verticalAlign: "bottom", marginRight: "10px" }}
        src={logo}
      />
    </>
  );
};
