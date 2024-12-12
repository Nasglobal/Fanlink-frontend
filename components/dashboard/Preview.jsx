import React from 'react'
import Image from 'next/image'
import FanlinkButton from '../ui/FanlinkButton'
import { Hamburger } from '../vectors'
import Loading from '../ui/Loading'

function Preview() {
    const loader = false
    const error = null
  return (
    <div className=' flex flex-col items-center mt-7'>

    <p className='text-sm font-semibold mb-5'>preview</p>
    <div className='p-[3px] border rounded-[30px] w-[263px] h-[433px] border-white'>
    <div className='w-[260px] h-[430px] overflow-x-hidden scroll-my-8 border-2 rounded-[30px] bg-gray-100 border-white'>
      <div className='flex justify-between m-4'>
      <Image
          src={`/assets/images/header.png`}
          alt="store logo"
          width={100}
          height={40}
          className=" object-cover"
        />
       <Hamburger color="#000"/>
      </div>

      <section>

<div className='h-auto flex flex-col lg:mx-2  p-2'>

<div className="w-full">
<iframe
className='bg-black'
width="100%"
height="200"
src={`https://www.youtube.com/embed/${fanlinks?.youtubeLink?.split("v=")[1].split("&")[0]}`}
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
></iframe>

</div>
<div className=' h-full text-white bg-red-600 pb-3'>
  <div className='border border-white text-white m-2 py-3  text-xs flex flex-col items-center justify-center '>
      
      <p>{"John doe"}</p>

      <p>{"fulfilled"}</p>
  </div>

  {loader ? <p className='flex justify-center items-center text-white text-center'><Loading/> Loading...</p> : 
  <>
  {error ? <p className='text-center text-white'>{error}</p>:
  
  <div className='grid gap-2 mx-2'>
  
  <FanlinkButton
  fanklink={"/"}
  imageUrl="/assets/svg/spotify_logo.svg"
  />
    
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/youtube_logo.svg"
  />
    
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/boomplay.svg"
  />
 

  
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/audiomack.svg"
  />


    
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/itunes.svg"
  />
 

  
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/deezer.svg"
  />
 

   
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/apple-music.svg"
  />
  

 
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/tidal.svg"
  />
 

  
   <FanlinkButton
   fanklink={"/"}
   imageUrl="/assets/svg/amazon.svg"
  />
 

  </div>
  
  }
  </>
  }

</div>
</div>


      </section>

    </div>
    </div>

   </div>
  )
}

export default Preview


const fanlinks = {

}