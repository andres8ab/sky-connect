"use client";
import React from "react";
import SearchInput from "@/components/general/SearchInput";

export default function Home() {
  return (
    <div className="min-h-screen lg:h-[100vh] h-[120vh] flex pb-20 flex-col">
      <div className="mt-40 mb-20 py-6 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent background-gradient bg-clip-text leading-20">
          SkyConnect Explorer
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <SearchInput isHome={true} />
      </div>
    </div>
  );
}
