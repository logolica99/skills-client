import React, { useState } from "react";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RxHamburgerMenu } from "react-icons/rx";

type Props = {};

export default function Nav({}: Props) {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <div>
      <div className="bg-gray-200 bg-opacity-10 backdrop-blur-lg fixed w-full text-heading/90 z-50 border-b border-gray-300/20">
        <div className="w-[90%] lg:w-[80%] mx-auto py-4">
          <div className="flex justify-between items-center ">
            <div className="flex gap-10 items-center">
              <img src="/logo.png" alt="" className="w-20 md:w-28 mr-8 " />
              <Link
                href=""
                className="hidden lg:block hover:text-white ease-in-out duration-150"
              >
                নোটিফিকেশান
              </Link>
              <Link
                href=""
                className=" hidden lg:block hover:text-white ease-in-out duration-150"
              >
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link
                href=""
                className="hidden lg:block hover:text-white ease-in-out duration-150"
              >
                কোস কন্টেন্ট
              </Link>
            </div>
            <div className="flex gap-8 md:gap-8 items-center">
              <DarkModeSwitch sunColor="orange" size={20} isDarkMode={true} />
              <Link
                href=""
                className=" hidden lg:block hover:text-white ease-in-out duration-150 text-sm md:text-base"
              >
                লগ ইন
              </Link>
              <Link
                href=""
                className="hidden lg:block md:px-8 px-4 py-2 rounded-lg bg-gray-900 bg-opacity-5 backdrop-blur-xl hover:text-white ease-in-out duration-150 text-sm md:text-base"
              >
                শুরু করুন
              </Link>
              <RxHamburgerMenu
                onClick={() => setMenuShow(!menuShow)}
                className="lg:hidden cursor-pointer"
                size={22}
                color="white"
              />
            </div>
          </div>
        </div>
        {/* mobile menu */}
      </div>
      <div
        className={`bg-[#0B060D] lg:hidden fixed w-full z-40 text-white top-[63px] md:top-[76px] border-b border-white/30 duration-150 ease-out ${
          menuShow ? "translate-y-0" : "-translate-y-[170%]"
        }`}
      >
        <div className="w-[90%] lg:w-[80%] mx-auto py-8 ">
          <div className="flex flex-col justify-between items-center ">
            <div className="flex flex-col gap-10 items-center">
              <Link
                href=""
                className="  hover:text-white ease-in-out duration-150"
              >
                নোটিফিকেশান
              </Link>
              <Link
                href=""
                className="  hover:text-white ease-in-out duration-150"
              >
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link
                href=""
                className=" hover:text-white ease-in-out duration-150"
              >
                কোস কন্টেন্ট
              </Link>
            </div>
            <div className="flex flex-col gap-8 items-center mt-8">
              <Link
                href=""
                className="  hover:text-white ease-in-out duration-150 text-sm md:text-base"
              >
                লগ ইন
              </Link>
              <Link
                href=""
                className=" md:px-8 px-4 py-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-xl hover:text-white ease-in-out duration-150 text-sm md:text-base"
              >
                শুরু করুন
              </Link>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
