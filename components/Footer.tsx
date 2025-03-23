/* eslint-disable @next/next/no-img-element */
import { socialMedia } from "../data";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 px-10" id="contact">
      <div className="flex mt-16 md:flex-row flex-col gap-2 justify-around items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Andres Ochoa
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              href={info.url}
              key={info.id}
              target="_blank"
              className="shadow-[0_0_0_3px_#000000_inset] p-3 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
