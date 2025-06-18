import React from 'react'
import Container from '../Container'
import PolicyHeader from './PolicyHeader'
import Link from 'next/link'



function PrivacyPolicy() {
  return (
     <div className=" "  >  
       <PolicyHeader/>
    
   <Container>
   <div className='mt-8 mb-5 w-full pb-5 border-b'>
    <h2 className='text-primary text-center text-3xl md:text-5xl font-semibold border-gray-950'>Privacy Policy</h2>
    </div>
   
    <div className='flex  flex-col gap-10 text-black'>
      <p className='text-[16px] leading-5 font-semibold'>Last updated: [06/18/2025]</p>
      <p className='text-[16px] leading-5'>{"51Lex Fanlink is committed to protecting the privacy of users who use our web application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you sign up, log in, and use our services. By using 51Lex Fanlink, you agree to the collection and use of information in accordance with this policy."}</p>

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Use of YouTube API Services</p>
        <p className='text-[16px] leading-5'>51Lex Fanlink uses <span className='font-semibold'>YouTube API Services</span> to enable the generation and management of fanlinks associated with YouTube content.
By using our app, you are also agreeing to be bound by the <a className='text-blue-400' href="https://www.youtube.com/t/terms" target="_blank">YouTube Terms of Service</a>{" "}and the <a className='text-blue-400' href="http://www.google.com/policies/privacy" target="_blank">Google Privacy Policy</a>{", "}
  in addition to our own <Link href="/info/terms-and-conditions" className='underline cursor-pointer' >Terms and Conditions</Link>.</p>
      </div>
 
      <div className=''>
        <p className='md:text-2xl text-lg text-primary font-semibold mb-2'>Information we collect</p>
        <span className='font-semibold text-gray-950'>-- Personal Information:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li> Name </li>
          <li> Email address </li>
          <li> Password </li>
          
        </ul>
        <br/>
        <span className='font-semibold text-gray-950'>-- Track Information:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Label Name </li>
          <li> Artist Name </li>
          <li> Track Title </li>
          <li> Release Date </li> 
        </ul>
        <br/>

        <span className='font-semibold text-gray-950'>-- Automatically Collected Information:</span>
        <span className='font-semibold text-gray-950'>Our servers may collect:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>IP Address</li>
          <li> Browser Type and Version </li>
          <li> Device Information </li>
          <li> Date and Time of Access </li> 
        </ul>
      </div>


      

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>How We Use Your Information</p>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Create and manage your user account</li>
          <li>Enable you to generate and manage fanlinks</li>
          <li>Auto-generate fanlinks for bulk catalogue entries</li>
          <li>Improve the performance and reliability of the service</li>
          <li>Comply with legal obligations and resolve disputes</li> 
        </ul>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg  text-gray-950 font-semibold mb-2'>Data Sharing and Disclosure</p>
        <span className='font-semibold text-gray-950'>We do not sell your data. However, we may share data with:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Google Sheets API, YouTube API, and other integrated third-party APIs</li>
          <li>Legal authorities if required under applicable law</li>
          <li>Service providers assisting in server hosting, analytics, or security</li>
          </ul>

      </div>

    

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Data Retention</p>
        <p className='text-[16px] leading-5'>We retain user and track data for as long as necessary to provide you with the services and comply with legal obligations.</p>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Security</p>
        <p className='text-[16px] leading-5'>We implement industry-standard security measures, including HTTPS, hashed passwords, and secure APIs to protect your data. </p>
      </div>

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Your Rights</p>
        <span className='font-semibold text-gray-950'>You may:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Access and update your personal data</li>
          <li>Delete your account (upon request)</li>
          <li>Opt-out of any email communications</li>
          </ul>
      </div>
      
      
      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>{"Children’s Privacy"}</p>
        <p className='text-[16px] text-sm leading-5'>51lex Fanlink is not intended for users under the age of 13. We do not knowingly collect data from children.</p>
      </div>

    
      
      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Changes to This Policy</p>
        <p className='md:text-[16px] text-sm leading-5'>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant changes will be communicated to you via email or notifications.</p>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Contact Us:</p>
        <p className='md:text-[16px] text-sm leading-5'>If you have any questions or concerns, contact us at [lola@51lexrecords.com].</p>
      </div>

    </div>

   </Container>

   <footer className="bg-black py-5 mt-10">
    <Container> 
    <div className="flex flex-col items-center justify-center gap-2 my-4  text-xs text-center text-white">
      <Link href="/info/privacy-policy" className='underline cursor-pointer'>Privacy policy</Link>
      <Link href="/info/terms-and-conditions" className='underline cursor-pointer' >Terms and Conditions</Link>
    </div>
    <p className="text-xs text-center text-white">© 2025 Copyright. 51 Lex, All rights reserved.</p>
    </Container>
      </footer>
    </div>
  )
}

export default PrivacyPolicy