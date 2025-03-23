"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../public/assets/icons/logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  SunIcon,
  MoonIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeProvider";
import { navLinks } from "@/constants/constants";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const { theme, toggleTheme } = useTheme();

  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () =>
      window.scrollY > 90 ? setNavBg(true) : setNavBg(false);

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`transition-all duration-200 h-[12vh] z-[1000] fixed w-full ${
        navBg ? "shadow-md bg-blue-950" : ""
      }`}
      suppressHydrationWarning
    >
      <div className="flex items-center h-full justify-between w-[90%] mx-auto">
        {/* logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <div className="w-10 h-10 background-gradient rounded-full flex items-center justify-center flex-col">
            <Image src={Logo} width={50} height={50} alt="logo" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold uppercase text-transparent background-gradient bg-clip-text">
            SkyConnect
          </h1>
        </div>
        {/* links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            return (
              <Link href={link.url} key={link.id}>
                <p className="relative text-blue-200 dark:text-white/80 hover:text-blue-500 dark:hover:text-cyan-400 after:block after:content-[''] after:w-full after:h-[3px] after:bg-cyan-400 after:absolute after:scale-x-0 hover:after:scale-x-100 after:transition duration-300 after:origin-right">
                  {link.title}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full self-end hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
          {/* burger menu */}
          <Bars3BottomRightIcon
            onClick={openNav}
            className="h-8 w-8 text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
