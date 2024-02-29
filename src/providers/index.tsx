"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <NextUIProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </NextUIProvider>
    </>
  );
}
