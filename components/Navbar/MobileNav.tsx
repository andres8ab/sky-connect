import { navLinks } from "@/constants/constants";
import Link from "next/link";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";
  return (
    <div>
      {/* overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-70 w-full h-screen`}
      ></div>
      <div
        className={`text-white fixed pt-5 flex flex-col my-0 h-screen transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] z-[1050] bg-blue-950 space-y-6 ${navOpen}`}
      >
        <XMarkIcon
          className="abolute top-[0.7rem] right-12 sm:h-8 sm:w-8 w-6 h-6 text-white self-end mr-5"
          onClick={closeNav}
        />
        {navLinks.map((link) => {
          return (
            <Link href={link.url} key={link.id} onClick={closeNav}>
              <p className="text-white w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-white sm:text-3xl">
                {link.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
