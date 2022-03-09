import React from "react";
import Link from "next/link";
const DropdownMenu = (props) => {
  return (
    <div
      className={
        props.isOpen //if the drop down menu is open desplay if not hide
          ? "grid grid-rows-3 text-center items-center bg-bk w-full text-wt pb-3"
          : "hidden"
      }
    >
      <Link className="p-4" href="/Home">
        About
      </Link>
    </div>
  );
};

export { DropdownMenu };
