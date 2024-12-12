"use client";
import React, { useEffect } from "react";
import { useAppStateContext } from "@/context/AppStateContext";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import SearchBar from "../ui/SearchBar";
import Image from "next/image";


const TopNav = ({ isLoading, error,userProfile }) => {
  const { setActiveMenu, screenSize } = useAppStateContext();
  const handleActiveMenu = () => setActiveMenu((prev) => !prev);

  return (
    <header className="relative bg-black max-h-[120px] px-5 md:px-10 py-4 text-white ">
      <section className="flex items-center justify-between">
        {screenSize >= 900 ? (
                <div className="w-[40%]">
               <SearchBar
                  placeholder="Search ....."
                  
                />
                </div>
        ):null}
        
        {screenSize <= 900 ? (
          <button onClick={handleActiveMenu}>
            <Menu />
          </button>
        ) : null}

        <div className="flex items-center gap-4 ml-auto ">
         
          {isLoading ? (
            <p className="text-xs">Loading...</p>
          ) : error ? (
            <div>
              <p className=" text-destructive">Error loading data</p>
            </div>
          ) : (
            <div className="flex justify-center items-center  p-2 gap-3">
              <p className="text-xs font-semibold">{userProfile?.username}</p>
            <Image
            src="/assets/images/profile.png"
            alt = "landing"
            width={30}
            height={30}
            
            />
          
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default TopNav;
