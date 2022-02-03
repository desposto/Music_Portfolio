import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AudioPlayer } from "../components/AudioPlayer";

export default function Home() {
  const [songs] = useState([
    {
      title: "Beach Party",
      img_src: "/imgages/Jas.png",
      src: "./music/$beach partuy.mp3",
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      img_src: "/imgages/Bryan.jpg",
      src: "./music/$Beauty.mp3",
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      img_src: "/imgages/Eric.png",
      src: "./music/$clk clik cla.mp3",
    },
    {
      title: "Song 4",
      artist: "Artist 4",
      img_src: "/imgages/Jas.png",
      src: "./music/$When we sleep.mp3",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  return (
    <div className={styles.container}>
      <Head>
        <title>David Esposto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AudioPlayer
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
        ></AudioPlayer>
      </main>
    </div>
  );
}
