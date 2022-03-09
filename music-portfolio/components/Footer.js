import React from "react";
import { FaCopyright } from "react-icons/fa";
import { ImSoundcloud2 } from "react-icons/im";
import { FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="items-center h-8 bg-bk text-white relative shadow-lg font-mono flex text-base w-screen justify-between">
      <div className="flex items-center space-x-2 pl-4 ">
        <FaCopyright></FaCopyright>
        <div>David Esposto - 2022</div>
      </div>
      <div className="flex space-x-4 items-center pr-4">
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
  );
};

export { Footer };
