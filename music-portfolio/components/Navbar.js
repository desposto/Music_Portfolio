import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";

function Navbar({ toggle }) {
  return (
    <div className="flex justify-between items-center h-16 bg-bk text-wt relative shadow-sm font-mono w-full font-bold ">
      <div className="px-4 flex items-center ">
        <div className=" ">
          David Esposto - Music Portfolio{" "}
        </div>
        <div className="pl-4 animate-bounce">
          <BsMusicNoteBeamed></BsMusicNoteBeamed>
        </div>
      </div>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
        <AiOutlineMenu></AiOutlineMenu>
      </div>
      <div className="pr-8 md:block hidden space-x-3 ">
        <Link href="/About" className="pl-8">
          About
        </Link>
      </div>
    </div>
  );
}

export { Navbar };
