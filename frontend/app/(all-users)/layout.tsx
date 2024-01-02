import Navbar from "@/components/common/Navbar";
import React from "react";

export default function AllUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-rows-[80px_1fr]">
      <Navbar />
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
