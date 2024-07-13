import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2x font-medium ">
          432 Production
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4 gap-1">
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
      </div>
    </nav>
  );
};

export default Navbar;
