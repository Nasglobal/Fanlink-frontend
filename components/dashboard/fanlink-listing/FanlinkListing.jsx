"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import SearchBar from '@/components/ui/SearchBar'
import { StereoIcon } from '@/components/vectors'
import { Edit3Icon, Trash2,DownloadIcon,CopyIcon,Link2Icon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { api } from '@/lib/api'
import Loading from '@/components/ui/Loading'
import { copyToClipboard } from '@/lib/utils'



function FanlinkListing() {

    const [currentPage, setCurrentPage] = useState(1);
    const [page_size, setPage_size] = useState(100);
    const [loading,setLoading] = useState(false)
    const [results,setResults] = useState(null)
    const [error,setError] = useState(null)

    
      const getFanlinks = (page,page_size)=>{
        setLoading(true)
          axios.get(api + `/fanlinks/?page=${page}&page_size=${page_size}`).then(
              response =>{
               console.log("new response",response)
               let arr = response.data.results;
               setResults(arr)
               setLoading(false)
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
      getFanlinks(currentPage,page_size)
    },[])
    
     


  return (
    <main className='flex flex-col text-white mt-5 mx-5 gap-5'>
       <header className='flex justify-between items-center'>
       <p className='text-lg font-bold '>Active Links</p>
       <div className='flex gap-3'>
       {/* <Link href={"/dashboard/create-link"} className='flex font-normal items-center gap-2 bg-red-600 text-white p-2 text-sm rounded-md'>
       <DownloadIcon/> Export csv
       </Link>
       */}
       <Link href={"/dashboard/create-link"} className='flex border font-semibold border-white text-white p-2 text-sm rounded-full'>
       + Create new fanlink
       </Link>
       </div>
       </header>
      
       <SearchBar
       placeholder={"Search fanlink by title.. "}
       />

       <section className='flex flex-col gap-4 mt-3'>
       {loading ?
             <div className='flex justify-center items-center mt-10'>
              <Loading/> Loading...
             </div>:
             <>
              {error ? 
                <p className=' flex justify-center items-center mt-10 text-red-500'>{error}</p>
                :
             <>

        {results?.map((item,index)=>(
           <div key={index} className='grid grid-cols-4 text-white bg-[#191918] p-3 rounded-md'>
           <div className=' col-span-2 flex gap-4'>
           <Image
           src={item?.YoutubeLink?.split("v=")[1].split("&")[0] ? `https://img.youtube.com/vi/${item?.YoutubeLink?.split("v=")[1].split("&")[0]}/maxresdefault.jpg` : "/assets/images/fanlink-image1.png"}
           alt='fanlink-image'
           width={80}
           height={60}
           className='rounded-lg'
           />
           <div className='flex flex-col text-[8px] gap-1'>
           <p className='font-semibold text-[9px]'>{item?.TrackName}</p>
           <p >{item?.ArtistName}</p>
           <p >Release : {item?.ReleaseDate}</p>
           <p >UPC : {item?.UPC}</p>
           <p className='font-medium flex gap-1' ><span><Link2Icon size={14}/></span>{`${window.location.origin}/${item?.ArtistName}-${item?.TrackName}`}<span><CopyIcon size={14} onClick={()=>copyToClipboard(`${window.location.origin}/${item?.ArtistName}-${item?.TrackName}`)}/></span></p>
           </div>
           </div>

        <div className=' col-span-1  flex flex-col justify-center'>
        <p className='text-sm'>{item?.clicks}</p>
        <p className='text-sm'>Clicks</p>
        </div>

        <div className=' col-span-1 flex gap-2 justify-center items-center'>
        <Link target="_blank" href={`${window.location.origin}/${item?.ArtistName}-${item?.TrackName}`} className='flex border font-normal border-white text-white py-1 px-3 text-sm rounded-md'>
       View_link
       </Link>
         
        <StereoIcon/>
        <Edit3Icon/>
        <Trash2/>
        </div>
        </div>
        ))}

             
             </>
                  
                 
              }


               </>
             
                  }

       </section>
       
    </main>
  )
}

export default FanlinkListing

const list = [
    {
       title:"Theophilus Sunday - Tongues of fire - Single",
       artist:"Theophilus Sunday",
       link:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
       upc:"73873879094555",
       date:"21/09/3039",
       image:"/assets/images/fanlink-image1.png",
       clicks:"12390"
    },
    {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        link:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        date:"21/09/3039",
        image:"/assets/images/fanlink-image1.png",
        clicks:"12390"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        link:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        date:"21/09/3039",
        image:"/assets/images/fanlink-image1.png",
        clicks:"12390"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        link:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        date:"21/09/3039",
        image:"/assets/images/fanlink-image1.png",
        clicks:"12390"
     },
     {
        title:"Theophilus Sunday - Tongues of fire - Single",
        artist:"Theophilus Sunday",
        link:"https://myhost..com/Theophilus Sunday - Tongues of fire - Single",
        upc:"73873879094555",
        date:"21/09/3039",
        image:"/assets/images/fanlink-image1.png",
        clicks:"12390"
     }
]