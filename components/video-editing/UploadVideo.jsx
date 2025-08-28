"use client"
import { useState } from "react";
import axios from "axios";
import { api,base } from '@/lib/api'
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/utils";
import Loading from "../ui/Loading";
import ReactPlayer from "react-player";

export default function UploadVideo({ setVideoUrl,setVideoId }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const fileTypes = ["mp4"];

  const handleUpload = async () => {
    setLoading(true);

    if (!file) {
        notify("No file selected", "fail");
        setLoading(false);
        return;
    }

    try {
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(base + `/upload/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        });

        if (response.status !== 200) {
            throw new Error("Failed to upload. Please try again.");
        }

        setVideoUrl(response?.data?.video_url);
        setVideoId(response?.data?.video_id);
        setFile(null);
        notify("Upload successful", "success");

    } catch (error) {
        console.error("Upload error:", error);

        if (axios.isAxiosError(error)) {
            notify(error.response?.data?.message || "Upload failed. Please try again.", "error");
        } else {
            notify("An unexpected error occurred. Please try again.", "error");
        }

    } finally {
        setLoading(false);
    }
};

  async function handleVideoChange(file) {
    setSelecting(true)

    // Check file size (1GB = 1073741824 bytes)
  if (file.size > 1073741824) {
    notify("Video size exceeds 1GB limit. please upload Video less than 1GB", "fail");
    setSelecting(false);
    return;
  }

    const reader = new FileReader();
    reader.onabort = () => {
      notify("There was an error. Please retry.", "error");
      setSelecting(false)
      return;
    };
    reader.onerror = () => {
      notify("There was an error. Please retry.", "error");
      setSelecting(false)
      return;
    };
    reader.onload = () => {
        setFile(file);
        setFileName(file.name)
        setSelecting(false)
    };
    reader.readAsDataURL(file);
    
    
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        {file &&
        <p onClick={()=>setFile("")} className="text-2xl cursor-pointer font-semibold mb-3  text-end">x</p>
         }
        {!file && 
      <FileUploader
              //handleChange={handleBannerFileChange}
              handleChange={handleVideoChange}
              types={fileTypes}
            >
            {selecting ? <>Loading video. please wait...<Loading color="black"/></> : 
                <div className="w-full border-2 border-dashed rounded-md p-4 items-center mb-5 flex flex-col gap-4">
                    <p className="text-sm text-gray-600">Drag and drop video</p>
                    <p>or</p>
              <Button 
                className={"bg-gray-200 text-black hover:bg-gray-200"}
              >
                Click to select a video
              </Button>
              </div>}
        </FileUploader>
}
      {/* <input
        type="file"
        accept="video/*"
        className="block w-full p-2 border rounded-lg mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      /> */}
      {file && fileName &&
      <p className="text-center text-gray-600 font-semibold text-sm p-3 mb-3 border-2 rounded-md">{fileName.length > 50 ? fileName.slice(0, 60) + "...": fileName}</p>
      }
      <>
      {!selecting && 
      <Button
        disabled={loading}
        onClick={handleUpload}
        className={`w-full text-white py-2 rounded-lg ${file && fileName ? "bg-red-500" : "bg-gray-800" } hover:bg-gray-600 transition`}
      >
        {loading ? <Loading/> : "Upload Video"}
      </Button>
      }
      </>
      

      {loading && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
