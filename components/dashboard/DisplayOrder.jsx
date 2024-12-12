import React from 'react'
import { Checkbox } from '../ui/checkbox'
import Image from 'next/image'
import { PencilIcon } from 'lucide-react'

function DisplayOrder() {
  return (
    <div className='pt-5'>
<p className='text-xs font-semibold mb-3'>Music Service Display Order</p>
   <div className='flex justify-between text-[10px] pb-2 border-b mb-4 border-white'>
  <p className='flex gap-2'><Checkbox className="w-4 h-4"/>Use default display order</p>
  <p>Maximum of  8 links*</p>
   </div>

   <section className='flex flex-col'>
    {order.map((item,index)=>(
    
    <div key={index} className='flex justify-between items-center my-[10px]'>
    <Image
      src={item.imageUrl}
      alt = "button"
      width={60}
      height={20}
      className=""
      />
      <div className='border text-white items-center w-[110px] flex border-white justify-between p-[6px] rounded-md'>
        <p className='text-xs'>{item.title}</p>
       <PencilIcon size={15}/>
      </div>

    </div>

    ))}
   

   </section>

    </div>
  )
}

export default DisplayOrder


const order = [
  {
   imageUrl : "/assets/svg/spotify_logo.svg",
   title:"play"
  },
  {
    imageUrl : "/assets/svg/youtube_logo.svg",
    title:"Download"
   },
   {
    imageUrl : "/assets/svg/itunes.svg",
    title:"play"
   },
   {
    imageUrl : "/assets/svg/audiomack.svg",
    title:"play"
   },
   {
    imageUrl : "/assets/svg/boomplay.svg",
    title:"Download"
   },
   {
    imageUrl : "/assets/svg/apple-music.svg",
    title:"play"
   },
   {
    imageUrl : "/assets/svg/deezer.svg",
    title:"Download"
   }
]