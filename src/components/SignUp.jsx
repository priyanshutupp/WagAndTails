import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`py-2 px-4 font-poppins font-medium text-[16px] text-primary bg-green-gradient rounded-[10px] outline-none ${styles}`}>
    Sign Up
  </button>
);

export default Button;
