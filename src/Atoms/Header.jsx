import React from "react";
import { Logo } from "./Logo";
import logo from "../assets/calendar.svg";
import { Headline } from "../AppleDesign/atoms/Headline";
import { Link } from "react-router-dom";

export const Header = ({ text }) => {
  return (
    <Link to="/" className="no-underline">
      <Headline type="large-title" colorClass="white">
        <Logo logo={logo} />
        {text}
      </Headline>
    </Link>
  );
};
