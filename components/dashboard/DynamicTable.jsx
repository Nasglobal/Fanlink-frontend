"use client"
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const DynamicTable = ({ data, columns }) => {
  

  return (
    <div className="realative overflow-auto">
      <table className="table min-w-full">
        <thead className="border-b bg-gray-800">
          <tr>
            <th className="py-3 px-3  text-left">
              <Checkbox className="w-4 h-4" />
            </th>
            {columns
              .filter((item) => item.key !== "actions")
              .map((column) => (
                <th
                  key={column.key}
                  className="py-3 px-3  uppercase text-xs text-[#ebecee] text-left min-w-[100px]"
                >
                  {column.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b text-[11px] border-[#DBDADE]">
                <td className=" px-3  py-3">
                  <Checkbox
                   className="w-4 h-4"
                  />
                </td>
                {columns
                  .filter((item) => item.key !== "actions")
                  .map((column) =>(
                    
                      <td key={column.key} className="py-2 px-2 ">
                        {row[column.key]}
                      </td>
                    )
                  )}
               
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="text-center py-2 text-sm text-red-600"
                colSpan={columns.length + 1}
              >
                NO RECORD FOUND
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
