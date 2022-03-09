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
      img_src: "/imgages/BeachParty-min.jpg",
      src: "./music/$beach partuy.mp3",
      bpm: "125",
    },
    {
      title: "Beauty",
      img_src: "/imgages/Beauty-min.jpg",
      src: "./music/$Beauty.mp3",
      bpm: "86",
    },
    {
      title: "Thumper",
      img_src: "/imgages/Thumper-min.jpg",
      src: "./music/$clk clik cla.mp3",
      bpm: "96",
    },
    {
      title: "When We Sleep",
      img_src: "/imgages/When We Sleep-min.jpg",
      src: "./music/$When we sleep.mp3",
      bpm: "168",
    },
    {
      title: "Back To West",
      img_src: "/imgages/Back To West-min.jpg",
      src: "./music/$back to west.mp3",
      bpm: "160",
    },
    {
      title: "Bling",
      img_src: "/imgages/Bling-min.jpg",
      src: "./music/$bling.mp3",
      bpm: "168",
    },
    {
      title: "Bounce",
      img_src: "/imgages/Bounce-min.jpg",
      src: "./music/$Bounce.mp3",
      bpm: "100",
    },
    {
      title: "Drill",
      img_src: "/imgages/Drill-min.jpg",
      src: "./music/$drill.mp3",
      bpm: "145",
    },
    {
      title: "Poke Through",
      img_src: "/imgages/Poke Through-min.jpg",
      src: "./music/$Poke Through.mp3",
      bpm: "158",
    },
    {
      title: "Shred",
      img_src: "/imgages/Shred-min.jpg",
      src: "./music/$Shred.mp3",
      bpm: "168",
    },
    {
      title: "Sublife",
      img_src: "/imgages/Sublife-min.jpg",
      src: "./music/$Sublife.mp3",
      bpm: "172",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    const hideDropDownMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log("i resized");
      }
    };

    window.addEventListener("resize", hideDropDownMenu);

    return () => {
      window.removeEventListener("resize", hideDropDownMenu);
    };
  });

  return (
    <div className="flex flex-col justify-center items-center bg-prp">
      <Head>
        <title>David Esposto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar toggle={toggle}></Navbar>
      <DropdownMenu isOpen={isOpen} toggle={toggle}></DropdownMenu>
      <AudioPlayer
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      ></AudioPlayer>
      <Footer></Footer>
    </div>
  );
}
