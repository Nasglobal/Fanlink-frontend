import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { notify } from "@/lib/utils";
import Loading from "../ui/Loading";
//import { formatTime } from "./utils"; // A utility function to format time in mm:ss

const TrimVideo = ({ videoSrc, onTrim, loadingTrim}) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
        setEndTime(videoRef.current.duration);
      };
    }
  }, [videoSrc]);

  const handlePointerDown = (type) => setDragging(type);

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const bar = e.target.closest(".bar-container");
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;

    if (dragging === "start" && newTime < endTime) {
      setStartTime(newTime);
    } else if (dragging === "end" && newTime > startTime) {
      setEndTime(newTime);
    }
  };

  const handlePointerUp = () => setDragging(null);

  return (
    <div className="flex flex-col items-center w-full">
       <video ref={videoRef} src={videoSrc} controls className="w-full max-w-xl mt-3" /> 
      <p className="text-sm text-center my-2">Drag both pointer to set video trim time</p>
      <div
        className="relative w-full max-w-xl  bar-container bg-gray-300 h-2 rounded-md"
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
      >
        {/* Selected range */}
        <div
          className="absolute h-full bg-gray-700 opacity-50"
          style={{ left: `${(startTime / duration) * 100}%`, width: `${((endTime - startTime) / duration) * 100}%` }}
        />
        
        {/* Start Pointer */}
        <div
          className="absolute w-2 h-4 bg-[#181818] rounded-md -top-1 cursor-pointer"
          style={{ left: `${(startTime / duration) * 100}%` }}
          onMouseDown={() => handlePointerDown("start")}
        />
        
        {/* End Pointer */}
        <div
          className="absolute w-2 h-4 bg-[#181818] rounded-md -top-1 cursor-pointer"
          style={{ left: `${(endTime / duration) * 100}%` }}
          onMouseDown={() => handlePointerDown("end")}
        />
      </div>
      
      {/* Display selected times */}
      <div className="flex justify-between w-full max-w-xl mt-1 text-xs font-semibold">
        <span>StartTime: {formatTime(startTime)}</span>
        <span>EndTime: {formatTime(endTime)}</span>
      </div>
      
      <Button
       disabled={loadingTrim}
        onClick={() => onTrim(startTime, endTime)}
        className="mt-4 bg-green-500 text-white w-full"
      >
        {loadingTrim ? <Loading/>: "Trim Video"}
        
      </Button>
    </div>
  );
};

export default TrimVideo;

// Utility function to format time
  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
