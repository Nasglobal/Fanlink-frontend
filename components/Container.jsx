import React from "react";

const Container = ({ children }) => {
  return (
    <div className="mx-w-[2520px]  mx-auto  md:px-20 2xl:px-8 sm:px-2 px-5 ">
      {children}
    </div>
  );
};

export default Container;
