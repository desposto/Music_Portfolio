import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { IoShuffleOutline } from "react-icons/io5";
import Image from 'next/image'

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [length, setLength] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationReference = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setLength(seconds);
    progressBar.current.max = seconds;
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const pastValue = isPlaying;
    setIsPlaying(!pastValue);
    if (!pastValue) {
      audioPlayer.current.play();
      animationReference.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationReference.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationReference.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / length) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const SkipSong = () => {
    props.setCurrentSongIndex(() => {
      let temp = props.currentSongIndex;
      temp++;
      if (temp > props.songs.length - 1) {
        temp = 0;
      }
      return temp;
    });
  };

  const prevSong = () => {
    if (currentTime != 0) {
      setCurrentTime(0);
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;
        if (temp < 0) {
          temp = props.songs.length - 1;
        }
        return temp;
      });
    }
  };

  const shuffleSong = () => {
    let temp = props.currentSongIndex;
    let rand = Math.floor(Math.random() * props.songs.length);
    while (rand == temp) {
      rand = Math.floor(Math.random() * props.songs.length);
    }
    props.setCurrentSongIndex(rand);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-2 mx-2 bg-white">
      <Image
        src={props.songs[props.currentSongIndex].img_src}
        alt=""
        width = {500}
        height={600}
      />
      <div className="flex w-1000px bg-sky-100">
        <audio
          ref={audioPlayer}
          src={props.songs[props.currentSongIndex].src}
          preload="metadata"
        ></audio>
        <button className="skipButtons" onClick={prevSong}>
          <FaArrowAltCircleLeft></FaArrowAltCircleLeft>
        </button>
        <button
          onClick={togglePlayPause}
          className="hover:text-gray-500 flex items-center w-75px h-75px"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="skipButtons" onClick={SkipSong}>
          <FaArrowAltCircleRight></FaArrowAltCircleRight>
        </button>
        <button className="skipButtons text-2xl" onClick={shuffleSong}>
          <IoShuffleOutline />
        </button>
        {/*Current Time*/}
        <div className="font-bold text-base ml-2 mr-2 items-center">
          {calculateTime(currentTime)}
        </div>
        {/*Progress bar*/}
        <div>
          <input
            className="progressBar"
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          ></input>
        </div>
        {/*Duration*/}
        <div className="font-bold text-xl ml-2">{calculateTime(length)}</div>
      </div>
    </div>
  );
};

export { AudioPlayer };
