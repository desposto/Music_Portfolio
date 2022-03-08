import React from "react";
import Link from "next/link";
const DropdownMenu = (props) => {
  return (
    <div
      className={
        props.isOpen
          ? "grid grid-rows-4 text-center items-center bg-black w-full text-white"
          : "hidden"
      }
    >
      <Link className="p-4" href="/Home">
        Home
      </Link>
      <Link className="p-4" href="/Home">
        Menu
      </Link>
      <Link className="p-4" href="/Home">
        About
      </Link>
    </div>
  );
};

export { DropdownMenu };
