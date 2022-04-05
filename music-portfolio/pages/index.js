import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AudioPlayer } from "../components/AudioPlayer";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DropdownMenu } from "../components/DropdownMenu";

export default function Home() {
  const [songs] = useState([
    {
      title: "Beach Party",
      img_src: "/images/BeachParty-min.jpg",
      src: "./music/$beach partuy.mp3",
      bpm: "125",
    },
    {
      title: "Beauty",
      img_src: "/images/Beauty-min.jpg",
      src: "./music/$Beauty.mp3",
      bpm: "86",
    },
    {
      title: "Thumper",
      img_src: "/images/Thumper-min.jpg",
      src: "./music/$clk clik cla.mp3",
      bpm: "96",
    },
    {
      title: "When We Sleep",
      img_src: "/images/When We Sleep-min.jpg",
      src: "./music/$When we sleep.mp3",
      bpm: "168",
    },
    {
      title: "Back To West",
      img_src: "/images/Back To West-min.jpg",
      src: "./music/$back to west.mp3",
      bpm: "160",
    },
    {
      title: "Bling",
      img_src: "/images/Bling-min.jpg",
      src: "./music/$bling.mp3",
      bpm: "168",
    },
    {
      title: "Bounce",
      img_src: "/images/Bounce-min.jpg",
      src: "./music/$Bounce.mp3",
      bpm: "100",
    },
    {
      title: "Drill",
      img_src: "/images/Drill-min.jpg",
      src: "./music/$drill.mp3",
      bpm: "145",
    },
    {
      title: "Poke Through",
      img_src: "/images/Poke Through-min.jpg",
      src: "./music/$Poke Through.mp3",
      bpm: "158",
    },
    {
      title: "Shred",
      img_src: "/images/Shred-min.jpg",
      src: "./music/$Shred.mp3",
      bpm: "168",
    },
    {
      title: "Sublife",
      img_src: "/images/Sublife-min.jpg",
      src: "./music/$Sublife.mp3",
      bpm: "172",
    },
  ]);

  //State Declaration
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  //toggle for Menu
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  //hides Drop down if the window width becomes too small
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
    <div className="flex flex-col items-center ">
      <Head>
        <title>DE Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="" />
      </Head>
      <DropdownMenu isOpen={isOpen} toggle={toggle}></DropdownMenu>
      <AudioPlayer
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      ></AudioPlayer>
    </div>
  );
}
