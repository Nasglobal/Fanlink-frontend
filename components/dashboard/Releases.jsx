"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import SearchBar from '@/components/ui/SearchBar'
import { StereoIcon } from '@/components/vectors'
import axios from 'axios'
import { api,base } from '@/lib/api'
import {DownloadIcon,CopyIcon,Link2Icon } from 'lucide-react'
import Image from 'next/image'
import { FilterIcon, ChevronDown,UploadIcon, Share2Icon} from 'lucide-react'
import DynamicTable from './DynamicTable'
import UpdateReleasesModal from './modals/UpdateReleasesModal'
import Loading from '../ui/Loading'
import { notify } from "@/lib/utils";


function Releases() {
    const [openReleases,setOpenReleases] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [page_size, setPage_size] = useState(100);
    const [loading,setLoading] = useState(false)
    const [results,setResults] = useState(null)
    const [error,setError] = useState(null)
    const [exporting,setExporting] = useState(false)

    const columns = [
        { key: "Label", header: "Label" },
        { key: "Artists" , header: "Artist" },
        { key: "Title", header: "Title" },
        // { key: "UPC", header: "UPC" },
        { key: "ReleaseDate", header: "Release_Date" },
        { key: "FanlinkSent", header: "Fanlinks" },
        { key: "MissingLinks", header: "MissingLinks" },
      ];

      const getReleases = (page,page_size)=>{
        setLoading(true)
          axios.get(api + `/releases/?page=${page}&page_size=${page_size}`).then(
              response =>{
               console.log("new response",response)
               let arr = response.data.results;
               setResults(arr)
               setLoading(false)
               console.log("response.data ok")
              }
          ).catch(
               err =>{
               console.log(err)
               setError(err.message)
               setLoading(false)
               }
          )
      }

    useEffect(()=>{
      getReleases(currentPage,page_size)
    },[])




    const handleExport = () => {
        setExporting(true)
        
        const url = `${base}/export-releases-fanlink/`;  
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
            },
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }else{
                setExporting(false)
                notify("Sorry error occured","error")
                throw new Error('Network response was not ok.')
            }
            
        })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Releases_fanlink.xlsx`); // Specify the filename
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setExporting(false)
            notify("Releases fanlink exported successfully","success")
        })
        .catch(error => console.error('Export failed:', error));
    };
    
     

  return (
    <main className='flex flex-col text-white mt-5 mx-5 gap-5'>
        <header className='mb-3 flex justify-between md:flex-row gap-4 flex-col items-center'>
          <div>
        <p className='text-2xl font-bold'>Fanlink <span className='text-red-500'>Releases</span></p>
        <p className='text-xs  mt-2'>These are the fanlinks releasee</p>
        </div>
        <div onClick={()=>setOpenReleases(true)} className='flex cursor-pointer font-normal items-center gap-2 border text-white h-9 p-2 text-sm rounded-md'>
          Update Releases <UploadIcon/>
        </div>
      </header>
       <div className='w-full flex md:flex-row flex-col justify-between gap-10'>
        <div className='md:w-[30%] w-full'>
       <SearchBar
       placeholder={"Search fanlink by title.. "}
       />
       </div>
       <div className='flex gap-3 items-center justify-center '>

        <div className='flex font-normal items-center gap-2 border text-white p-2 text-sm rounded-md'>
         <FilterIcon/> Filter <ChevronDown/>
        </div>

       <button disabled={exporting} onClick={handleExport} className='flex font-normal items-center gap-2 bg-red-600 text-white p-2 text-sm rounded-md'>
        {exporting ? <>Exporting...<Loading color='white' /></> : <>Export Releases <DownloadIcon/></> }
       </button>
       </div>
       </div>
      
             <div className="mt-10">
             {loading ?
             <div className='flex justify-center items-center mt-10'>
              <Loading/> Loading...
             </div>:
             <>
              {error ? 
                <p className=' flex justify-center items-center mt-10 text-red-500'>{error}</p>
                :

                <DynamicTable
                    data={results}
                    // data={results?.map((result) => ({
                    //   ...result,
                    //  NewFanlink: `${window.location.origin}${result?.FanlinkSent}`,
                    // }))}
                    columns={columns}
                    
                  /> 
                  
                 
              }


               </>
             
                  }
                   
       </div>
       <UpdateReleasesModal
       open={openReleases}
       setOpen={setOpenReleases}
       />
    </main>
  )
}

export default Releases

const releases = [
    {
       title:"Theophilus Sunday - Tongues of fire - Single",
       artist:"Theophilus Sunday",
       fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
       upc:"73873879094555",
       release_date:"21/09/3039",
       label: "Tjoe records"
    },
    {
        title:"Theophilus Sunday - Tongues of fire - Single",
       artist:"Theophilus Sunday",
       fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
       upc:"73873879094555",
       release_date:"21/09/3039",
       label: "Tjoe records"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
       artist:"Theophilus Sunday",
       fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
       upc:"73873879094555",
       release_date:"21/09/3039",
       label: "Tjoe records"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
       artist:"Theophilus Sunday",
       fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
       upc:"73873879094555",
       release_date:"21/09/3039",
       label: "Tjoe records"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        release_date:"21/09/3039",
        label: "Tjoe records"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        fanlink:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        release_date:"21/09/3039",
        label: "Tjoe records"
     }

]