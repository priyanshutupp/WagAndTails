import { useState } from "react";

import { close, logoTemp, menu } from "../assets";
import { navLinks } from "../constants";
import Button from "./SignUp";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logoTemp} alt="wagandtails" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-start items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal text-dimWhite hover:text-secondary cursor-pointer text-[16px] mr-10`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <Button styles={`sm:flex hidden mr-10 z-[5]`} />
      
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium text-dimWhite hover:text-secondary cursor-pointer text-[16px] 
                ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <li><Button styles={`mt-5`} /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
