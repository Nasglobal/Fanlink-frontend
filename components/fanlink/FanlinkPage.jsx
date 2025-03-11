"use client"
import React,{useEffect,useState} from 'react'
import { useParams } from 'next/navigation';
import FanlinkButton from '../ui/FanlinkButton';
import axios from 'axios';
import { base } from '@/lib/api';
import Navbar from '../shared/Navbar';
import Spinner from '../ui/Spinner';

function FanlinkPage() {
    const params = useParams();
    const { upc} = params;
    const [fanlinks, setFanlinks] = useState(null);
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false);
    const fanlk = upc.split("-");
    const trackname = fanlk[1]
    const artistname = fanlk[0]
    


    const getFanlinks = async (track,artist) => {
         setLoader(true)
      try {
        const response = await axios.get(base + `/get-fanlink/${track}/${artist}`);
        setFanlinks(response?.data?.data);
        console.log("responses : ",response) 
        setLoader(false) 
      } catch (error) { 
        console.log("errpor responses : ",error?.response?.data?.error) 
        setError(error?.response?.data?.error || "Error fetching fanlinks") 
        setLoader(false) 
      }
    };
  
    useEffect(()=>{

      getFanlinks(trackname,artistname)

    },[upc])
    

    const url = "https://open.spotify.com/track/4hM9jLSD1lgswviJTkHsPP";
    
    
  return (
    <div className="bg-cover bg-center "  style={{ backgroundImage: `url(/assets/images/fanlink-bg.png)` }}>  
   <Navbar/>
    <main className=" m-0 py-10  h-full w-full"  >
      <div className=" w-full lg:w-[30%] mx-auto min-h-80  flex  flex-col    gap-3">
      <div className=' text-white text-sm  mx-2  flex gap-3  items-center justify-center '>
      
            <p className='font-semibold'>{artistname?.replace(/[ ,;.%\s]/g, '')}</p>
            -
            <p>{ trackname?.replace(/[ ,;.%\s]/g, '')}</p>
        </div>
      <div className='h-auto flex flex-col lg:mx-3 mx-5 '>
      <div className="w-full bg-white p-2 mb-6">
      {/* Spotify Embed */}

      {loader ? <Spinner/>: <>


  {fanlinks?.source == "youtube" ? 
<iframe
className='bg-black'
  width="100%"
  height="250"
  src={`https://www.youtube.com/embed/${fanlinks?.youtubeLink?.split("v=")[1].split("&")[0]}`}
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe> :

<iframe
className=""
src={`https://open.spotify.com/embed/track/${fanlinks?.spotifyLink?.split("/").pop()}`}
width="100%"
height="250"
allow="encrypted-media"
frameborder="0"
allowfullscreen
></iframe>

}
      
      
      </>}
     


    </div>


      <div className='h-auto p-3 bg-white'>
      
        {loader ? <Spinner/>: 
        <>
        {error ? <p className='text-center text-red-500'>{error}</p>:
        
        <div className='grid md:grid-cols-2 gap-3 '>
        {fanlinks?.spotifyLink && 
        <FanlinkButton
        fanklink={fanlinks?.spotifyLink}
        imageUrl="/assets/svg/spotify_logo.svg"
        />
          } 

         {fanlinks?.youtubeLink &&  
         <FanlinkButton
         fanklink={fanlinks?.youtubeLink}
         imageUrl="/assets/svg/youtube_logo.svg"
        />
         }

         {fanlinks?.boomplay &&  
         <FanlinkButton
         fanklink={fanlinks?.boomplay}
         imageUrl="/assets/svg/boomplay.svg"
        />
         }

         
        {fanlinks?.audiomackLink &&  
         <FanlinkButton
         fanklink={fanlinks?.audiomackLink}
         imageUrl="/assets/svg/audiomack.svg"
        />
         }

        {fanlinks?.itunesLink &&  
         <FanlinkButton
         fanklink={fanlinks?.itunesLink}
         imageUrl="/assets/svg/itunes.svg"
        />
         }

       {fanlinks?.deezerLink &&  
         <FanlinkButton
         fanklink={fanlinks?.deezerLink}
         imageUrl="/assets/svg/deezer.svg"
        />
         }

       {fanlinks?.appleLink &&  
         <FanlinkButton
         fanklink={fanlinks?.appleLink}
         imageUrl="/assets/svg/apple-music.svg"
        />
         }

       {fanlinks?.tidalLink &&  
         <FanlinkButton
         fanklink={fanlinks?.tidalLink}
         imageUrl="/assets/svg/tidal.svg"
        />
         }

      {fanlinks?.amazonLink &&  
         <FanlinkButton
         fanklink={fanlinks?.amazonLink}
         imageUrl="/assets/svg/amazon.svg"
        />
         }

        </div>
        
        }
        </>
        }
     
      </div>
      </div>
      <div>

      </div>

      <footer className='mt-4 gap-2 text-sm flex justify-center flex-col items-center mx-auto text-white'>
        <p >By using this service you agree to our</p>
        <p><span className='underline font-medium'>Privacy Policy</span> and <span className='underline font-medium'>Terms Of Use</span>.</p>
        <p className='text-xs'>Report a problem</p>
      </footer>
     
      </div>
      
      </main>
      </div>
  )
}

export default FanlinkPage
