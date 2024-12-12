"use client";
import { AppStateProvider } from "@/context/AppStateContext";
import React from "react";

const AppProvider = ({ children }) => {
  return <AppStateProvider>{children}</AppStateProvider>;
};

export default AppProvider;
