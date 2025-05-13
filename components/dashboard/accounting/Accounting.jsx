"use client"
import { useState } from "react";
import axios from "axios";
import { api,base } from '@/lib/api'
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/utils";
import Loading from "@/components/ui/Loading";

export default function Accounting() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

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
        formData.append("file_sheet", file);

        const response = await axios.post(base + `/upload-sheet/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        });

        if (response.status !== 200) {
            throw new Error("Failed to upload. Please try again.");
        }

        
        setFile(null);
        notify("Upload successful", "success");
        console.log("response",response?.data)

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

const handleDragOver = (event)=>{
    event.preventDefault()
 }

 const handleDrop = (event)=>{
   event.preventDefault();
   const droppedFile = event.dataTransfer.files;
   if(droppedFile.length > 1){
    notify("Only a single file is permitted at once", "fail");
    return
   }
   if (droppedFile[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    // File is XLSX
    setFile(droppedFile[0]);
    
  } else {
    notify("File format not supported", "fail");
   return
  }
 }


    

  return (
    <div className="min-h-screen bg-gray-400 p-6">
    <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Accounting</h1>
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        {file &&
        <p onClick={()=>setFile("")} className="text-2xl cursor-pointer font-semibold mb-3  text-end">x</p>
         }
        {!file && 
            
                <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                 className="w-full h-40 border-2 border-dashed rounded-md p-4 items-center  flex flex-col gap-4">
                    <p className="text-lg text-gray-600 font-semibold ">Drag and drop excel file</p>
                    <p className="text-sm font-normal mt-10 text-[#18191F8C]">
                     File format: csv, xlxs
                    </p>
                </div>
       
}
      
      {file &&
      <p className="text-center text-gray-600 font-semibold text-sm p-3 mb-3 border-2 rounded-md">{file?.name}</p>
      }
      <>
      {file  && 
      <Button
        disabled={loading}
        onClick={handleUpload}
        className={`w-full text-white mt-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition`}
      >
        {loading ? <Loading/> : "Upload Account Sheet"}
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
    </div>
  );
}
