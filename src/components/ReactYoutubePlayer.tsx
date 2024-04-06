// Dependencies
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faExpand } from "@fortawesome/free-solid-svg-icons";

import { Slider } from "@material-tailwind/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const ReactYoutubePlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [playing, setPlaying] = useState<any>(true);
  const [seek, setSeek] = useState<any>({ played: 0 });
  const [isFullScreen, setIsFullScreen] = useState<any>(false);
  const handleFullScreen = useFullScreenHandle();

  const player = useRef<any>();
  return (
    <FullScreen handle={handleFullScreen}>
    <div className=" react-player1 ">
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-0"
          onClick={() => setPlaying(!playing)}
        ></div>
        <ReactPlayer
          url={videoUrl + "&rel=0"}
          playing={playing}
          onProgress={(e) => {
            setSeek(e);
            console.log(e);
          }}
          loop={false}
          height={`${handleFullScreen.active ? "94vh":"50vh"}`}
          width="100%"
          ref={player}
          onEnded={() => {
            player.current.seekTo(0);
            setSeek({
              played: 0,
            });
          }}

          //   className="h-[100vh]"
          //   className="react-player"
        />
      </div>
      <div className="bg-gray-900 rounded-b-lg text-white p-4  flex items-center">
        <button onClick={() => setPlaying(!playing)}>
          <FontAwesomeIcon
            icon={playing ? faPause : faPlay}
            className="text-2xl  "
          />
        </button>
        <div className="w-full mx-6">
          {/* <input
            className=" w-full "
            type="range"
            value={seek.played * 100}
            onMouseDown={() => {}}
            onMouseUp={(e: any) => {
              player.current.seekTo(parseFloat(e.target.value) / 100);
              // player.seekTo(parseFloat(e.target.value));
            }}
            onChange={(e: any) => {
              setSeek({
                played: e.target.value / 100,
              });
            }}
          /> */}
          <Slider
            barClassName=" bg-[#B153E0]"
            className="text-[#B153E0]"
            defaultValue={0}
            value={seek.played * 100}
            onMouseDown={() => {}}
            onMouseUp={(e: any) => {
              player.current.seekTo(parseFloat(e.target.value) / 100);
              // player.seekTo(parseFloat(e.target.value));
            }}
            onChange={(e: any) => {
              setSeek({
                played: e.target.value / 100,
              });
            }}
          />
        </div>

        <button
          onClick={() => {
            if (handleFullScreen.active) {
              handleFullScreen.exit();
            } else {
              handleFullScreen.enter();
              console.log(handleFullScreen);
            }
          }}
        >
          <FontAwesomeIcon icon={faExpand} className="text-2xl  " />
        </button>
      </div>
    </div>
    </FullScreen>
  );
};

export default ReactYoutubePlayer;
