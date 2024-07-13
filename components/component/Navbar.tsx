import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container mx-auto lg:px-2 px-2 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2x font-medium px-4 py-4 my-3">
          432 Production
        </Link>
        <div className="md:flex hidden">
          <ul className="flex items-center text-sm gap-1">
            <li>
              <Link
                className="block px-4 py-2 hover:text-gray-100 hover:bg-neutral-500 transition-all duration-300 rounded-lg"
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 hover:text-gray-100 hover:bg-sky-900 transition-all duration-300 rounded-lg"
                href={"https://x.com/MasterHand36"}
              >
                Twitter[X]
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="block px-4 py-2 hover:text-gray-100 hover:bg-pink-900 transition-all duration-300 rounded-lg"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-4 py-4 md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleMenu}
            type="button"
            className="w-6 h-6 hover:cursor-pointer"
          />

          <div
            className={`fixed inset-0 bg-zinc-950 bg-opacity-60 z-40 ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={toggleMenu}
          ></div>
          <div
            className={`fixed inset-y-0 right-0 bg-white w-64 transform ${
              isOpen ? "translate-x-0 " : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 px-2 py-2`}
          >
            <FontAwesomeIcon
              icon={faXmark}
              onClick={toggleMenu}
              type="button"
              className="w-6 h-6 px-3 py-2 hover:cursor-pointer"
            />
            <Link
              className="block px-4 py-4 hover:text-gray-100 hover:bg-neutral-500 transition-all duration-300 rounded-lg"
              href={"/"}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              className="block px-4 py-4 hover:text-gray-100 hover:bg-sky-900 transition-all duration-300 rounded-lg"
              href={"https://x.com/MasterHand36"}
            >
              Twitter[X]
            </Link>
            <Link
              href={"#"}
              className="block px-4 py-4 hover:text-gray-100 hover:bg-pink-900 transition-all duration-300 rounded-lg"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
