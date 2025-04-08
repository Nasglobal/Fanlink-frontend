import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { notify } from "@/lib/utils";
import Loading from "../ui/Loading";
import { UploadIcon } from "../vectors";
import { Checkbox } from "../ui/checkbox";
//import { formatTime } from "./utils"; // A utility function to format time in mm:ss

const TrimVideo = ({ videoSrc, onTrim, loadingTrim,isChecked, setIsChecked}) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [dragging, setDragging] = useState(null);
  const [waterFile, setWaterFile] = useState(null);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWaterFile(file);
    }
  };

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


  const handleCheckboxClick = () => {
    setIsChecked(prev=>!prev);
  };

  return (
    <div className="flex flex-col  w-full">
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

      <p className="text-xs text-start font-semibold mt-7 mb-2">Upload watermark image or use default</p>

      <section className="grid grid-cols-2 gap-4">
       {!isChecked &&  
      <div className="w-full max-w-md mx-auto p-1 bg-white rounded-2xl shadow">
      <label
        htmlFor="watermarkFile"
        className="flex items-center justify-center border-2 border-dashed gap-4 border-gray-300 rounded-xl p-1 cursor-pointer hover:border-blue-500 transition"
      >
        <UploadIcon/>

        <p className={`text-[10px] ${waterFile  ? "text-blue-800":"text-gray-500"} `}>
          {waterFile ? waterFile?.name : "Click to upload watermark image"}
        </p>
        <input
          type="file"
          id="watermarkFile"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
}

     <div className='flex justify-end mt-3  text-[10px]'>
      <p className='flex gap-2'>Use default watermark 
      <Checkbox
      className="border-blue-700 w-4 h-4"
                   checked={isChecked}
                   onClick={handleCheckboxClick}
                    />
        </p>
       </div>



    </section>


      
      <Button
       disabled={loadingTrim}
        onClick={() => onTrim(startTime, endTime,waterFile)}
        className="mt-4 bg-green-500 text-white w-full"
      >
        {loadingTrim ? <><Loading/>pls wait...</>: "Trim Video"}
        
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
