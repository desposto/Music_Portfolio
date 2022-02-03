import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { IoShuffleOutline } from "react-icons/io5";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
} from "react-icons/bs";

import Image from "next/image";

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
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    isPlaying,
  ]);

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
      progressBar.current.value = 0;
      changeRange();
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
    progressBar.current.value = 0;
    changeRange();
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl relative">
      <div className="grid grid-cols-8 grid-rows-6">
        <div className="row-span-full col-start-1 col-span-10 self-center max-w-sm -z-10">
          <Image
            className="max-h-96"
            src={props.songs[props.currentSongIndex].img_src}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="col-start-2 row-start-6 row-span-2">
          <audio
            ref={audioPlayer}
            src={props.songs[props.currentSongIndex].src}
            preload="metadata"
          ></audio>
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
        </div>
        {/*Current Time*/}
        <div className="grid grid-cols-4 grid-rows-4 col-start-1 row-start-6">
          <div className=" font-bold text-sm row-start-2 col-start-3">
            {calculateTime(currentTime)}
          </div>
        </div>
        {/*Duration*/}
        <div className="grid grid-cols-4 grid-rows-4 col-start-7 row-start-6">
          <div className=" font-bold text-sm row-start-2 col-start-3">
            {calculateTime(length)}
          </div>
        </div>
        <div className="grid row-start-6 col-start-4">
          <div className="flex justify-center">
            <button className="skipButtons" onClick={prevSong}>
              <BsFillSkipStartFill />
            </button>
            <button
              className="hover:text-gray-500 flex items-center text-4xl "
              onClick={togglePlayPause}
            >
              {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
            </button>
            <button className="skipButtons" onClick={SkipSong}>
              <BsFillSkipEndFill />
            </button>
            <button className="skipButtons text-xl" onClick={shuffleSong}>
              <IoShuffleOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };
