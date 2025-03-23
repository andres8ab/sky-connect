"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  // ModalFooter,
  ModalTrigger,
} from "./ui/AnimatedModal";
import AirportHistory from "./AirportHistory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";

export function SearchModal() {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="dark:border border background-gradient dark:border-gray-600 border-gray-600 dark:border-opacity-50 dark:bg-gradient-to-r dark:from-blue-600/80 dark:to-cyan-400/80 dark:text-white text-white flex justify-center items-center group/modal-btn">
          <div className="group-hover/modal-btn:translate-x-40 flex gap-3 text-center transition duration-500">
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            <span className="mr-2">Buscar</span>
          </div>

          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Encuentra tu{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Aeropuerto
              </span>{" "}
              ahora! ✈️
            </h4>
            <SearchBar />

            <AirportHistory />
          </ModalContent>
          {/* <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter> */}
        </ModalBody>
      </Modal>
    </div>
  );
}
