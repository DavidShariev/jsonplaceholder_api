"use client";

import siteMetadata from "@/data/siteMetadata";
import store from "@/store/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
