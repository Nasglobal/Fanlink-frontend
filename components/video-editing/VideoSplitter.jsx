import { useState } from "react";
import axios from "axios";
import { api,base } from '@/lib/api'
import { Button } from "../ui/button";
import { notify } from "@/lib/utils";
import Loading from "../ui/Loading";
import { Checkbox } from "../ui/checkbox";
import { UploadIcon } from "../vectors";

export default function VideoSplitter({ videoId,setReset }) {
  const [duration, setDuration] = useState(15);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [waterFile, setWaterFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWaterFile(file);
    }
  };



  const handleSplit = async () => {
    setLoading(true);
    if (!videoId || !duration) {
        console.error("Missing video ID or split duration");
        setLoading(false);
        return;
    }

    if(!isChecked && !waterFile){
      notify("please upload watermark image or select default", "fail");
      setLoading(false);
      return
    }

    const formData = new FormData();
    formData.append("video_id", videoId);
    formData.append("duration", duration);

    if (waterFile && !isChecked) {
      formData.append("watermark_image", waterFile);
    }
    

    const response = await axios.post(`${base}/split-video/`, formData,{
        headers: { "Content-Type": "multipart/form-data" }, 
    });

    console.log("response data:",response)

    if (response.status == 200) {
        //const data = await response.json();
        setDownloadLink(response?.data?.download_url);
        setReset(response?.data?.download_url)
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


const handleCheckboxClick = () => {
  setIsChecked(prev=>!prev);
};

  return (
    <div className="p-4 border mt-5 rounded-lg flex flex-col gap-4">
      {!downloadLink && <>

        <p className="tex-sm font-semibold">Select Split Duration:</p>
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

     
    <p className="text-sm text-start font-semibold mt-5">Upload watermark image or use default:</p>

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
