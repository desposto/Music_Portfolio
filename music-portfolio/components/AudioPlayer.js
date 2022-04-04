import React, { useRef, useState, useEffect } from "react";
import { IoShuffleOutline } from "react-icons/io5";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsFillHeartFill,
} from "react-icons/bs";

import Image from "next/image";

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    //sets isLiked to the opposite of the current isLiked
    setIsLiked(!isLiked);
  };

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationReference = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
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

  //sets the seconds to the songduration
  const loadedMeta = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setSongDuration(seconds);
  };

  //Converts song duration from seconds to Mins and Seconds
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  //Toggle play pause button
  const togglePlayPause = () => {
    const pastValue = isPlaying;
    setIsPlaying(!pastValue);
    if (!pastValue) {
      audioPlayer.current.play();
      // animationReference.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationReference.current);
    }
  };

  //Runs while playing
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    // animationReference.current = requestAnimationFrame(whilePlaying);
  };

  //change song range
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  //Change players current time
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / songDuration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  //Skips song
  const SkipSong = () => {
    const temp = isPlaying; //temp to hold if the player was playing upon next song
    setIsPlaying(false);
    if (temp === true) {
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
    progressBar.current.value = 0;
    setCurrentTime(0);
    props.setCurrentSongIndex(() => {
      let temp = props.currentSongIndex;
      temp++;
      if (temp > props.songs.length - 1) {
        temp = 0;
      }
      return temp;
    });
  };

  //reset song or move to previous song
  const prevSong = () => {
    const temp = isPlaying; //temp to hold if the player was playing upon prev song
    setIsPlaying(false);
    if (temp === true) {
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
    if (currentTime > 3) {
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

  // const handleKeyPress = (event) => {
  //   if (event.key === " ") {
  //     togglePlayPause();
  //   } else if (event.key === "ArrowLeft") {
  //     prevSong();
  //   } else if (event.key === "ArrowRight") {
  //     SkipSong();
  //   }
  // };

  //Shuffles song
  const shuffleSong = () => {
    const temp1 = isPlaying; //temp to hold if the player was playing upon Shuffle
    setIsPlaying(false); //need to quickly pause upon switching song to ensure the onTimeUpdate listener functions -> needs song to play or pause
    if (temp1 === true) {
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
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
    <div className="max-w-sm rounded overflow-hidden shadow-xl flex flex-col justify-center items-center my-4 z-10 grow">
      <div className="grid grid-cols-8 grid-rows-6 max-h-[28rem] max-w-xs">
        <div className="row-span-full col-span-full self-center -z-10 relative">
          {/* <Image
            className=""
            src={props.songs[props.currentSongIndex].img_src}
            layout="fill"
            objectFit="cover"
            alt=""
          /> */}
          <img src={props.songs[props.currentSongIndex].img_src}></img>
        </div>
        {/*Bottom Bar*/}
        <div className="col-start-1 col-span-8 row-start-5 row-span-2 grid grid-rows-6 grid-cols-11 bg-gradient-to-t from-bk via-bk bg-opacity-20 place-items-center relative " >
          <div className="row-start-3 row-span-1 grid p-0 absolute left-10 bottom-1 ">
            {/* Title */}
            <div className=" text-wt font-mono font-bold ">
              {props.songs[props.currentSongIndex].title}
            </div>
            {/* BPM */}
            <div className="text-xs font-mono text-wt absolute top-4 italic">
              {props.songs[props.currentSongIndex].bpm}BPM
            </div>
          </div>
          {/* CurrentTime */}
          <div className=" font-bold text-xs row-start-4 col-start-2 text-wt font-mono mt-6">
            {calculateTime(currentTime)}
          </div>
          {/* Duration */}
          <div className=" font-bold text-xs row-start-4 col-start-10 text-wt font-mono mt-6">
            {calculateTime(songDuration)}
          </div>
          {/* Buttons */}
          <div className="flex row-start-5 col-start-6">
            <button
              className={` text-wt text-xl  rounded-xl hover:shadow-xl hover:text-red-400 ${
                isLiked && "text-red-700"
              } bg-none`}
              onClick={handleLike}
            >
              <BsFillHeartFill />
            </button>
            {/*Backward Skip Button*/}
            <button className="skipButtons" onClick={prevSong} >
              <BsFillSkipStartFill />
            </button>

            {/*Play Button*/}
            <button
              className="hover:text-gray-500 flex items-center text-wt text-4xl hover:text-[2.15rem]"
              onClick={togglePlayPause}
            >
              {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
            </button>

            {/*Forward Skip Button*/}
            <button className="skipButtons" onClick={SkipSong}>
              <BsFillSkipEndFill />
            </button>

            {/*Shuffle Button*/}
            <button className="skipButtons text-xl" onClick={shuffleSong}>
              <IoShuffleOutline />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="row-start-4 col-start-6 mb-2">
            <input
              className="progressBar"
              type="range"
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            ></input>
          </div>
        </div>
        <div className="col-start-2 row-start-6 row-span-2">
          {/*Audio*/}
          <audio
            ref={audioPlayer}
            src={props.songs[props.currentSongIndex].src}
            preload="metadata"
            onEnded={SkipSong} //starts next song when song ends
            onTimeUpdate={whilePlaying} //runs whileplaying on time update
            onLoadedMetadata={loadedMeta} //runs loadedMeta when the metadata loads to set song duration
          ></audio>
        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };
