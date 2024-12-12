"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function EditableSelect({
  placeholder,
  items,
  title,
  onChange,
  selectedItem,
  setSelectedItem
}) {
  const [query, setQuery] = useState("");
  

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item?.toLowerCase().includes(query?.toLowerCase())
        );

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuery(item); // Allow editing of the selected item
    if (onChange) onChange(item);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedItem(value);
    if (onChange) onChange(value); // Notify parent of changes
  };

  return (
    <div className="w-full">
      <p className="text-sm font-normal mb-2">{title}</p>
      <Combobox value={selectedItem} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="w-full border bg-black border-gray-300 rounded-lg text-sm py-2 pl-3 pr-10 shadow-sm focus:outline-none "
            placeholder={placeholder}
            value={query} // Controlled input
            onChange={handleInputChange}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            {filteredItems.length ? <ChevronUp />  : <ChevronDown />}
          </Combobox.Button>
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {filteredItems.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 pl-4 pr-4 ${
                    active ? "bg-red-400 text-white" : "text-gray-900"
                  }`
                }
              >
                {item}
              </Combobox.Option>
            ))}
            {filteredItems.length === 0 && (
              <div className="py-2 px-4 text-gray-500">No results found</div>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
