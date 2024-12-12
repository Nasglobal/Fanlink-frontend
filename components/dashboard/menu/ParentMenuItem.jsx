"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


function ParentMenuItem({ item, handleCloseSideBar }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (item.hasSubMenu) {
      setIsOpen((prev) => !prev);
    } else {
      handleCloseSideBar();
    }
  };

  return (
    <li className="mb-2 mx-3">
        <Link
          onClick={handleClick}
          href={item.path}
          className={`flex  font-medium text-white  p-[10px] ${
            pathname === item.path
              ? "bg-red-600 font-semibold"
              : ""
          } `}
        >
          <div className="flex  gap-[14px] ml-5  ">
            {pathname.includes(item.path) ? item.icon.white : item.icon.dark}
            {item.title}
          </div>
        </Link>
     
    </li>
  );
}

export default ParentMenuItem;
