"use client"
import { useState,useEffect } from "react";
import UploadVideo from "./UploadVideo";
import TrimVideo from "./TrimVideo";
import VideoSplitter from "./VideoSplitter";
import ReactPlayer from "react-player";
import { notify } from "@/lib/utils";
import { base } from "@/lib/api";
import axios from "axios";
import { Trash2Icon,DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import Loading from "../ui/Loading";

export default function VideoEdit() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [activeTab, setActiveTab] = useState("split");
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTrim, setLoadingTrim] = useState(false);
  const [reset, setReset] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [downloadId, setDownloadId] = useState(null);

  


  const onTabSelect = (tab) => {
    setActiveTab(tab);
  };


  const back = () => {
    setVideoId(null)
    setVideoUrl(null)
  };




  const handleTrim = async (startTime,endTime,waterFile) => {
    setLoadingTrim(true)
    setDownloadId(videoId)
    if (!startTime || !endTime || !videoId){
        notify("Video not ready for trimming, drag the pointers to set duration", "fail");
        setLoadingTrim(false)
        return
    }

    if(!isChecked && !waterFile){
      notify("please upload watermark image or select default", "fail");
      setLoadingTrim(false)
      return
    }

    const formData = new FormData();
    formData.append("video_id", videoId);
    formData.append("start_time", startTime.toFixed(2));
    formData.append("end_time", endTime.toFixed(2));

    if (waterFile && !isChecked) {
      formData.append("watermark_image", waterFile);
    }


    try {
      const response = await axios.post(base + "/trim-video/", formData,{
        headers: { "Content-Type": "multipart/form-data" }, 
    });
  
      notify("Video trimmed successfully!", "success");

      const trimmedUrl = response.data.trimmed_video_url;
      const videoname = trimmedUrl.split("/").pop(); // get the filename from URL
      
      // Request from custom download endpoint
      const videoResponse = await axios.get(`${base}/trimmed-video/${videoname}/`, {
        responseType: "blob",
      });

    // const videoResponse = await axios.get(response.data.trimmed_video_url, {
    //   responseType: "blob",
    // });

    // Create a Blob URL for downloading
    const blob = new Blob([videoResponse.data], { type: "video/mp4" });
    const blobUrl = URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `trimmed_${videoname}`; // Sets file name
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    setLoadingTrim(false)
  
    } catch (error) {
      console.error("Error trimming video:", error);
      notify("Error trimming video", "fail");
      setLoadingTrim(false)
    }
  };

  
 
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${base}/videos/`);
        setVideos(response.data.videos);
        console.log("videos:",response.data.videos)
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [videoUrl,reset]);


  const handleSplit = async (videoId,duration) => {
    setLoading(true);
    setDownloadId(videoId)
    
    const formData = new FormData();
    formData.append("video_id", videoId);
    formData.append("duration", duration);
    

    const response = await axios.post(`${base}/split-video/`, formData,{
        headers: { "Content-Type": "multipart/form-data" }, 
    });

    console.log("response data:",response)

    if (response.status == 200) {
        console.log("Response:", response);
        setReset(response?.data?.download_url)
        setLoading(false);
        notify("Video splitted successfully","success")
    } else {
        console.error("Failed to split video");
        notify("Failed to split video","fail")
        setLoading(false);
    }
};


const handleDownload = async (folderName) => {
    setLoading(true)
    const response = await fetch(`${base}/download-split-folder/${folderName}/`);
    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${folderName}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        notify("Splitted videos folder downloaded successfully","success")
        setLoading(false)
    } else {
        console.error("Failed to download split videos");
        notify("Failed to download split videos","fail")
        setLoading(false)
    }
};


const handleDeleteVideo = async (videoId) => {
    setDeleteId(videoId)
    setLoadingDelete(true)
    try {
        const response = await fetch(`${base}/delete-video/${videoId}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete video");
        }

        notify("Video deleted successfully", "success");

        // Optionally, update state to remove the deleted video from the list
        setVideos((prevVideos) => prevVideos.filter(video => video.id !== videoId));
        setLoadingDelete(false)
    } catch (error) {
        console.error("Deletion error:", error.message);
        notify("Error deleting video", "fail");
        setLoadingDelete(false)
    }
};


  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Video Splitting</h1>
    <section className="grid md:grid-cols-2  gap-6">
     <div className="col-span-1">
      {!videoUrl || !videoId ? <UploadVideo setVideoUrl={setVideoUrl} setVideoId={setVideoId} /> : 
      <section className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
     <div>
     <div className="flex justify-between items-center mb-4">
     <h3 className="text-xl font-semibold ">Uploaded Video</h3>
     <h1 onClick={back} className="text-lg font-bold cursor-pointer text-red-500">Cancel</h1>
     </div>
      <ReactPlayer
        url={videoUrl} // Use the correct API endpoint
        controls={true} // Show play, pause, and seek controls
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width="100%"
        height="200px"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // Prevents downloads
              crossOrigin: "anonymous",
            },
          },
        }}
      />
      </div>
       <header className="grid grid-cols-2 items-center mt-10 overflow-x-auto">
        {videoNav?.map((nav, index) => (
          <h2
            onClick={() => onTabSelect(nav.tag)}
            key={index}
            className={`font-medium text-center whitespace-nowrap text-[15px] leading-[22px] cursor-pointer  py-2 transition-all ${
              activeTab === nav?.tag
                ? "text-red-500 font-semibold border-b-2 border-red-500"
                : "text-gray-700 border-b border-gray-700"
            } `}
          >
            {nav?.name}
          </h2>
        ))}
      </header>
      {activeTab == "split" ?  <VideoSplitter videoId={videoId} setReset={setReset} /> : null}
      {activeTab == "trim" ?  <TrimVideo videoSrc={videoUrl} onTrim={handleTrim} loadingTrim={loadingTrim} isChecked={isChecked} setIsChecked={setIsChecked} />  : null}
      </section>
      }
      </div>
      <div className="col-span-1 border p-4 ">
      <h2 className="text-xl font-bold mb-4 text-center">Uploaded Videos</h2>
      <ul className="space-y-2">
        {videos.length === 0 ? (
          <p className="text-sm text-center text-red-500">No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <li key={video.id} className="p-2 bg-gray-200 rounded-md flex justify-between gap-4 ">
              <a
                href={`${video.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm font-semibold mt-1 hover:underline"
              >
                {video.name}
              </a>

              {/* <span className="ml-2 text-gray-500 text-sm">
                ({new Date(video.uploaded_at).toLocaleString()})
              </span> */}
              
              <div className="flex gap-4">

                {loading &&  downloadId == video.id  ? <Loading color="black"/>:
                <>

             {video?.splitted == "Yes" ?
              <p onClick={()=>handleDownload(video.name.split(".mp4")[0])} className="flex text-xs text-green-500 gap-1 rounded-sm cursor-pointer justify-center items-center p-1 border border-green-500">Download splitted folder<DownloadIcon size={20} color="green"/></p>
              :
              <p onClick={()=>handleSplit(video.id,15)} className="flex text-xs gap-1 rounded-sm cursor-pointer justify-center items-center p-1 border border-black">Split into 15 secs videos</p>
              }
                </>}
              
               <div className="mt-1">
               {loadingDelete && deleteId == video.id ? <Loading color="black"/> :
               <p onClick={() => handleDeleteVideo(video.id)}>
                <Trash2Icon size={20} color="red" />
               </p>
               }
              </div>
              

              </div>
               
            </li>
          ))
        )}
      </ul>
      </div>
      </section>
    </div>
    
  );
}

const videoNav = [
    {id: 1, name: "Auto Split Video",tag:"split"},
    {id: 2, name:"Trim a Section",tag:"trim"},
  ];