"use client"
import { useState,useEffect } from "react";
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
  const [viewLink, setViewLink] = useState(false);

//   const handleUpload = async () => {
//     setLoading(true);

//     if (!file) {
//         notify("No file selected", "fail");
//         setLoading(false);
//         return;
//     }

//     try {
//         setUploadProgress(0);

//         const formData = new FormData();
//         formData.append("file_sheet", file);

//         const response = await axios.post(base + `/upload-sheet/`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//             onUploadProgress: (progressEvent) => {
//                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 setUploadProgress(percentCompleted);
//             },
//         });

//         if (response.status !== 200) {
//             throw new Error("Failed to upload. Please try again.");
//         }

        
//         setFile(null);
//         setViewLink(true)
//         notify("Upload successful", "success");
      

//     } catch (error) {
//         console.error("Upload error:", error);

//         if (axios.isAxiosError(error)) {
//             notify(error.response?.data?.message || "Upload failed. Please try again.", "error");
//         } else {
//             notify("An unexpected error occurred. Please try again.", "error");
//         }

//     } finally {
//         setLoading(false);
//     }
// };


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
            responseType: 'blob', // 🔑 important: tells axios to expect a binary file
        });

        if (response.status !== 200) {
            notify("Sorry an Error occured", "fail");
            throw new Error("Failed to upload. Please try again.");    
        }

        // 🔽 Auto-download the returned ZIP
        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Mike Ejeagha-Account_Reports.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);

        setFile(null);
        setViewLink(true);
        notify("Upload and download successful", "success");

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


useEffect(() => {
  // Prevent browser from opening the file when dropped outside
  const handleWindowDragOver = (e) => e.preventDefault();
  const handleWindowDrop = (e) => e.preventDefault();

  window.addEventListener("dragover", handleWindowDragOver);
  window.addEventListener("drop", handleWindowDrop);

  return () => {
    window.removeEventListener("dragover", handleWindowDragOver);
    window.removeEventListener("drop", handleWindowDrop);
  };
}, []);

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (!files || files.length === 0) return;

  if (files.length > 1) {
    notify("Only a single file is permitted at once", "fail");
    return;
  }

  const file = files[0];
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv" // .csv
  ];

  if (allowedTypes.includes(file.type)) {
    setFile(file);
    setViewLink(false)
  } else {
    notify("File format not supported", "fail");
  }
};



    

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

      {viewLink && !file && 
       <a
       href={`https://docs.google.com/spreadsheets/d/1J-nNwBetOsqu6EZk3-KsVBWJ_8sPgBc8AWnq9L-3yd0/edit?pli=1&gid=1480573682#gid=1480573682`}
       target="_blank"
       rel="noopener noreferrer"
       className="text-green-500 text-sm font-semibold mt-3 flex justify-end underline hover:text-green-400"
     >
       Click to view result on google sheet
     </a>
      }
    </div>
     
   
    </div>
  );
}
