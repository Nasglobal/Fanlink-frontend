import { useState } from "react";
import axios from "axios";
import { api,base } from '@/lib/api'
import { Button } from "../ui/button";
import { notify } from "@/lib/utils";
import Loading from "../ui/Loading";

export default function VideoSplitter({ videoId,setReset }) {
  const [duration, setDuration] = useState(15);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  // const handleSplit = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${base}/split-video/`,{video_id: videoId, duration});
  //     setDownloadLink(response.data.download_url);
  //   } catch (error) {
  //     console.error("Error splitting video:", error);
  //   }
  //   setLoading(false);
  // };


  const handleSplit = async () => {
    setLoading(true);
    if (!videoId || !duration) {
        console.error("Missing video ID or split duration");
        setLoading(false);
        return;
    }

    const response = await fetch(`${base}/split-video/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            video_id: videoId,
            split_duration: duration,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        setDownloadLink(data?.download_url);
        setReset(data?.download_url)
        console.log("Response:", response);
        setLoading(false);
        notify("Video splitted successfully","success")
    } else {
        console.error("Failed to split video");
        setLoading(false);
        notify("Failed to split video","fail")
    }
};



  const handleDownload = async (folderName) => {
    setLoadingDownload(true)
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
        notify("Video downloaded successfully","success")
        setLoadingDownload(false)
    } else {
        console.error("Failed to download split videos");
        notify("Failed to download","success")
        setLoadingDownload(false)
    }
};

  return (
    <div className="p-4 border mt-5 rounded-lg flex flex-col gap-4">
      {!downloadLink && <>

        <label className="tex-sm font-semibold">Select Split Duration:</label>
      <select 
        value={duration} 
        onChange={(e) => setDuration(Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value={15}>15 seconds</option>
        <option value={20}>20 seconds</option>
        <option value={25}>25 seconds</option>
        <option value={30}>30 seconds</option>
        <option value={45}>45 seconds</option>
        <option value={60}>60 seconds</option>
        <option value={120}>2 minutes</option>
      </select>

      <Button 
        onClick={handleSplit} 
        className="bg-green-500 text-white " 
        disabled={loading}
      >
        {loading ? <>Splitting...pls wait <Loading/></> : "Split Video"}
      </Button>
      </>}
      

      {downloadLink && (
        <div className="mt-3">
          <button disabled={loadingDownload} onClick={()=>handleDownload(downloadLink)}   className="text-blue-600 flex underline">{loadingDownload ? <>Downloading...<Loading color="black"/></> : "Download Splitted Videos folder" }</button>
        </div>
      )}
    </div>
  );
}
