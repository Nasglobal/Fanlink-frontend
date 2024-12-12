import Image from "next/image";
import { ListIcon } from "@/components/vectors";
import Container from "../Container";
import Navbar from "../shared/Navbar";

export default function Home() {
  return (
    <main className="bg-[#1e1e1e] ">
      <Navbar/>
    
    <div className=" bg-gradient-to-tl from-red-600 via-transparent to-transparent h-screen ">
        <Container>
       <main className="grid grid-cols-1 md:grid-cols-12 ">
      <div className="w-full pt-20 md:pb-0 pb-20 flex flex-col h-full col-span-6 gap-20  ">
    
    <div className=" md:mx-5 flex flex-col gap-12 text-white">
      <div >
      <p className="md:text-[55px] text-4xl leading-10 md:leading-[72px] font-extrabold">A Digital Toolkit Made Just For Music Marketing </p>
      <p className="md:text-lg text-sm  font-normal mt-4">Work smarter, not harder. Automate and level up your campaigns effortlessly.</p>
      </div>

      <p className="flex items-center justify-center p-4 w-[40%] text-sm text-white bg-[#D50613] text-center rounded-full">Explore More</p>
    </div>
      </div>
      <div className="w-full col-span-6 hidden md:block ">
      <Image
      src="/assets/images/landing-page.png"
      alt = "landing"
      width={400}
      height={200}
      className="w-full h-[550px]  mt-[-40px]"
      />
      </div>
      </main>

      </Container>
      <footer className="bg-black py-5">
        <Container>
      <section className="grid md:grid-cols-3 my-10 gap-5">
      <div className="flex  flex-col gap-2 text-sm text-white">
      <div className="flex gap-3 text-center  items-center">
        <ListIcon/>
        <p >Pre-save, pre-add or pre-order</p>
      </div>
      <div className="flex gap-3 text-center  items-center">
        <ListIcon/>
        <p>Smart links to all major services</p>
      </div>
      <div className="flex gap-3 text-center  items-center">
        <ListIcon/>
        <p>Action pages & contesting</p>
      </div>
      </div>
      <Image
      src="/assets/images/footer-1.png"
      alt = "landing"
      width={375}
      height={220}
      className="object-cover"
      />
      <Image
      src="/assets/images/footer-2.png"
      alt = "landing"
      width={375}
      height={220}
      className="object-cover rounded-2xl border"
      />
      </section>
    <p className="text-xs text-center text-white">© 2024 Copyright. 51 Lex, All rights reserved.</p>
    </Container>
      </footer>
      </div>
      </main>
  );
}
