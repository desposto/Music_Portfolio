import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import React, { useRef, useState, useEffect } from "react";
import { DropdownMenu } from "../components/DropdownMenu";

export default function Layout({ children }) {

  const [isOpen, setIsOpen] = useState(false);

  //toggle for Menu
  const toggle = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const hideDropDownMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    //eventlistener for resize
    window.addEventListener("resize", hideDropDownMenu);

    return () => {
      window.removeEventListener("resize", hideDropDownMenu);
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-prp items-center">
      <Navbar toggle={toggle} />
      <DropdownMenu isOpen={isOpen} toggle={toggle}></DropdownMenu>
      <main className="grow flex items-center">{children}</main>
      <Footer />
    </div>
  );
}
