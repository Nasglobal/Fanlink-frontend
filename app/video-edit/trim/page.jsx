import React from 'react'
import VideoEdit from '@/components/video-editing/VideoEdit'
import Link from 'next/link'
import Container from '@/components/Container'
import Image from 'next/image'

function VideoTrimming() {
  return (
    <div className=''>
      <section className=' gap-2 py-4 mb-4 text-sm flex bg-black justify-center flex-col items-center mx-auto'>
        <Link href="/">
                <Image
                   src="/assets/images/white-logo.png"
                  alt="Nextar logo"
                  width="250"
                  height="100"
                />
              </Link>

      </section>
      <Container>
        <VideoEdit/>

      </Container>
     
     <footer className='gap-2 text-sm flex bg-black mt-4 text-white justify-center flex-col items-center mx-auto' >
         <div className="flex items-center justify-center gap-2 my-4  text-xs text-center ">
      <Link href="/info/privacy-policy" className='underline cursor-pointer'>Privacy policy</Link> &
      <Link href="/info/terms-and-conditions" className='underline cursor-pointer' >Terms of service</Link>
    </div>

    <p className="text-xs text-center mb-4 ">© 2024 Copyright. 51 Lex, All rights reserved.</p>
    
      </footer>
    </div>
    
  )
}

export default VideoTrimming