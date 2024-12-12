import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function FanlinkButton({imageUrl,fanklink}) {
  return (
    <Link href={fanklink} className='bg-black w-full justify-center flex items-center p-3'>
    <Image
      src={imageUrl}
      alt = "button"
      width={130}
      height={30}
      className=""
      />
    </Link>
  )
}

export default FanlinkButton