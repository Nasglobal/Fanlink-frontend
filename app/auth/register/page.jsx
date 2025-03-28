import React from 'react'
import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'
import Image from 'next/image'

function Register() {
  return (
    <main className='bg-black grid md:grid-cols-2 h-screen'>
    <section className="md:col-span-1 bg-[url('/assets/images/register.png')] bg-cover bg-center bg-no-repeat hidden md:block">
    <div className="flex items-center p-10 ">
              <Link href="/">
                <Image
                   src="/assets/images/logo-second.png"
                  alt="Nextar logo"
                  width="250"
                  height="100"
                />
              </Link>
            </div>


    </section>
    <section className='flex flex-col px-5 justify-center items-center md:col-span-1'>
    <div className="flex self-start md:hidden  ">
              <Link href="/">
                <Image
                   src="/assets/images/logo-second.png"
                  alt="Nextar logo"
                  width="250"
                  height="100"
                />
              </Link>
            </div>
    <RegisterForm/>
    </section>
    
    </main>
  )
}

export default Register