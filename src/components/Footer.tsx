import React from "react";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-[#02090A] z-30 relative ">
      <div className="w-[90%] lg:w-[80%] mx-auto  text-darkHeading py-20 ">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <svg
            width="1161"
            viewBox="0 0 1161 326"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 h-full z-0"
          >
            <g filter="url(#filter0_f_255_9837)">
              <ellipse
                cx="489.386"
                cy="138.31"
                rx="173.254"
                ry="97.5405"
                transform="rotate(-10.6934 489.386 138.31)"
                fill="#107B61"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_255_9837"
                x="-181.833"
                y="-462.812"
                width="1342.44"
                height="1202.24"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="250"
                  result="effect1_foregroundBlur_255_9837"
                />
              </filter>
            </defs>
          </svg>

          <div className="mb-20 lg:mb-0 z-10">
            <img src="/logo.jpg" alt="" className="w-28 " />
            <div className="text-darkParagraph mt-8">
              <a
                href="https://www.facebook.com/groups/coder.vai.2023"
                className="block hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/+8801768976036"
                className="block hover:underline"
              >
                Whatsapp
              </a>
              <a
                href="mailto:support@codervai.com"
                className="block hover:underline"
              >
                Email
              </a>
            </div>
          </div>

          <div className="flex gap-20 text-lg text-darkParagraph flex-col lg:flex-row z-10">
            <div className="flex flex-col gap-4 ">
              <Link href="/notifications" className="hover:text-white">
                নোটিফিকেশান
              </Link>
              <Link href="/live-class" className="hover:text-white">
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link href="/course-details/12" className="hover:text-white">
                কোস কন্টেন্ট
              </Link>
              <a
                href="https://www.codervai.com/terms-and-conditions"
                className="hover:text-white"
              >
                শর্তাবলি
              </a>
              <a
                href="https://www.codervai.com/privacy-policy"
                className="hover:text-white"
              >
                প্রাইভেসি পলিসি
              </a>
              <a
                href="https://www.codervai.com/refund-policy"
                className="hover:text-white"
              >
                রিফান্ড পলিসি
              </a>
              <a
                href="https://www.codervai.com/about-us"
                className="hover:text-white"
              >
                About Us
              </a>
            </div>

            {/* <div className="flex flex-col gap-4">
              <Link href="" className="hover:text-white">
                নোটিফিকেশান
              </Link>
              <Link href="" className="hover:text-white">
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link href="" className="hover:text-white">
                কোস কন্টেন্ট
              </Link>
            </div> */}
          </div>
        </div>
        <div>
          <p>Pay with</p>
          <img alt="ssl-logo" src="/ssl-logo.png" />
          <img alt="ssl-commerz" src="/SSL-commerz.png" />
        </div>
        <p className="text-white mt-4">
          H-123,Nurer Chaya,
          <br />
          Ashkona Haji Camp Dakhin Khan,
          <br />
          Dhaka, Bangladesh
        </p>
        <p className="text-white mt-4">
          {" "}
          Trade License: লাইসেন্স নং : TRAD/DNCC/022261/2023{" "}
        </p>
        <p className="text-white mt-4">Copyright © Codervai2023</p>
      </div>
    </div>
  );
}
