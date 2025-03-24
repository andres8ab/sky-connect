import React from "react";
import { Input } from "@/components/ui/input";
import { Testimonials } from "@/components/contact/Testimonials";

export default function Contact() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[12vh] ">
        <h1 className="text-2xl text-center font-bold text-black dark:text-white uppercase">
          Testimonios
        </h1>
        <Testimonials />
        <div className="w-[80%] lg:w-[50%] flex flex-col gap-4 justify-self-center">
          <h1 className="text-2xl text-center font-bold text-black dark:text-white uppercase">
            Deja tu mensaje
          </h1>
          <Input id="nombre" placeholder="John" type="text" />
          <Input id="apellido" placeholder="Doe" type="text" />
          <Input id="email" placeholder="john.doe@gmail.com" type="email" />
          <Input id="message" placeholder="Hola, me gustaria..." type="text" />
          <button
            className="group/btn relative cursor-pointer block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Enviar
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
