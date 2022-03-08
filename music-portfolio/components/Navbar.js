import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar({toggle}) {
  return (
    <div className="flex justify-between items-center h-16 bg-bk text-wt relative shadow-sm font-mono w-full font-bold ">
      <div className="px-4">David Esposto - Music Portfolio</div>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
        <AiOutlineMenu></AiOutlineMenu>
      </div>
      <div className="pr-8 md:block hidden space-x-3 ">
        <Link href="/Home" className="pl-8">
          Home
        </Link>
        <Link href="/Home" className="pl-8">
          Menu
        </Link>
        <Link href="/Home" className="pl-8">
          About
        </Link>
      </div>
    </div>
  );
}

export { Navbar };
