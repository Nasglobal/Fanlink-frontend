"use client";
import React from "react";
import Image from "next/image";
import { HomeIcon, PlaylistIcon, DashboardIcon, LogoutIcon,ReleasesIcon } from "@/components/vectors";
import { X } from "lucide-react";
import { useAppStateContext } from "@/context/AppStateContext";
import ParentMenuItem from "./menu/ParentMenuItem";
import { removeFromLocalStorage } from "@/lib/utils";


const Sidebar = ({ isLoading }) => {
  const { setActiveMenu, activeMenu, screenSize } = useAppStateContext();
  const userProfile = {}

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu((prev) => !prev);
    }
  };

  const handleLogout = () => {
    removeFromLocalStorage('token'); // Remove the token
    removeFromLocalStorage('refresh_token')
    window.location.href = '/auth/login'; // Redirect to the login page
};
 
  return (
    <nav
      className={`z-10 fixed top-0 left-0 h-full  w-[260px] overflow-y-auto bg-[#191918]  py-5 transition-transform transform ${
        activeMenu ? "translate-x-0" : "-translate-x-full"
      } ease-in-out`}
    >
      {!isLoading ? (
        <div className="flex gap-3 items-center justify-center mb-10 mx-3 ">
         
            <div className=" relative rounded-full ">
              <Image
                src={`/assets/images/logo-second.png`}
                alt="store logo"
                width={200}
                height={100}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
         
          {screenSize <= 900 ? (
            <button
              onClick={handleCloseSideBar}
              className=" flex   ml-12 hover:bg-gray-300 text-bold hover:rounded-lg lg:hidden"
            >
              <X color="white" size={25} />
            </button>
          ) : null}
        </div>
      ) : userProfile?.error ? (
        <div>
          <p className=" text-destructive text-center">Error loading data</p>
        </div>
      ) : (
        <p className="text-xs text-center ">Loading data...</p>
        // <SidebarLoader />
      )}
      <div className="mt-5 overflow-y-auto flex-1">
        {menuItems.map((item, index) => (
          <section key={index}>
            <ul className="nav__menu relative ">
              {item.menu.map((menu, index) => (
                <ParentMenuItem
                  key={index}
                  keyIndex={index}
                  item={menu}
                  handleCloseSideBar={handleCloseSideBar}
                />
              ))}
            </ul>
          </section>
        ))}

<div className="mt-40 mx-3">
        <button
          onClick={handleLogout}
          
          className={`flex  font-medium text-white w-full  hover:text-red-600  p-[12px]`}
        >
          <div className="flex  gap-[14px] ml-5  ">
            <LogoutIcon/>
            Logout
          </div>
        </button>
     
    </div> 
      </div>
    </nav>
  );
};

export default Sidebar;

const menuItems = [
  {
    menu: [
      {
        title: "Home",
        slug: "home",
        icon: {
          white: <HomeIcon color="#FFF" />,
          dark: <HomeIcon />,
        },
        path: "/",
      },
      {
        title: "Dashboard",
        slug: "fanlinks",
        icon: {
          white: <DashboardIcon color="#FFF" />,
          dark: <DashboardIcon />,
        },
        path: "/dashboard/fanlinks",
      },
    ],
  },
  {
    menu: [
      {
        title: "Releases",
        slug: "releases",
        icon: {
          white: <ReleasesIcon color="#FFF" />,
          dark: <ReleasesIcon />,
        },
        path: "/dashboard/releases",
        hasSubMenu: false,
      },

    ],
  },

  {
    menu: [
      {
        title: "Video Edit",
        slug: "video-edit",
        icon: {
          white: <HomeIcon color="#FFF" />,
          dark: <HomeIcon />,
        },
        path: "/dashboard/video-edit",
        hasSubMenu: false,
      },

    ],
  },
];
