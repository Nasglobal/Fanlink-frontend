"use client";
import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

export default function SearchableSelect({
  placeholder,
  selectedItem,
  title,
  setSelectedItem,
  loading,
  items,
  setQuery,
}) {
 
 

  return (
    <div className="w-full text-white">
      <p className="text-sm font-normal mb-2">{title}</p>
      <Combobox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative">
          <Combobox.Input
            className="w-full border border-white bg-black rounded-lg text-sm py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1"
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(item) => item}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown />
          </Combobox.Button>

          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 shadow-lg ring-1/2 ring-black ring-opacity-5 focus:outline-none z-10">
            {loading && (
              <div className="py-2 px-4 text-gray-500">Loading...</div>
            )}
            {items?.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 text-xs pl-4 pr-4 ${
                    active ? "bg-red-400 text-white" : "text-gray-900"
                  }`
                }
              >
                {item}
              </Combobox.Option>
            ))}
            {!loading && items.length === 0 && (
              <div className="py-2 px-4 text-gray-500">No results found</div>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
