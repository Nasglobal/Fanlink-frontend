import React, {useEffect,useState} from 'react'
import { api } from '@/lib/api'
import axios from 'axios'
import Loading from '@/components/ui/Loading'
import { CloseIcon } from '@/components/vectors'
import Modal from './Modal'
import { notify,readFromLocalStorage } from '@/lib/utils'
import Image from 'next/image'

function UpdateReleasesModal({open,setOpen}) {

    const [file,setFile] = useState(null);
    const [fileError,setFileError] = useState(null);
    const [success,setSuccess] = useState(null);
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
  


    const handleDragOver = (event)=>{
        event.preventDefault()
     }
   
     const handleDrop = (event)=>{
       event.preventDefault();
       const droppedFile = event.dataTransfer.files;
       if(droppedFile.length > 1){
        setFileError("Only a single csv file is permitted at a time")
        return
       }
       if (droppedFile[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // File is XLSX
        setFile(droppedFile[0]);
        setFileError(null)
      } else {
        setFileError("file format not supported")
       return
      }
     }

     const updateReleases = async () => {
        setLoader(true)
        const formData = new FormData();
        formData.append('releases', file);
        try {
            const response = await axios.post(api + `/releases/upload_releases/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });
            console.log(response)
            if (response.data.message === "Releases upload successful"){
             setLoader(false) 
             notify("Releases upload successful","success")
             setOpen(false)
            }
        } catch (error) {
            console.error('Error uploading CSV:', error);
            setErrorMessage(`${error?.message}, are you sure you uploaded the correct file?`)
            setLoader(false)
        }
    };
    
   

    useEffect(() => {
        if (errorMessage) {
          
          const timer = setTimeout(() => {
            setErrorMessage(null);
          }, 6000);
    
          return () => clearTimeout(timer);
        }
      }, [errorMessage]);


       
      const handleCancel = ()=>{
        setFile(null);
        setErrorMessage(null);
      }

  return (
    <Modal open={open}>
    <div className='w-[50%] h-[400px] text-[#18191F8C] bg-gray-300 p-5'>
        <p onClick={()=>{setOpen(false);setFile(null);setErrorMessage(null);}} className='font-bold text-xl cursor-pointer flex justify-end self-end'><CloseIcon color="black"/></p>
       
        {!file && <div 
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    className="w-full h-[330px] cursor-pointer bg-[#F4F4F4] flex flex-col  justify-center border-2 items-center rounded-sm p-12 ">
        {fileError && <p className='text-sm text-red-500'>{fileError}</p>}
                          <div className="flex w-max flex-col gap-1 justify-center items-center">
                          <Image
                           src={"/assets/svg/image-upload.svg"} 
                           alt='upload image'
                           height={70} 
                           width={70}
                           className='h-[60px] w-[60px]' />
                            <p className="text-base font-semibold">
                              <span className="">
                              Drag and drop releases file
                              </span>{" "}
                             
                            </p>

                            <p className="text-xs font-normal text-[#18191F8C]">
                              File format: csv, xlxs
                            </p>
                          </div>
                        </div>}

     {file && <div   className="w-full h-[330px] cursor-pointer bg-[#F4F4F4] flex flex-col justify-center gap-4 border-2 items-center rounded-sm p-12">
        
       <div className='flex flex-col my-5 w-1/2'>
       
      <p className=' px-10 py-2 border text-center bg-slate-300  cursor-pointer rounded-sm text-sm text-gray-800' >{file.name}</p>
       </div>
        {errorMessage && <p className='text-xs text-red-500 mb-3 w-[250px]'>{errorMessage}</p>}
        <div className='flex gap-3'>
        <p onClick={handleCancel} className='flex text-gray-600 border rounded-md p-2 border-black font-semibold cursor-pointer text-sm' >Cancel </p> 
        <button onClick={updateReleases}   className='flex text-sm py-2 px-6 text-white bg-red-600 rounded-md'>
         {loader ? <><Loading color='white'/> pls wait..</> : "Upload Releases" }
        </button>
        </div>
        
      </div>
   
    } 

   
    </div> 
    </Modal>
  )
}

export default UpdateReleasesModal