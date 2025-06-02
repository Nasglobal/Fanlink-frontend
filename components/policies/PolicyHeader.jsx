"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { CloseIcon, Hamburger } from "@/components/vectors";
import { readFromLocalStorage } from "@/lib/utils";

const PolicyHeader = () => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const handleToggleMenu = () => {
    setActive((prev) => !prev);
  };

  

  return (
    <>
      <section className="z-50" >
        {/* desktop menu */}
        <Container>
          <div className="md:flex justify-between py-6 hidden">
            <div className="flex items-center  gap-8">
              <Link href="/">
                <Image
                   src="/assets/images/header.png"
                  alt="Nextar logo"
                  width="250"
                  height="100"
                />
              </Link>
            </div>

            <div className="flex gap-8 items-center">
              {menuList.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    prefetch={false}
                    href={item.href}
                    key={index}
                    className={`${
                      isActive
                        ? "text-red-500 hover:text-white"
                        : `hover:text-red-500
                             text-red-500
                         `
                    }  `}
                  >
                    {item.title}
                  </Link>
                );
              })}
              
            </div>
          </div>
        </Container>

        {/* mobile menu */}
        <div className="flex justify-between  container px-5 md:px-20 py-5  md:hidden ">
          <div className="flex items-center gap-5">
            <Link href="/">
              <Image
                 src="/assets/images/header.png"
                alt="peppa logo"
                width="150"
                height="50"
              />
            </Link>
          </div>
          {!active ? (
            <div onClick={handleToggleMenu}>
              <Hamburger color="white" />
            </div>
          ) : null}
        </div>
        <div
          className="fixed inset-0 flex z-50 "
          style={{ visibility: active ? "visible" : "hidden" }}
        >
          {/* Sidebar menu content */}
          <div
            className={`w-64bg-white text-white bg-gray-800 py-4 transform transition-transform ease-in-out duration-300 shadow-md`}
            style={{
              transform: active ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold px-5">
                <Link href="/" onClick={handleToggleMenu}>
                  <Image
                    src="/assets/images/white-logo.png"
                    width="99"
                    height="42"
                    alt="peppa logo"
                  />
                </Link>
              </h2>
              <button onClick={handleToggleMenu} className="mx-5">
                <CloseIcon color="white" />
              </button>
            </div>
            <hr />
            <ul className="p-5">
              {menuList.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li className="mb-3" key={index}>
                    <Link
                      key={index}
                      onClick={handleToggleMenu}
                      href={item.href}
                      className={`${
                        isActive
                          ? "text-red-500 hover:text-white"
                          : `hover:text-red-500 text-red-500
                            }`
                      }  `}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}

             
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyHeader;


const menuList = [
  {
    title: "Home",
    href: "/",
  }
  
];