import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-[#151014] z-30 relative overflow-hidden">
      <div className="w-[90%] lg:w-[80%] text-darkHeading py-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Background SVG */}
          <svg
            width="1161"
            viewBox="0 0 1161 326"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden absolute top-0 left-0 h-full z-0"
          >
            <g filter="url(#filter0_f_255_9837)">
              <ellipse
                cx="489.386"
                cy="138.31"
                rx="173.254"
                ry="97.5405"
                transform="rotate(-10.6934 489.386 138.31)"
                fill="#B153E0"
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

          {/* Column 1 - Logo and Contact */}
          <div className="mb-10 lg:mb-0 z-10 lg:w-[45%]">
            <Image
              src="/codervai_logo_light.png"
              alt="CoderVai Logo"
              className="w-24 mb-3"
              width={96}
              height={24}
            />
            <h2 className="text-3xl font-bold text-white mb-2 cursor-default">
              তোমার কোডিং পার্টনার
            </h2>
            <p className="font-medium text-lg mb-6 cursor-default">
              প্রতিযোগিতামূলক প্রোগ্রামিং এর হাতেখড়ি হোক এখন থেকেই
              <br />
              বিশ্বসেরা সব প্রোগ্রামারদের হাত ধরে
            </p>

            {/* Address */}
            <p className="text-white text-gray-400">
              H-123, Nurer Chaya, Ashkona Haji
              <br />
              Camp Dakhin Khan, Dhaka,
              <br />
              Bangladesh
            </p>

            {/* Phone */}
            <div className="flex items-center gap-2 mt-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.722656"
                  width="24.2764"
                  height="24.2764"
                  rx="6.06909"
                  fill="#EE4878"
                  fill-opacity="0.15"
                />
                <path
                  d="M8.21361 7.80469H10.7424L12.0068 10.9657L10.4263 11.914C11.1034 13.2868 12.2145 14.3979 13.5873 15.075L14.5356 13.4945L17.6966 14.7589V17.2876C17.6966 17.623 17.5634 17.9446 17.3262 18.1817C17.0891 18.4188 16.7675 18.552 16.4322 18.552C13.9661 18.4022 11.6402 17.355 9.89325 15.608C8.14629 13.861 7.09908 11.5351 6.94922 9.06908C6.94922 8.73374 7.08243 8.41214 7.31955 8.17502C7.55667 7.9379 7.87827 7.80469 8.21361 7.80469Z"
                  stroke="#EE4878"
                  stroke-width="1.13795"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Link
                href="tel:+8801768976036"
                className="hover:text-white transition-colors"
              >
                +8801768976036
              </Link>
            </div>

            {/* Trade Licence */}
            <div className="flex items-center gap-2 mt-2">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  width="24"
                  height="24"
                  rx="6"
                  fill="#EE4878"
                  fill-opacity="0.15"
                />
                <path
                  d="M14.375 17.625H8.75C8.25272 17.625 7.77581 17.4275 7.42417 17.0758C7.07254 16.7242 6.875 16.2473 6.875 15.75V15.125H13.125V16.375C13.125 16.7065 13.2567 17.0245 13.4911 17.2589C13.7255 17.4933 14.0435 17.625 14.375 17.625ZM14.375 17.625C14.7065 17.625 15.0245 17.4933 15.2589 17.2589C15.4933 17.0245 15.625 16.7065 15.625 16.375V7.625C15.625 7.37777 15.6983 7.1361 15.8357 6.93054C15.973 6.72498 16.1682 6.56476 16.3966 6.47015C16.6251 6.37554 16.8764 6.35079 17.1189 6.39902C17.3613 6.44725 17.5841 6.5663 17.7589 6.74112C17.9337 6.91593 18.0528 7.13866 18.101 7.38114C18.1492 7.62361 18.1245 7.87495 18.0299 8.10335C17.9352 8.33176 17.775 8.52699 17.5695 8.66434C17.3639 8.80169 17.1222 8.875 16.875 8.875H15.625M16.875 6.375H10C9.50272 6.375 9.02581 6.57254 8.67418 6.92418C8.32254 7.27581 8.125 7.75272 8.125 8.25V15.125M10.625 8.875H13.125M10.625 11.375H13.125"
                  stroke="#EE4878"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hover:text-white transition-colors">
                Trade License: TRAD/DNCC/022261/2023
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 mt-2">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  width="24"
                  height="24"
                  rx="6"
                  fill="#EE4878"
                  fill-opacity="0.15"
                />
                <text
                  x="50%"
                  y="50%"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="12"
                  font-family="Arial, sans-serif"
                  font-weight="bold"
                  fill="#EE4878"
                >
                  @
                </text>
              </svg>
              <Link
                href="mailto:support@codervai.com"
                className="hover:text-white transition-colors"
              >
                support@codervai.com
              </Link>
            </div>
          </div>

          {/* Right section with Our Courses and Company */}
          <div className="flex flex-col md:flex-col lg:flex-row lg:w-[55%] lg:justify-end gap-10 lg:gap-40">
            {/* Our Courses Column */}
            <div>
              <h3 className="text-white text-3xl font-semibold mb-6 font-inter cursor-default">
                Our Courses
              </h3>
              <ul className="lg:space-y-4 space-y-2">
                <li>
                  <Link
                    href="https://cp.codervai.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Competitive Programming 3.0 TurboCharged
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://android.codervai.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Android App Developement from Zero to Pro
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://py.codervai.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Introduction to Programming : Building Your First Game with
                    Python
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="z-10">
              <h3 className="text-white text-3xl font-semibold mb-6 font-inter cursor-default">
                Company
              </h3>
              <ul className="lg:space-y-4 space-y-2">
                <li>
                  <Link
                    href="https://www.codervai.com/about-us"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.codervai.com/refund-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.codervai.com/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.codervai.com/terms-and-conditions"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Condition
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex gap-8 justify-center items-center pb-5">
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/codervaibd"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-b from-[#18ACFE] to-[#0163E0] hover:opacity-90 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2137 15.2816L16.8356 11.3301H12.9452V8.76704C12.9452 7.68574 13.4877 6.63114 15.2302 6.63114H17V3.26699C17 3.26699 15.3945 3 13.8603 3C10.6548 3 8.56174 4.89294 8.56174 8.31843V11.3301H5V15.2816H8.56174V24.8345C9.27673 24.944 10.0082 25 10.7534 25C11.4986 25 12.2302 24.944 12.9452 24.8345V15.2816H16.2137Z"
                fill="white"
              />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/company/codervai/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077B5] hover:opacity-90 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM8.5 18H6.5V10H8.5V18ZM7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5C9 8.328 8.328 9 7.5 9ZM18 18H16V13.5C16 12.672 15.328 12 14.5 12C13.672 12 13 12.672 13 13.5V18H11V10H13V11.116C13.532 10.435 14.414 10 15.5 10C16.881 10 18 11.119 18 12.5V18Z"
                fill="white"
              />
            </svg>
          </Link>

          {/* YouTube */}
          <Link
            href="https://www.youtube.com/@codervaibd"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FF0000] hover:opacity-90 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"
                fill="white"
              />
            </svg>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/8801768976036"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25D366] hover:opacity-90 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0C5.495 0 0.16 5.334 0.157 11.892C0.156 13.988 0.741 16.034 1.851 17.812L0 24L6.319 22.181C8.024 23.191 9.968 23.724 11.954 23.724H11.959C18.513 23.724 23.849 18.39 23.852 11.831C23.854 8.653 22.709 5.737 20.463 3.488ZM12.049 21.729H12.045C10.264 21.729 8.522 21.222 6.992 20.263L6.631 20.048L2.871 21.115L3.959 17.446L3.724 17.07C2.677 15.474 2.121 13.608 2.122 11.892C2.124 6.434 6.594 1.964 12.054 1.964C14.714 1.965 17.211 2.986 19.074 4.85C20.937 6.715 21.887 9.212 21.886 11.83C21.884 17.289 17.414 21.729 12.049 21.729ZM17.472 14.382C17.183 14.237 15.719 13.516 15.454 13.419C15.19 13.323 14.999 13.275 14.807 13.564C14.616 13.853 14.042 14.526 13.875 14.717C13.708 14.909 13.541 14.933 13.252 14.788C12.963 14.643 11.991 14.326 10.843 13.299C9.946 12.496 9.329 11.504 9.162 11.215C8.995 10.926 9.144 10.77 9.287 10.627C9.416 10.498 9.574 10.289 9.717 10.122C9.86 9.955 9.908 9.835 10.004 9.643C10.1 9.452 10.052 9.285 9.98 9.14C9.908 8.995 9.293 7.529 9.053 6.951C8.819 6.389 8.581 6.47 8.405 6.461C8.238 6.452 8.047 6.451 7.855 6.451C7.664 6.451 7.351 6.523 7.087 6.812C6.822 7.101 6.053 7.822 6.053 9.288C6.053 10.754 7.111 12.172 7.254 12.363C7.397 12.555 9.327 15.525 12.273 16.812C13.007 17.118 13.579 17.301 14.022 17.437C14.747 17.664 15.403 17.632 15.923 17.558C16.499 17.476 17.713 16.837 17.953 16.163C18.193 15.489 18.193 14.91 18.121 14.789C18.049 14.668 17.858 14.597 17.569 14.452L17.472 14.382Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 mt-3 cursor-default">
          <p className="font-inter text-xs">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by
            CoderVai
          </p>
        </div>

        {/* SSL Commerz */}
        <div className="mt-10">
          <Link
            href="https://www.sslcommerz.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="SSLCommerz"
          >
            <Image
              src="/SSLCommerz-Pay-With-logo-All-Size-transparent.png"
              alt="SSLCommerz"
              className="w-full max-w-[1000px] mx-auto"
              width={1000}
              height={200}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
