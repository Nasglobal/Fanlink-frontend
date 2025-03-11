import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-[1440px] container mx-auto xl:px-10 md:px-10 2xl:px-8 px-5">
      {children}
    </div>
  );
};

export default Container;
