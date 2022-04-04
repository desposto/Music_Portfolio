import React from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ImSoundcloud2 } from "react-icons/im";
import { FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  //toggle for Menu
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-prp text-wt max-h-screen min-h-screen h-screen w-screen">
      <Navbar toggle={toggle}></Navbar>
      <div className="bg-bk font-mono w-screen flex justify-center text-lg font-bold pb-4">
        <Link href="/">Home</Link>
      </div>
      <div className="h-[25.8rem] pt-4 text-center flex flex-col align-middle items-center space-y-4 grow">
        <p className="">
          All Music created by David Esposto <br></br>
          Not Royalty-Free, Contact for Use! <br></br>
          Developed using Next.js and TailwindCSS
        </p>
        <div className="flex space-x-5 items-center">
          <p className="font-bold">Connect with me:</p>
          <a href="https://soundcloud.com/24karatproductions">
            <ImSoundcloud2></ImSoundcloud2>
          </a>
          <a href="https://www.youtube.com/channel/UCSm4qdRDWv6zYZOSE-WnjaA/featured">
            <FaYoutube></FaYoutube>
          </a>
          <a href="https://www.instagram.com/24karatproductions/?hl=en">
            <FaInstagram></FaInstagram>
          </a>
          <a href="https://github.com/desposto">
            <FaGithub></FaGithub>
          </a>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
