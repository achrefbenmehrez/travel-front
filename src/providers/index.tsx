"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <NextUIProvider>
          <Toaster />
          {children}
        </NextUIProvider>
      </SessionProvider>
    </>
  );
}
