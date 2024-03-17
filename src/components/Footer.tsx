import React from "react";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-[#151014] z-30 relative overflow-hidden">
      <div className="w-[90%] lg:w-[80%] mx-auto  text-darkHeading py-20 ">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
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

          <div className="mb-20 lg:mb-0 z-10">
            <img src="/logo.png" alt="" className="w-14 " />
            <p className="text-white mt-4">
              H-123,Nurer Chaya,
              <br />
              Ashkona Haji Camp Dakhin Khan,
              <br />
              Dhaka, Bangladesh
            </p>
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
              <a href="tel:+8801768976036">+8801768976036</a>
            </div>
            <div className="flex items-center gap-2 mt-4">
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

              <p className="text-white ">
                {" "}
                Trade License: লাইসেন্স নং : TRAD/DNCC/022261/2023{" "}
              </p>
            </div>

            {/* <div className="text-darkParagraph mt-8">
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
            </div> */}
          </div>

          <div className="flex gap-20 text-lg text-darkParagraph flex-col lg:flex-row z-10">
            <div className="flex flex-col gap-4 ">
              {/* <Link href="/notifications" className="hover:text-white">
                নোটিফিকেশান
              </Link> */}
              {/* <Link href="/live-class" className="hover:text-white">
                লাইফ ক্লাস শিডিউল
              </Link> */}
              <Link href="/" className="hover:text-white">
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

        <div className="mt-10">

          <img alt="ssl-commerz" src="/SSLCommerz-Pay-With-logo-All-Size-03.png" />
        </div>
        <div className="mt-10 flex gap-8 justify-center items-center  pb-10  border-b  border-gray-300/40">
          <a
            href="https://www.facebook.com/groups/coder.vai.2023"
            target="__blank"
          >
            <svg
              className="w-[32px]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="url(#paint0_linear_1630_2247)"
              />
              <path
                d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1630_2247"
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="29.917"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#18ACFE" />
                  <stop offset="1" stop-color="#0163E0" />
                </linearGradient>
              </defs>
            </svg>
          </a>

          <a href="mailto:support@codervai.com">
            <svg
              className="w-[32px]"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3750_2472)">
                <path
                  d="M18 36.0001C27.9411 36.0001 36 27.9412 36 18.0001C36 8.05894 27.9411 0 18 0C8.05887 0 0 8.05894 0 18.0001C0 27.9412 8.05887 36.0001 18 36.0001Z"
                  fill="#1D67B1"
                />
                <path
                  d="M18.0024 12.5898L8.99439 12.6108C8.99373 12.6108 8.99306 12.6108 8.99239 12.6108C8.96004 12.6053 8.92721 12.603 8.89439 12.6038C8.76196 12.6059 8.63577 12.6605 8.54352 12.7556C8.45128 12.8506 8.40052 12.9784 8.40239 13.1108V24.5008C8.40239 24.6335 8.45507 24.7606 8.54884 24.8544C8.64261 24.9482 8.76979 25.0008 8.90239 25.0008H27.0934C27.226 25.0008 27.3532 24.9482 27.4469 24.8544C27.5407 24.7606 27.5934 24.6335 27.5934 24.5008V13.1748C27.604 13.1039 27.5992 13.0316 27.5794 12.9626C27.5596 12.8937 27.5252 12.8299 27.4785 12.7754C27.4319 12.721 27.374 12.6772 27.309 12.6471C27.2439 12.617 27.1731 12.6012 27.1014 12.6008L18.0024 12.5898ZM18.0024 13.5898H18.0044L25.3634 13.5998L18.0024 18.2048L10.6424 13.6098L18.0024 13.5898ZM26.5934 14.0078V23.9998H9.40239V14.0118L17.7384 19.2188C17.8179 19.2685 17.9097 19.2948 18.0034 19.2948C18.0971 19.2948 18.1889 19.2685 18.2684 19.2188L26.5934 14.0078Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3750_2472">
                  <rect width="36" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://wa.me/+8801768976036">
            <svg
              className="w-[32px]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3750_2476)">
                <path
                  d="M90.3743 0H9.62567C4.30956 0 0 4.30956 0 9.62567V90.3743C0 95.6904 4.30956 100 9.62567 100H90.3743C95.6904 100 100 95.6904 100 90.3743V9.62567C100 4.30956 95.6904 0 90.3743 0Z"
                  fill="#009846"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M50.8011 78.0758C44.9188 78.0758 39.0364 76.4715 34.2236 73.263L22.9936 77.0063L26.737 66.3111C23.5284 61.4983 21.3894 55.6159 21.3894 49.1988V46.525C22.9936 31.5518 35.2931 19.787 50.8011 19.787C66.3092 19.787 78.6086 31.5518 80.2129 47.0598V49.1988C80.2129 65.2416 66.8439 78.0758 50.8011 78.0758ZM85.5605 48.1293C85.0257 29.4127 69.5177 14.4395 50.8011 14.4395C32.0846 14.4395 16.5765 28.878 15.507 47.5945V49.1988C15.507 55.6159 17.6461 62.033 20.8546 66.8459L14.4375 85.5624L33.6888 79.6801C38.5017 82.3539 44.384 83.9582 50.8011 83.9582C70.0525 83.9582 85.5605 68.4501 85.5605 49.1988V48.1293Z"
                  fill="#FEFEFE"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M66.8465 56.1489C65.777 55.6142 61.4989 53.4752 60.9641 53.4752C59.8946 52.9404 59.3599 52.9404 58.8251 54.0099C58.2903 54.5447 56.6861 56.6837 56.1513 57.2185C55.6165 57.7532 55.0818 57.7532 54.547 57.2185C53.4775 56.6837 50.8037 56.1489 47.5951 52.9404C44.9214 50.8014 43.3171 48.1276 42.7823 47.058C42.2476 46.5233 42.7823 45.9885 42.7823 45.4538L44.3866 43.8495V43.3147C44.9214 43.3147 44.9214 42.78 44.9214 42.78C45.4561 41.7104 45.4561 41.7104 44.9214 41.1757C44.9214 40.6409 43.3171 36.3629 42.2476 34.7586C41.7128 33.1543 41.178 33.1543 40.6433 33.1543H39.039C38.5042 33.1543 37.4347 33.6891 36.3652 34.2238C35.8304 35.2933 33.6914 37.4324 33.6914 41.1757C33.6914 42.2452 33.6914 43.3147 34.2262 44.3842C34.7609 47.058 36.9 49.7318 36.9 50.2666C37.4347 50.8014 42.7823 59.8923 51.8732 63.1008C60.4294 66.3094 60.4294 65.2399 62.0337 65.2399C63.6379 65.2399 67.3812 63.1008 67.916 60.9618C68.4508 59.3575 68.4508 57.2185 68.4508 57.2185C67.916 56.6837 67.3812 56.6837 66.8465 56.1489Z"
                  fill="#FEFEFE"
                />
              </g>
              <defs>
                <clipPath id="clip0_3750_2476">
                  <rect width="100" height="100" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <div className="flex justify-center my-10">
          <p className="text-white mt-4 ">Copyright © Codervai2024</p>
        </div>
      </div>
    </div>
  );
}
