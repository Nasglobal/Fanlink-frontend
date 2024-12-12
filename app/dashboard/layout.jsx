"use client";
import TopNavbar from "@/components/dashboard/TopNavbar";
import { useAppStateContext } from "@/context/AppStateContext";
import {  readFromLocalStorage } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getProfile } from "@/lib/api";

const Dashboard = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const token = readFromLocalStorage('token')


  const { setActiveMenu, activeMenu, screenSize, setScreenSize } =
    useAppStateContext();

    

    useEffect(() => {
        const fetchProfile = async () => {
          setIsLoading(true)
            try {
                const response = await getProfile();
                setUserProfile(response.data);
                setIsLoading(false)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch profile');
                setIsLoading(false)
            }
        };

        fetchProfile();
    }, []);


  useEffect(() => {
    if (!token) {
      router.push(`/auth/login`);
    }
  }, [token, userProfile]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

 

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar
        error={error}
        isLoading={isLoading}
        isSidebarOpen={activeMenu}
        onClose={() => setActiveMenu(false)}
      />

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col overflow-hidden
          ${screenSize > 900 && "md:ml-[260px]"}
        `}
      >
        {/* Top Navbar */}
        <TopNavbar
          error={error}
          isLoading={isLoading}
          isSidebarOpen={activeMenu}
          userProfile={userProfile}
          toggleSidebar={() => setActiveMenu((prev) => !prev)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-5 md:px-6 pb-[172px]">
          {/* Your page content goes here */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
