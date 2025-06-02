import React from 'react'
import Container from '../Container'
import PolicyHeader from './PolicyHeader'
import Link from 'next/link'

function TermsAndConditions() {
  return (
    <div className=" "  >  
       <PolicyHeader/>
    
   <Container>
   <div className='mt-8 mb-5 w-full pb-5 border-b'>
    <h2 className='text-primary text-center text-3xl md:text-5xl font-semibold border-gray-950'>Terms and condition</h2>
    </div>
   
    <div className='flex flex-col gap-10 '>
      <p className='text-[16px] leading-5'>{"These Terms and Conditions govern your access to and use of 51lex Fanlink. By using our services, you agree to comply with and be bound by these Terms."}</p>

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Acceptance of Terms</p>
        <p className='text-[16px] leading-5'>By creating an account or using the service, you agree to these Terms and our Privacy Policy. If you do not agree, you may not use the application.</p>
      </div>

      <div className=''>
        <p className='md:text-2xl text-lg text-primary font-semibold mb-2'>Description of Service</p>
        <span className='font-semibold text-gray-950'> 51lex Fanlink is a platform that allows registered users to:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Create and manage fanlinks for their music tracks</li>
          <li>Automatically generate fanlinks for bulk catalogue entries</li>
          <li>Integrate with platforms such as YouTube, Spotify, Audiomack, Deezer, Boomplay,Itunes,Apple Music and others</li>
        </ul>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-primary font-semibold mb-2'>User Obligations</p>
        <span className='font-semibold text-gray-950'>You agree to:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Provide accurate and truthful information</li>
          <li>Maintain the security of your account and credentials</li>
          <li>Use 51lex Fanlink only for lawful purposes</li>
          <li>Not attempt to hack, reverse engineer, or disrupt the platform</li>
        </ul>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-primary font-semibold mb-2'>Account Termination</p>
        <span className='font-semibold text-gray-950'>We reserve the right to terminate or suspend your account at our discretion, especially for violations such as:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Abusing API integrations</li>
          <li>Uploading unauthorized content</li>
          <li>Engaging in fraudulent or malicious activities</li>
        </ul>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>API Integration & Rate Limits</p>
        <p className='text-[16px] text-sm leading-5'>51lex Fanlink utilizes third-party APIs (e.g., YouTube Data API, Google Sheets API). Usage is subject to their respective rate limits and terms. Excessive use or violation may result in restricted access.</p>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Intellectual Property</p>
        <p className='text-[16px] text-sm leading-5'>All content you upload remains your property. However, you grant Fanlink a non-exclusive license to process and display this content for functionality.</p>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Disclaimers</p>
        <p className='md:text-[16px] text-sm leading-5'>{"51lex Fanlink is provided “as is” without warranties of any kind. We do not guarantee the availability, accuracy, or reliability of third-party links or APIs."}</p>
      </div>


      <div className=''>
        <p className='md:text-2xl text-lg text-primary font-semibold mb-2'>Limitation of Liability</p>
        <span className='font-semibold text-gray-950'>We are not liable for:</span>
        <ul  className='md:text-[16px] text-sm leading-5 md:ps-7 ps-5 mt-2 space-y-3 list-disc '>
          <li>Data loss</li>
          <li>API quota errors or downtime</li>
          <li>Issues arising from incorrect user input</li>
        </ul>
      </div>



      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Modifications to Terms</p>
        <p className='md:text-[16px] text-sm leading-5'>{"We may modify these Terms at any time. Continued use of 51lex Fanlink after such modifications constitutes your acceptance of the new Terms."}</p>
      </div>

      <div className=''>
        <p className='md:text-2xl text-lg text-gray-950 font-semibold mb-2'>Contact Us:</p>
        <p className='md:text-[16px] text-sm leading-5'>If you have any questions regarding these Terms, please contact us at [lola@51lexrecords.com].</p>
      </div>

      

    </div>

   </Container>
   <footer className="bg-black py-5 mt-10">
    <Container> 
    <div className="flex flex-col items-center justify-center gap-2 my-4  text-xs text-center text-white">
      <Link href="/policy/privacy-policy" className='underline cursor-pointer'>Privacy policy</Link>
      <Link href="/policy/terms-and-conditions" className='underline cursor-pointer' >Terms and Conditions</Link>
    </div>
    <p className="text-xs text-center text-white">© 2025 Copyright. 51 Lex, All rights reserved.</p>
    </Container>
      </footer>
    </div>
  )
}

export default TermsAndConditions