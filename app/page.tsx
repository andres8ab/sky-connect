"use client";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import MagicButton from "@/components/ui/MagicButton";
import GridGlobe from "@/components/ui/GridGloble";

const words = [
  {
    text: "Encuentra",
  },
  {
    text: "tu",
  },
  {
    text: "aeropuerto",
  },
  {
    text: "con",
  },
  {
    text: "SkyConnect.",
    className: "text-blue-500 dark:text-blue-500 ",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen lg:h-[100vh] h-[120vh] flex flex-col ">
      <div className="mb-5  mt-[10vh] py-6 ">
        <TypewriterEffect words={words} />
      </div>
      <div className="flex flex-col md:flex-row gap-3 items-center justify-around px-4 sm:px-6 lg:px-8">
        <GridGlobe />
        <MagicButton
          title="Buscar Aeropuertos"
          icon={<ArrowUpRightIcon className="h-4 w-4" />}
          position="right"
        />
      </div>
    </div>
  );
}
