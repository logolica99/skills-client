import { UserContext } from "@/Contexts/UserContext";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import { useContext, useState } from "react";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import VisibilitySensor from "react-visibility-sensor";
import Tilt from "react-parallax-tilt";

const inter = Inter({ subsets: ["latin"] });

const HindSiliguri = localFont({
  src: [
    {
      path: "fonts/Hind_Siliguri/HindSiliguri-Bold.ttf",
      weight: "700",
    },
    {
      path: "fonts/Hind_Siliguri/HindSiliguri-Light.ttf",
      weight: "300",
    },
    {
      path: "fonts/Hind_Siliguri/HindSiliguri-Regular.ttf",
      weight: "400",
    },
    {
      path: "fonts/Hind_Siliguri/HindSiliguri-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "fonts/Hind_Siliguri/HindSiliguri-Medium.ttf",
      weight: "500",
    },
  ],
  variable: "--font-HindSiliguri",
});

export default function Home() {
  const [user, setUser] = useContext<any>(UserContext);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [titlX, setTiltX] = useState(0);
  const [titlY, setTiltY] = useState(0);

  return (
    <main className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <FloatingCompiler />
      <button
        style={{ zIndex: 999 }}
        onClick={() => {
          setUser({ ...user, openCompiler: true });
        }}
        className="fixed top-80 -left-2 bg-[#0B060D] bg-opacity-30  backdrop-blur-lg border border-gray-200/20 p-3 hover:bg-gray-300/20 "
      >
        <svg
          width={40}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{" "}
            <path
              d="M13.2942 7.17041L12.0001 12L10.706 16.8297"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{" "}
            <path
              d="M8.49994 9L8.32837 9.17157C6.99504 10.5049 6.32837 11.1716 6.32837 12C6.32837 12.8284 6.99504 13.4951 8.32837 14.8284L8.49994 15"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{" "}
            <path
              d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{" "}
          </g>
        </svg>
      </button>

      <div className="bg-[#F3F3F3] dark:bg-black  pt-20  overflow-x-hidden">
        <div className="w-[90%] lg:w-[80%] mx-auto py-4 z-20">
          <div className="flex justify-between items-center flex-col-reverse lg:flex-row gap-20 pt-10 lg:pt-0 relative ">
            <svg
              width="1296"
              height="1357"
              viewBox="0 0 1296 1357"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute lg:left-0 lg:top-0 z-0"
            >
              <g filter="url(#filter0_f_117_9391)">
                <ellipse
                  cx="818.454"
                  cy="668.286"
                  rx="321.908"
                  ry="181.231"
                  transform="rotate(-10.6934 818.454 668.286)"
                  fill="#107B61"
                  fillOpacity="0.38"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_117_9391"
                  x="0.32724"
                  y="-19.6001"
                  width="1636.25"
                  height="1375.77"
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
                    result="effect1_foregroundBlur_117_9391"
                  />
                </filter>
              </defs>
            </svg>

            <svg
              width="1036"
              height="1008"
              viewBox="0 0 1036 1008"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-[50vw] z-0"
            >
              <g filter="url(#filter0_f_249_7573)">
                <ellipse
                  cx="298.35"
                  cy="367.138"
                  rx="240.444"
                  ry="135.368"
                  transform="rotate(-10.6934 298.35 367.138)"
                  fill="#107B61"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_249_7573"
                  x="-439.27"
                  y="-273.199"
                  width="1475.24"
                  height="1280.68"
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
                    result="effect1_foregroundBlur_249_7573"
                  />
                </filter>
              </defs>
            </svg>

            <div className="text-heading dark:text-darkHeading flex flex-col gap-4 z-10">
              <p className="text-[#2BA98B]">কম্পেটিটিভ প্রোগ্রামিং কোর্স</p>
              <div>
                <h2 className="text-2xl lg:text-4xl">
                  Competitive Programming 2.0 SuperCharged
                </h2>
                {/* <h2 className="text-2xl lg:text-4xl">শিখব এবার হাতে কলমে</h2> */}
              </div>
              <p className="">
                প্রতিযোগিতামূলক প্রোগ্রামিং শিখে নাও বিশ্বসেরা দেশসেরা সব
                প্রোগ্রামার দের হাত ধরে
              </p>
              <div className="flex">
                <Link
                  href="/course-details/12"
                  className="flex gap-3 items-center  bg-gray-400/40 hover:bg-gray-400/60 dark:bg-gray-300/10 dark:hover:bg-gray-300/20 duration-150 ease-in-out backdrop-blur-lg py-2 px-8 rounded-lg"
                >
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 5L17.5528 2.72361C18.2177 2.39116 19 2.87465 19 3.61803V10.382C19 11.1253 18.2177 11.6088 17.5528 11.2764L13 9M3 13H11C12.1046 13 13 12.1046 13 11V3C13 1.89543 12.1046 1 11 1H3C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13Z"
                      stroke="#2BA98B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>কোর্স ট্রেইলার ভিডিও দেখে নাও</p>
                </Link>
              </div>
            </div>
            <div>
              <Tilt
                tiltAngleXManual={titlX}
                tiltAngleYManual={titlY}
                onEnter={(e) => {
                  setTiltX(0);
                  setTiltY(0);
                }}
                // onLeave={() => {
                //   setTiltX(14);
                //   setTiltY(-10);
                // }}
              >
                <img
                  src="/Group 33507.png"
                  alt=""
                  className="relative lg:top-28"
                />
              </Tilt>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-black z-30 relative">
          <svg
            width="1475"
            height="915"
            viewBox="0 0 1475 915"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 -left-60 lg:left-0"
          >
            <g filter="url(#filter0_f_117_9675)">
              <ellipse
                cx="769"
                cy="208.5"
                rx="269"
                ry="206.5"
                fill="#DE9931"
                fillOpacity="0.5"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_117_9675"
                x="0"
                y="-498"
                width="1538"
                height="1413"
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
                  result="effect1_foregroundBlur_117_9675"
                />
              </filter>
            </defs>
          </svg>
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto mt-24  text-heading dark:text-darkHeading py-20 z-10">
              <div className="flex gap-8 md:gap-20 justify-center flex-col items-center lg:flex-row text-center">
                <img
                  src="/bubble with inequality symbols.png"
                  alt=""
                  className="max-w-[90px] max-h-[90px] lg:max-w-[160px] lg:max-h-[160px] flex-1"
                />
                <div className="relative">
                  <h2 className="text-2xl lg:text-4xl">এক নজরে আমাদের </h2>
                  <h2 className="text-2xl lg:text-4xl">
                    <span className="text-[#F1BA41]">
                      কম্পেটিটিভ প্রোগ্রামিং
                    </span>{" "}
                    কোর্স
                  </h2>
                  <p>আমাদের কোর্সের সব ফিচার দেখে নাও</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lgXl:grid-cols-4  mt-24 ">
                <div className="md:border-r border-b border-gray-100/10 px-20  py-12 pt-16 ">
                  <div className="flex flex-col items-center text-center  hover:scale-110 transition-all ease-in-out duration-300">
                    <svg
                      width="52"
                      height="30"
                      viewBox="0 0 43 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.25 2.94217L30.5 8.58217V2.22217L29 0.722168H2L0.5 2.22217V23.2222L2 24.7222H29L30.5 23.2222V17.2222L40.25 22.8322L42.5 21.4222V4.26217L40.25 2.94217ZM27.5 21.7222H3.5V3.72217H27.5V21.7222ZM39.5 18.7222L30.5 13.6222V12.0622L39.5 6.72217V18.7222Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>
                    <p className="text-xl mt-6">জিরো থেকে হিরো</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      শূন্য থেকে প্রোগ্রামিং শিখিয়ে তোমাকে এক্সপার্ট করে তোলা
                      হবে এখানে
                    </p>
                  </div>
                </div>
                <div className=" lgXl:border-r border-b border-gray-100/10">
                  <div className="flex flex-col items-center  px-20 text-center py-12 pt-16  hover:scale-110 transition-all ease-in-out duration-300">
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 44 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.25 40.3125V37.625C16.625 37.625 16.625 36.0125 16.625 34.9375H4.53125L3.1875 33.5938V6.71875L4.53125 5.375H39.4688L40.8125 6.71875V31.5512L38.125 28.8637V8.0625H5.875V32.25H21.2744L19.9306 33.5938L26.6494 40.3125H11.25ZM32.3737 40.3125L39.0925 33.5938L37.1844 31.7125L32.75 36.1469V18.8125H30.0625V36.12L25.655 31.6856L23.7469 33.5938L30.4656 40.3125H32.3737Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6">
                      Googler সহ বিশ্বসেরা কোডাররা ক্লাস
                    </p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      কম্পেটিটিভ প্রোগ্রামিং করে গুগলে চাকরিরত সহ র‍্যাংকিং এ
                      দেশের টপ কোডার রা ক্লাস নিবে এখানে
                    </p>
                  </div>
                </div>
                <div className=" md:border-r border-b border-gray-100/10">
                  <div className="flex flex-col items-center  px-20 text-center py-12 pt-16 hover:scale-110 transition-all ease-in-out duration-300">
                    <svg
                      width="39"
                      height="30"
                      viewBox="0 0 42 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.624 8.45617L3.683 16.3942L11.624 24.3322L9.5 26.4562L0.5 17.4562V15.3322L9.5 6.33217L11.624 8.45617ZM32.624 6.33217L30.5 8.45617L38.441 16.3942L30.5 24.3322L32.624 26.4562L41.624 17.4562V15.3322L32.624 6.33217ZM12.224 30.7222L14.906 32.0662L29.906 2.06617L27.224 0.722168L12.224 30.7222Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6">কোর্স আনলকিং</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      নির্দিস্ট সময় পর পর কোর্স কন্টেন্ট গুলো আনলক হবে যেন
                      প্রব্লেম সলভিং এর একটা অভ্যাস তৈরি হয়
                    </p>
                  </div>
                </div>
                <div className=" border-b border-gray-100/10">
                  <div className="flex flex-col items-center  px-20 text-center py-12 pt-16 hover:scale-110 transition-all ease-in-out duration-300">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.0201 20.097L28.0991 5.289L26.0651 3L10.1291 16.788L5.59906 11.292L3.31006 13.326L8.86006 19.968L11.0201 20.097ZM45.3101 15H20.7821L27.7031 9H45.3101V15ZM18.3101 21H45.3101V27H18.3101V21ZM45.3101 33H18.3101V39H45.3101V33Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6">৫০+ ঘণ্টার ভিডিও কন্টেন্ট</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      আন্তর্জাতিক মান সম্মত স্টুডিও কোয়ালিটি ভিডিও থাকবে এখানে
                    </p>
                  </div>
                </div>
                <div className=" md:border-r border-b lgXl:border-b-0 border-gray-100/10">
                  <div className="flex flex-col items-center hover:scale-110 transition-all ease-in-out duration-300   px-20 text-center py-12 pb-16">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M34.1344 28.5301C32.9611 27.3559 31.5901 26.3975 30.0844 25.6989C32.2078 23.9785 33.5625 21.3535 33.5625 18.4098C33.5625 13.216 29.2312 8.9551 24.0375 9.03479C18.9234 9.11448 14.8031 13.2817 14.8031 18.4098C14.8031 21.3535 16.1625 23.9785 18.2812 25.6989C16.7752 26.397 15.4042 27.3554 14.2312 28.5301C11.6719 31.0942 10.2187 34.4785 10.125 38.0879C10.1237 38.1379 10.1325 38.1877 10.1508 38.2343C10.1691 38.2809 10.1965 38.3233 10.2315 38.3592C10.2664 38.395 10.3082 38.4234 10.3543 38.4429C10.4004 38.4623 10.45 38.4723 10.5 38.4723H13.125C13.3266 38.4723 13.4953 38.3129 13.5 38.1114C13.5891 35.3926 14.6906 32.8473 16.6266 30.916C17.6172 29.9201 18.7956 29.1306 20.0934 28.5931C21.3912 28.0556 22.7828 27.7809 24.1875 27.7848C27.0422 27.7848 29.7281 28.8957 31.7484 30.916C33.6797 32.8473 34.7812 35.3926 34.875 38.1114C34.8797 38.3129 35.0484 38.4723 35.25 38.4723H37.875C37.925 38.4723 37.9746 38.4623 38.0207 38.4429C38.0668 38.4234 38.1086 38.395 38.1435 38.3592C38.1785 38.3233 38.2059 38.2809 38.2242 38.2343C38.2425 38.1877 38.2513 38.1379 38.25 38.0879C38.1562 34.4785 36.7031 31.0942 34.1344 28.5301ZM24.1875 24.4098C22.5844 24.4098 21.075 23.7864 19.9453 22.652C19.3784 22.0895 18.9305 21.4186 18.6285 20.6793C18.3265 19.94 18.1765 19.1474 18.1875 18.3489C18.2016 16.8114 18.8156 15.3254 19.8891 14.2239C21.0141 13.0707 22.5187 12.4285 24.1266 12.4098C25.7156 12.3957 27.2578 13.0145 28.3922 14.1254C29.5547 15.2645 30.1922 16.7879 30.1922 18.4098C30.1922 20.0129 29.5687 21.5176 28.4344 22.652C27.8778 23.2112 27.2159 23.6545 26.487 23.9562C25.758 24.2579 24.9764 24.4121 24.1875 24.4098ZM12.4453 19.6473C12.4031 19.2395 12.3797 18.827 12.3797 18.4098C12.3797 17.6645 12.45 16.9379 12.5812 16.2301C12.6141 16.0614 12.525 15.8879 12.3703 15.8176C11.7328 15.5317 11.1469 15.1379 10.6406 14.641C10.0441 14.0626 9.57468 13.3662 9.26233 12.5963C8.94999 11.8263 8.80157 10.9997 8.82656 10.1692C8.86874 8.66448 9.47343 7.23479 10.5281 6.15667C11.6859 4.97073 13.2422 4.32385 14.8969 4.3426C16.3922 4.35667 17.8359 4.93323 18.9281 5.9551C19.2984 6.30198 19.6172 6.68635 19.8844 7.09885C19.9781 7.24417 20.1609 7.3051 20.3203 7.24885C21.1453 6.96292 22.0172 6.76135 22.9125 6.6676C23.175 6.63948 23.325 6.35823 23.2078 6.12385C21.6844 3.10979 18.5719 1.02854 14.9719 0.972291C9.77343 0.892604 5.44218 5.15354 5.44218 10.3426C5.44218 13.2864 6.79687 15.9114 8.92031 17.6317C7.42968 18.3207 6.05625 19.2723 4.86562 20.4629C2.29687 23.027 0.843745 26.4114 0.749995 30.0254C0.748744 30.0754 0.757519 30.1252 0.775804 30.1718C0.794088 30.2184 0.821512 30.2608 0.85646 30.2967C0.891407 30.3325 0.933171 30.3609 0.97929 30.3804C1.02541 30.3998 1.07495 30.4098 1.125 30.4098H3.75468C3.95625 30.4098 4.125 30.2504 4.12968 30.0489C4.21875 27.3301 5.32031 24.7848 7.25625 22.8535C8.63437 21.4754 10.3219 20.5192 12.1641 20.0551C12.3469 20.0082 12.4687 19.8348 12.4453 19.6473Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6">৩০+ এক্সপার্ট ক্লাস আর্কাইভ</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      বিগত বছরের সেইম টিচার প্যানেলের নেয়া লাইভ ক্লাস গুলোর একটা
                      আর্কাইভ দেয়া হবে
                    </p>
                  </div>
                </div>
                <div className="border-b lgXl:border-b-0  lgXl:border-r  border-gray-100/10">
                  <div className="flex flex-col items-center hover:scale-110 transition-all ease-in-out duration-300  px-20 text-center py-12 pb-16">
                    <svg
                      width="39"
                      height="30"
                      viewBox="0 0 42 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.124 8.45617L3.183 16.3942L11.124 24.3322L9 26.4562L0 17.4562V15.3322L9 6.33217L11.124 8.45617ZM32.124 6.33217L30 8.45617L37.941 16.3942L30 24.3322L32.124 26.4562L41.124 17.4562V15.3322L32.124 6.33217ZM11.724 30.7222L14.406 32.0662L29.406 2.06617L26.724 0.722168L11.724 30.7222Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6">
                      ৩০০+ কোডিং সমস্যা ও তার ভিডিও সলিউশন
                    </p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      আমাদের নিজেদের বানানো কাস্টম কোডিং প্রব্লেম ও তার ভিডিও
                      সলিউশন সহ ৩০০+ সমস্যা সমাধান করা হবে এখানে
                    </p>
                  </div>
                </div>
                <div className="hover:scale-110 transition-all ease-in-out duration-300">
                  <div className="flex flex-col items-center hover:scale-110 transition-all ease-in-out duration-300 px-20 text-center py-12 pb-16">
                    <svg
                      width="32"
                      height="30"
                      viewBox="0 0 36 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.4136 0.522461H34.2064L35.4677 1.78372V32.054L34.2064 33.3152H1.4136L0.152344 32.054V1.78372L1.4136 0.522461ZM2.67487 10.6125V30.7927H32.9451V10.6125H2.67487ZM2.67487 8.09003H32.9451V3.04498H2.67487V8.09003Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>

                    <p className="text-xl mt-6"> লাইভ ক্লাস</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      কোর্স চলাকালীন রেকর্ড ক্লাসের পাশাপাশি প্রচুর লাইভ ক্লাস
                      সাপোর্ট থাকবে এখানে
                    </p>
                  </div>
                </div>
                <div className="md:border-l border-gray-100/10">
                  <div className="flex flex-col items-center hover:scale-110 transition-all ease-in-out duration-300    px-20 text-center py-12 pb-16">
                    <svg
                      width="48"
                      height="30"
                      viewBox="0 0 43 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.25 2.94217L30.5 8.58217V2.22217L29 0.722168H2L0.5 2.22217V23.2222L2 24.7222H29L30.5 23.2222V17.2222L40.25 22.8322L42.5 21.4222V4.26217L40.25 2.94217ZM27.5 21.7222H3.5V3.72217H27.5V21.7222ZM39.5 18.7222L30.5 13.6222V12.0622L39.5 6.72217V18.7222Z"
                        fill={user.darkMode ? "white" : "black"}
                        fillOpacity={user.darkMode ? "0.17" : ".4"}
                      />
                    </svg>
                    <p className="text-xl mt-6">কোর্স র‍্যাংকিং</p>
                    <p className="text-sm mt-8 text-paragraph dark:text-darkParagraph">
                      কোর্সে ভর্তি হওয়া তোমার সহপাঠীদের সাথে তোমার অবস্থান তুলনা
                      করার জন্যে থাকবে র‍্যাংকিং
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>

        <div className="bg-[#2BA98B]/20 dark:bg-[#02090A] z-30 relative">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading pt-40 py-20 md:py-32">
              <div
                className="rounded-xl "
                style={{
                  background: "linear-gradient( #2BA98B4F 0%, #2BA98B00 100%)",
                }}
              >
                <div
                  className=" rounded-xl px-16 py-20 pb-20 mx-[1px] dark:bg-[#02090A]/60 relative top-[1px] "
                  style={{}}
                >
                  <div className="flex justify-between gap-16 flex-col lg:flex-row items-center">
                    <div className="flex-1">
                      <Tilt>
                        {user.darkMode ? (
                          <img src="/Mid_Code_Dark.png" alt="" />
                        ) : (
                          <img src="/Mid_Code_Light.png" alt="" />
                        )}
                      </Tilt>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-4xl ">
                        কম্পেটিটিভ প্রোগ্রামিং <br /> এর{" "}
                        <span className="text-[#2BA98B]">পরিচিতি</span>
                      </h2>
                      <p className="my-6 text-xl">
                        প্রোগ্রামার দের অলিম্পিকস হল ACM:ICPC যেখানে প্রতি বছর
                        বিশ্বের সবচেয়ে বেস্ট বেস্ট প্রোগ্রামাররা নিজেদের সাথে
                        প্রতিযোগিতা করে
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        বাংলাদেশ থেকে খুব কম সংখ্যক শিক্ষার্থী প্রতি বছর ই
                        কম্পেটিটিভ প্রোগ্রামিং বা CP এর অলম্পিকশ্ ACM ICPC এর
                        World Finale তে অংশগ্রহণ করে World Finalist থেকে শুরু
                        করে ASIA CHAPMION ও হচ্ছে। যার মধ্যে আমাদের ২ জন
                        ইন্সট্রাক্টর ও রয়েছে। কম্পেটিটিভ প্রোগ্রামিং এর জনপ্রিয়
                        ওয়েব সাইট গুলার র‍্যাংকিং এ বাংলাদেশের শিক্ষার্থীদের
                        অবস্থান অনেক পেছনে হলেও বাংলাদেশের আনাচে কানাচে কিছু
                        এক্সট্রা অর্ডিনারি মানুষজন প্রোগ্রামিং এর এই অজানা জগতের
                        অজানা রহস্য গুলার পেছনে ছুটতে থাকে পরিশ্রম করতে থাকে আর
                        ঠিকই নিজের স্বপ্ন কে পূরণ করে দেশকে গর্বিত করে
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>
        <div className="bg-[#ca65fd]/20 dark:bg-[#0B060D] z-30 relative">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
              <div className="flex flex-col lg:flex-row text-center lg:text-left justify-between items-center  pb-10 gap-6 lg:gap-0 border-b border-gray-100/20">
                <div className="flex-1">
                  <div className="flex justify-center lg:justify-start">
                    <img src="/rectangle with code.png" alt="" />
                  </div>

                  <h2 className="text-2xl lg:text-4xl mt-6">
                    কম্পেটিটিভ প্রোগ্রামিং{" "}
                    <span className="text-[#B153E0] block">কেন করব ?</span>{" "}
                  </h2>
                </div>
                <div className="flex-1 hidden lg:block"></div>
                <div className="flex-1">
                  <p>
                    খেলাধুলা এর জগতে অলিম্পিকস এর নাম শুনে নাই এমন কাউ কে খুঁজে
                    পাওয়া না গেলেও এমন অনেক কেই খুঁজে পাওয়া যাবে যারা
                    প্রোগ্রামিং এর জগত এর অলিম্পিকস খ্যাত ACM:ICPC সম্পর্কে
                    জানেই না।
                  </p>
                </div>
              </div>
              <div className="flex gap-20  justify-between flex-col items-center lg:items-start lg:flex-row pt-20">
                <div
                  className="rounded-xl max-w-[400px] text-center hover:scale-110 transition-all ease-in-out duration-300"
                  style={{
                    background:
                      "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80 relative top-[1px]"
                    style={{}}
                  >
                    <div className="">
                      <p className="text-heading dark:text-darkHeading text-center text-xl">
                        গ্রাজুয়েশনের আগেই{" "}
                        <span className="text-[#B153E0]">FAANG</span> থেকে অফার
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph mt-8">
                        CP তে সেরাদের FACEBOOK, AMAZON, APPLE, NETFLIX, GOOGLE
                        যাদের আমরা FAANG হিসাবে চিনে থাকি তারা অফারলেটার দেয়
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-xl max-w-[400px] text-center  hover:scale-110 transition-all ease-in-out duration-300"
                  style={{
                    background:
                      "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80 relative top-[1px]"
                    style={{}}
                  >
                    <div className="">
                      <p className="text-heading dark:text-darkHeading text-center text-xl">
                        সমস্যা সমাধান এর দক্ষতা বাড়ায়
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph mt-8">
                        CP সমস্যা সমাধানের লজিক শেখায়, স্টেপ বাই স্টেপ যেকোন
                        সমস্যা কে এপ্রোচ করা শেখায়। ব্রেইন কে ক্রিটিকাল থিংকিং
                        করতে ট্রেইন করে।একটা সমস্যা কে ভিন্ন ভিন্ন এঙ্গেল থেকে
                        দেখতে শেখায়,এক্সট্রিম প্রেশার এর আন্ডারে কাজ করতে শেখায়
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-xl max-w-[400px] text-center  hover:scale-110 transition-all ease-in-out duration-300"
                  style={{
                    background:
                      "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80 relative top-[1px]"
                    style={{}}
                  >
                    <div className="">
                      <p className="text-heading dark:text-darkHeading text-center text-xl">
                        ক্যারিয়ার গঠনে মুখ্য ভূমিকা
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph mt-8">
                        CP তোমাকে শক্তপোক্ত একটা রেজুমে গড়তে সাহায্য করে যা
                        ভবিষ্যতের ড্রিম কোম্পানি ডাক পেতে এগিয়ে রাখবে লাখো
                        ক্যান্ডিডেট থেকে যারা CP করে নাই
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>

        <div className="bg-[#F1BA41]/20 dark:bg-[#080600] z-30 relative">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
              <div
                className="rounded-xl text-center"
                style={{
                  background: "linear-gradient(#F1BA4129 0%,  #F1BA4103 100%)",
                }}
              >
                <div
                  className=" rounded-xl px-6 py-20 pb-20 mx-[1px] dark:bg-[#080600]/60 relative top-[1px] "
                  style={{}}
                >
                  <div className="w-[90%] lg:w-[60%] mx-auto">
                    <div className="flex justify-center">
                      <img src="/code programming icon.png" alt="" />
                    </div>
                    <h2 className="text-2xl lg:text-4xl mt-8">
                      আমাদের উদ্যেশ্য কি
                    </h2>
                    <p className="text-xl mt-8">
                      আমরা চাই FAANG এর মত বিগ টেক কোম্পানি গুলাতে তুমি যেন
                      বাংলাদেশ এর প্রতিনিধিত্ব করতে পার সাথে ভবিষ্যতে যারা ওখানে
                      যাওয়ার স্বপ্ন দেখে তাদের পথ প্রদর্শক হতে পার
                    </p>
                    <p className="my-12">
                      সেই লক্ষে পৌঁছাতে তোমাকে এই অজানা জগতের সাথে পরিচয় করয়ে
                      দেবে পরিচিত সব ওয়েবসাইটের বাংলাদেশের প্রতিনিধিত্ব কারী আর
                      GOOGLE থেকে অফার পেয়ে সেখানে চাকুরীরত বেস্ট সব
                      ইনস্ট্রাক্টররা যারা সবাই বুয়েট CSE পরিবারের সদস্য। বাংলা
                      ভাষায় শিখিয়ে দিবে কিভাবে নিজেকে অন্য সবার থেকে আলাদা করা
                      যায়,কিভাবে নিজেকে এই কঠিন কিন্তু এমেজিং জগতে টিকিয়ে রাখা
                      যায়, কিভাবে নিজেকে মোটিভেটেড রাখা যায়, কিভাবে CODEFORCES,
                      HACKERRANK, CODECHEF, ATCODER, LeetCode, HackerEarth, CSES
                      এই প্ল্যাটফর্ম গুলাতে রেটিং/র‍্যাঙ্কিং বাড়ানো যায়
                    </p>
                    <div className="flex justify-center ">
                      <Link
                        href="/course-details/12"
                        className="flex gap-3 items-center bg-gray-300/10 hover:bg-gray-300/20 duration-150 ease-in-out backdrop-blur-lg py-2 px-8 rounded-lg"
                      >
                        <svg
                          width="21"
                          height="15"
                          viewBox="0 0 21 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.5 5.5L18.0528 3.22361C18.7177 2.89116 19.5 3.37465 19.5 4.11803V10.882C19.5 11.6253 18.7177 12.1088 18.0528 11.7764L13.5 9.5M3.5 13.5H11.5C12.6046 13.5 13.5 12.6046 13.5 11.5V3.5C13.5 2.39543 12.6046 1.5 11.5 1.5H3.5C2.39543 1.5 1.5 2.39543 1.5 3.5V11.5C1.5 12.6046 2.39543 13.5 3.5 13.5Z"
                            stroke="#F1BA41"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <p>কোর্স ইন্ট্রো ভিডিও দেখুন</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>

        <div className="bg-[#ca65fd]/20 dark:bg-[#0B060D] z-30 relative">
          <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
            <div className="flex flex-col  items-center pb-10 border-b border-black/30 dark:border-gray-300/10">
              <img src="/purple puzzle.png" alt="" />

              <p className="text-2xl lg:text-4xl mt-4 mb-2">
                কোর্সটি <span className="text-[#B153E0]">কীভাবে কাজ করবে</span>
              </p>
              <p className="text-paragraph dark:text-darkParagraph ">
                আমরা যেভাবে তোমাদের পাশে থাকব
              </p>
            </div>
            <div className="grid grid-cols-1 lgMd:grid-cols-2 mt-20 lg:mt-32 gap-x-20 gap-y-12  justify-items-center">
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(1);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-start ${
                    activeBoxIndex == 1 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 1
                        ? "linear-gradient(274deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(274deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px] "
                    style={{}}
                  >
                    <svg
                      width="480"
                      height="198"
                      viewBox="0 0 503 198"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-[100%] top-40 hidden lgMd:block "
                    >
                      <g filter="url(#filter0_d_794_44)">
                        <path
                          d="M5 1C6.49762 5.38757 23.9935 10.0201 29.294 12.1493C46.8075 19.1846 64.4083 23.6157 83.8561 27.8362C121.083 35.9149 159.881 39.5441 198.556 43.2637C283.567 51.4398 392.711 49.3583 458.323 92.0744C500.039 119.233 497.983 150.766 497.983 189"
                          stroke={
                            activeBoxIndex == 1 || activeBoxIndex == 2
                              ? "#B153E0"
                              : "#808080"
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="12 12"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_794_44"
                          x="-0.000244141"
                          y="-0.000244141"
                          width="502.993"
                          height="198"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_794_44"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_794_44"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 1
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 1
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          1
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        সেরাদের ও সেরা ইন্সট্রাক্টর প্যানেল
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        গুগলার থেকে শুরু করে বাংলাদেশের সবচেয়ে সেরা টিচার
                        প্যানেল যারা সবাই বুয়েট সি এস ই এর শিক্ষার্থী ছিল তোমাকে
                        দিবে সেরা কন্টেন্ট ও সেরা সাপোর্ট যা আর কোথাও নেই
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(2);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-end ${
                    activeBoxIndex == 2 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 2
                        ? "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)"
                        : "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80 relative top-[1px] "
                    style={{}}
                  >
                    <svg
                      width="495"
                      height="200"
                      viewBox="0 0 495 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[90%] -left-[88px] hidden lgMd:block"
                    >
                      <path
                        d="M494 1C494 16.1996 483.818 31.8545 478.773 46.5437C471.112 68.8527 454.029 88.223 433.094 106.004C389.353 143.153 285.069 127.428 218.855 134.91C48.9868 154.104 74.1208 161.948 1 199"
                        stroke={
                          activeBoxIndex == 2 || activeBoxIndex == 3
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 2
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 2
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          2
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        জিরো থেকে হিরো হওয়ার কমপ্লিট গাইডলাইন
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        তোমাকে একদম জিরো থেকে হিরো বানানোর জন্যে প্রথমত সি++ এর
                        বেসিক থেকে শুরু করে ডেটা স্ট্রাকচার ও ফাইনালি কম্পেটিটিভ
                        প্রোগ্রামিং এর জটিল টপিকগুলো একদম ধরে ধরে শিখিয়ে দেয়া
                        হবে
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(3);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-start ${
                    activeBoxIndex == 3 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 3
                        ? "linear-gradient(274deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(274deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    <svg
                      width="495"
                      height="206"
                      viewBox="0 0 495 206"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[100%] -right-[88px]  hidden lgMd:block"
                    >
                      <path
                        d="M1 1C9.15724 26.195 18.3459 49.6077 32.7232 68.7302C45.9632 86.34 64.0264 98.1142 79.7546 110.151C95.4355 122.151 110.859 132.697 127.985 139.429C159.676 151.885 191.361 162.919 223.984 168.571C261.6 175.089 298.471 175.857 336.306 175.857C378.639 175.857 419.692 181.984 461.539 190.429C469.159 191.966 475.721 192.841 482.38 198.254C485.98 201.18 489.843 205 494 205"
                        stroke={
                          activeBoxIndex == 3 || activeBoxIndex == 4
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 3
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 3
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          3
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        আন্তর্জাতিক মান সম্পন্ন কোর্স কন্টেন্ট আনলকিং
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        একটি নির্দিষ্ট সময় পর পর তোমাদের কোর্স কন্টেন্ট গুলো
                        আনলক করা হবে যেন তোমার শেখার পথে তোমাকে আমরা তোমাকে
                        রুটিন করে তোমাকে অভ্যস্থ করিয়ে ফেলতে পারি যেন শেখা টা
                        তোমার একটা অভ্যাসে পরিণত হয়ে যায়
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(4);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-end ${
                    activeBoxIndex == 4 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 4
                        ? "linear-gradient(120deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(120deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    {" "}
                    <svg
                      width="495"
                      height="200"
                      viewBox="0 0 495 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[100%] -left-[88px] hidden lgMd:block"
                    >
                      <path
                        d="M494 1C494 16.1996 483.818 31.8545 478.773 46.5437C471.112 68.8527 454.029 88.223 433.094 106.004C389.353 143.153 285.069 127.428 218.855 134.91C48.9868 154.104 74.1208 161.948 1 199"
                        stroke={
                          activeBoxIndex == 4 || activeBoxIndex == 5
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 4
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 4
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          4
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        পরীক্ষার মাধ্যমে নিজেকে যাচাই করার সুযোগ
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        প্রতিটি মডিউল এর ভিডিও গুলোর পর তোমাকে নিজেকে যাচাই করার
                        জন্যে থাকবে প্রচুর টপিক ভিত্তিক কুইজ আর তার সম্পুর্ন
                        সমাধান ব্যাখ্যা যেন ভুল হলেও কেন ভুল হয়েছে তার কারণটি
                        বুঝে নিজেকে শুধরে নিতে পার
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(5);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-start ${
                    activeBoxIndex == 5 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 5
                        ? "linear-gradient(274deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(274deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    {" "}
                    <svg
                      width="495"
                      height="206"
                      viewBox="0 0 495 206"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[100%] -right-[88px] hidden lgMd:block"
                    >
                      <path
                        d="M1 1C9.15724 26.195 18.3459 49.6077 32.7232 68.7302C45.9632 86.34 64.0264 98.1142 79.7546 110.151C95.4355 122.151 110.859 132.697 127.985 139.429C159.676 151.885 191.361 162.919 223.984 168.571C261.6 175.089 298.471 175.857 336.306 175.857C378.639 175.857 419.692 181.984 461.539 190.429C469.159 191.966 475.721 192.841 482.38 198.254C485.98 201.18 489.843 205 494 205"
                        stroke={
                          activeBoxIndex == 5 || activeBoxIndex == 6
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 5
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 5
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          5
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        কোর্স চলাকালীন রেগুলার লাইভ ক্লাস
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        এক্সট্রিম স্টুডেন্ট সাপোর্ট যেখানে রেগুলার তোমাদের জন্যে
                        কোর্স এর টিচার প্যানেল সরাসরি ২ ঘণ্টা লাইভ জুম কল এ বসে
                        তোমাদের সমস্যা সমাধান করবে যেন কোন ভাবেই তুমি আটিকিয়ে না
                        যাও বা তোমার শেখার গতি বাধাপ্রাপ্ত না হয়
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(6);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-end ${
                    activeBoxIndex == 6 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 6
                        ? "linear-gradient(124deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(124deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    <svg
                      width="495"
                      height="200"
                      viewBox="0 0 495 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[100%] -left-[88px] hidden lgMd:block"
                    >
                      <path
                        d="M494 1C494 16.1996 483.818 31.8545 478.773 46.5437C471.112 68.8527 454.029 88.223 433.094 106.004C389.353 143.153 285.069 127.428 218.855 134.91C48.9868 154.104 74.1208 161.948 1 199"
                        stroke={
                          activeBoxIndex == 6 || activeBoxIndex == 7
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 6
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 6
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          6
                        </p>
                      </div>
                      <p className="my-6 text-2xl">অল ইন ওয়ান সাপোর্ট</p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        এক ওয়েবসাইট থেকেই কোড লিখা,কোড প্রাকটিস করা, কোড রান করা
                        সহ সাবমিট করে সাবমিট হিস্ট্রি থেকে শুরু করে সব ভার্ডিক্ট
                        পেয়ে যাবে সো আলাদা করে অন্য ওয়েবসাইটে যাওয়ার প্রয়োজন
                        থাকবে না
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(7);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-start ${
                    activeBoxIndex == 7 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 7
                        ? "linear-gradient(274deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(274deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    {" "}
                    <svg
                      width="495"
                      height="206"
                      viewBox="0 0 495 206"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[100%] -right-[88px] hidden lgMd:block"
                    >
                      <path
                        d="M1 1C9.15724 26.195 18.3459 49.6077 32.7232 68.7302C45.9632 86.34 64.0264 98.1142 79.7546 110.151C95.4355 122.151 110.859 132.697 127.985 139.429C159.676 151.885 191.361 162.919 223.984 168.571C261.6 175.089 298.471 175.857 336.306 175.857C378.639 175.857 419.692 181.984 461.539 190.429C469.159 191.966 475.721 192.841 482.38 198.254C485.98 201.18 489.843 205 494 205"
                        stroke={
                          activeBoxIndex == 7 || activeBoxIndex == 8
                            ? "#B153E0"
                            : "#808080"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="12 12"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 7
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 7
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          7
                        </p>
                      </div>
                      <p className="my-6 text-2xl">
                        এসাইনমেন্ট ও এর সমাধান ভিডিও সমাধান
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        প্রতিটা মডিউল শেষে তোমাদের প্রাকটিস এর জন্যে থাকবে
                        কাস্টম এসাইনমেন্ট আর সেই এসাইনমেন্ট না পারলে থাকবে
                        সেগুলোর সমাধান ভিডিও ও একচুয়াল কোড সমাধান
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              <VisibilitySensor
                onChange={(isVisible: any) => {
                  if (isVisible) {
                    setActiveBoxIndex(8);
                  }
                }}
              >
                <div
                  className={`rounded-xl  text-center lg:justify-self-end ${
                    activeBoxIndex == 8 ? "opacity-100" : "opacity-40"
                  } transition-all duration-300  ease-in-out`}
                  style={{
                    background:
                      activeBoxIndex == 8
                        ? "linear-gradient(124deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)"
                        : "linear-gradient(124deg, rgba(255, 255, 255, 0.12) 0%, rgba(177, 83, 224, 0.00) 100%)",
                  }}
                >
                  <div
                    className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/30 relative top-[1px]"
                    style={{}}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`px-2 py-2 rounded-full ${
                          activeBoxIndex === 8
                            ? "bg-[#B153E0]/[.14]"
                            : "bg-gray-300/20"
                        }  `}
                      >
                        <p
                          className={`px-4 py-1 rounded-full  font-bold text-xl  ${
                            activeBoxIndex === 8
                              ? "bg-[#B153E0]/[.32]"
                              : "bg-gray-300/40"
                          }`}
                        >
                          8
                        </p>
                      </div>
                      <p className="my-6 text-2xl">ওয়েবসাইটে ডাউট সেকশন</p>
                      <p className="text-paragraph dark:text-darkParagraph">
                        প্রতিটি কোর্স কন্টেন্ট এর সাথে থাকবে ডিসকাশন ফোরাম
                        যেখানে কন্টেন্ট রিলেটেড যেকোন ডাউট আস্ক করতে পারবে
                      </p>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        <div className="bg-[#2BA98B]/20 dark:bg-[#02090A] z-30 relative">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
              <div className="pb-10 border-b border-gray-100/20 flex flex-col items-center">
                <div className="text-center">
                  <img src="/Seo.png" alt="" />
                </div>
                <h2 className="text-2xl md:text-4xl my-6">
                  কোর্স ইন্সট্রাক্টর
                </h2>
                <p className="text-xl">দেখে নাও আমাদের সেরা প্যানেল</p>
              </div>
              <div className="pt-20">
                <div className="grid grid-cols-1 lgXl:grid-cols-2 justify-center gap-16">
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Arghya Pal_Random.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Arghya Pal</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Instructor at CoderVai
                          </p>
                          {/* <p className="my-5 text-paragraph dark:text-darkParagraph">
                            লিনিয়ার, কয়েনবেস এবং পোস্টস্ক্রিপ্টের জন্য
                            ফ্রন্টেন্ড ডেভ গঠন করে
                          </p> */}
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Software Engineer at Google
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              ACM ICPC WORLD Finalist- 2 Times in a Row
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              ACM ICPC ASIA CHAMPION 2019
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Former RED CODER at CODEFORCES
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CSE{"'"}15</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Muttaqueen_random.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Tanveer Muttaqueen</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Instructor at CoderVai
                          </p>
                          {/* <p className="my-5 text-paragraph dark:text-darkParagraph">
                            লিনিয়ার, কয়েনবেস এবং পোস্টস্ক্রিপ্টের জন্য
                            ফ্রন্টেন্ড ডেভ গঠন করে
                          </p> */}
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Software Engineer at Google
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">ACM ICPC WORLD Finalist</p>
                          </div>

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CSE{"'"}15</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Sachin_Random.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Sachin Deb</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Instructor, Course Designer and Moderator at
                            CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Hi, I am Sachin, a 4th year undergraduate student at
                            BUET. I am interested in Competitive Programming,
                            full stack development and Machine Learning. I am
                            currently working as a instructor in this platform.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Have Strong Competitive Programming Background.
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              ICPC Regionals 7th(2021) and 10th(2022)
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">CF: Candidate Master</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Leetcode: Guardian(top: .06%)
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CSE{"'"}18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Sohaib_Random.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Sohaib Bin Musa</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Instructor, Problem Setter, Moderator at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Hey, I am Sohaib and I will be your instructor in
                            this course. I am currently studying CSE in BUET. I
                            am involved in Competitive Programming for the past
                            5 years. I am also researching algorithms for Bio
                            Informatics.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in Algorithms, Software Development, DL
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              ICPC regionals 10th (2022)
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">CF : Master</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BdPho 7th (2018)</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BDMO runners up (2017)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/UndefinedUser.png"
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Rudro Debnath</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Tester, Content Creator at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Hi, I{"'"}m Rudro Debnath, a 4th year undergraduate
                            student at BU. I am interested in Competitive
                            Programming, web development and Machine Learning.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in Competitive Programming
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">University Of Barishal</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET IUPC 2022 (15th)</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              ICPC 21 & 22 Dhaka Regional Participant
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Codeforces-Expert (Max- 1882)
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              LeetCode- Knight (Max- 2008, Top- 2.66%)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/UndefinedUser.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Tithi Saha</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Content Creator at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Hi, I{"'"}m Tithi Saha, a 4th year undergraduate student
                            at dept. of CSE, SUST. I{"'"}m interested in Web
                            Development, Machine Learning, Human and Computer
                            Interaction and Security. I{"'"}m currently working as a
                            content creator in this platform.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in Web Development
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Dept. of CSE, Shahjalal University of Science and
                              Technology, Sylhet
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Hack NSU Season 4 (2022), Champion
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              bdApps Nation Hackathon 2022, 2nd Runner-up at
                              Sylhet region
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              SUST SWE Technovent 2023 Brain Station 23
                              Hackathon, 4th
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/UndefinedUser.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Abrar Hasnat </p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Tester, Doubt solver, Content Maker at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Hi, I{"'"}m Abrar Hasnat, a 4th year undergrad student
                            at department of CSE,BUET. I{"'"}m interested in
                            Competitive Programming, full stack development and
                            Machine Learning.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in Competitive Programming, Software
                              development.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/UndefinedUser.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Jubaer Jami</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Developer at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Breathing Life into Cool Ideas.
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in NextJS, MERN Stack, Full Stack
                              Development.
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Working as Lead Frontend Developer at WarrantyWorx
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              NASA Space App Challenge 2021 Regional Champion
                              and Global Honorable Mention with Project
                              SolarSpec
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET ME{"'"}19</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(#12B76A9C 0%,  #12B76A1F 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#02090A]/90 relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/UndefinedUser.png "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Md. Mehrab Haque</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Developer at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Loves building things
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Expert in ReactJS, DevOps, Full Stack Development,
                              PERN Stack
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              NASA Space App Challenge 2020 Global Winner
                              Honorable Mention with Project Satellight
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Champion (DevOps Category), BUET CSE Fest 2022
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Top 30 at ideaTHON-2020 with the startup
                              Eco-Transformer
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              NASA EO Dashboard Hackathon-2021 Global Finalist
                              with Project PixelGrow.
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              {" "}
                              Hult-2023 Campus Finalist with project named
                              Garmeta
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CSE{"'"}18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>
        <div className="bg-[#ca65fd]/20 dark:bg-[#0B060D] z-30 relative">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
              <div className="pb-10 border-b border-gray-100/20 flex flex-col items-center">
                <div className="text-center">
                  <img src="/Seo.png" alt="" />
                </div>
                <h2 className="text-2xl md:text-4xl my-6">Founders</h2>
                <p className="text-xl">The Team behind this Initiative</p>
              </div>
              <div className="pt-20">
                <div className="grid grid-cols-1 lgXl:grid-cols-2 justify-center gap-16">
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80  relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Emran_Random.JPG "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px] h-[200px] object-cover object-[50%_20%]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Emran Mostofa</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Founder and CEO at CoderVai
                          </p>
                          <p className="my-5 text-paragraph dark:text-darkParagraph">
                            Love to Teach,Lead,Organise and Build
                          </p>
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">
                              Founder at Binary School
                            </p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CSE{"'"}15</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl text-center"
                    style={{
                      background:
                        "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
                    }}
                  >
                    <div
                      className=" rounded-xl px-6 py-8 pb-20 mx-[1px] dark:bg-[#0B060D]/80  relative top-[1px] h-full"
                      style={{}}
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
                        <div className="text-center flex-1">
                          <div className="flex justify-center">
                            <img
                              src="/CP instructors/Apar_Random.jpg "
                              alt=""
                              className="rounded-xl w-full lg:w-[250px]"
                            />
                          </div>
                          <p className="mt-6 text-2xl">Numeri Sattar Apar</p>
                          <p className="mt-2 text-xl text-paragraph dark:text-darkParagraph">
                            Founder and Chairman at CoderVai
                          </p>
                          {/* <p className="my-5 text-paragraph dark:text-darkParagraph">
                            লিনিয়ার, কয়েনবেস এবং পোস্টস্ক্রিপ্টের জন্য
                            ফ্রন্টেন্ড ডেভ গঠন করে
                          </p> */}
                          {/* <div className="flex justify-center gap-8">
                            <svg
                              width="21"
                              height="17"
                              viewBox="0 0 21 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.7918 16.8028C14.3371 16.8028 18.4652 10.5501 18.4652 5.12941C18.4652 4.95363 18.4613 4.77394 18.4535 4.59816C19.2566 4.01741 19.9496 3.29807 20.5 2.47394C19.7521 2.80669 18.958 3.02401 18.1449 3.11847C19.0011 2.60528 19.6421 1.79908 19.9492 0.849329C19.1438 1.32665 18.263 1.66337 17.3445 1.84503C16.7257 1.18749 15.9075 0.75212 15.0164 0.606232C14.1253 0.460345 13.211 0.612065 12.4148 1.03794C11.6186 1.46381 10.9848 2.14011 10.6115 2.96228C10.2382 3.78445 10.1462 4.7067 10.3496 5.58644C8.71874 5.5046 7.12328 5.08094 5.66665 4.34294C4.21002 3.60493 2.92474 2.56905 1.89414 1.30245C1.37033 2.20556 1.21005 3.27423 1.44586 4.29127C1.68167 5.3083 2.29589 6.1974 3.16367 6.77784C2.51219 6.75716 1.87498 6.58176 1.30469 6.26613V6.31691C1.3041 7.26465 1.63175 8.18335 2.23192 8.91683C2.8321 9.65032 3.66777 10.1533 4.59687 10.3403C3.99338 10.5055 3.35999 10.5295 2.7457 10.4107C3.00788 11.2257 3.51798 11.9386 4.20481 12.4498C4.89164 12.961 5.72093 13.245 6.57695 13.2622C5.12369 14.4038 3.32848 15.023 1.48047 15.02C1.15274 15.0195 0.825333 14.9994 0.5 14.9599C2.37738 16.1643 4.56128 16.804 6.7918 16.8028Z"
                                fill="#787878"
                              />
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_501_15571)">
                                <path
                                  d="M19.0195 0.677734H1.97656C1.16016 0.677734 0.5 1.32227 0.5 2.11914V19.2324C0.5 20.0293 1.16016 20.6777 1.97656 20.6777H19.0195C19.8359 20.6777 20.5 20.0293 20.5 19.2363V2.11914C20.5 1.32227 19.8359 0.677734 19.0195 0.677734ZM6.43359 17.7207H3.46484V8.17383H6.43359V17.7207ZM4.94922 6.87305C3.99609 6.87305 3.22656 6.10352 3.22656 5.1543C3.22656 4.20508 3.99609 3.43555 4.94922 3.43555C5.89844 3.43555 6.66797 4.20508 6.66797 5.1543C6.66797 6.09961 5.89844 6.87305 4.94922 6.87305ZM17.543 17.7207H14.5781V13.0801C14.5781 11.9746 14.5586 10.5488 13.0352 10.5488C11.4922 10.5488 11.2578 11.7559 11.2578 13.002V17.7207H8.29688V8.17383H11.1406V9.47852H11.1797C11.5742 8.72852 12.543 7.93555 13.9844 7.93555C16.9883 7.93555 17.543 9.91211 17.543 12.4824V17.7207Z"
                                  fill="#787878"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_501_15571">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.677734)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 0.677734C4.97939 0.677734 0.5 5.15713 0.5 10.6777C0.5 16.1984 4.97939 20.6777 10.5 20.6777C16.0098 20.6777 20.5 16.1984 20.5 10.6777C20.5 5.15713 16.0098 0.677734 10.5 0.677734ZM17.1052 5.28728C18.2983 6.74064 19.0141 8.5953 19.0358 10.6018C18.7538 10.5476 15.9338 9.97273 13.0922 10.3307C13.0271 10.1897 12.9729 10.0378 12.9078 9.88598C12.7343 9.47386 12.5391 9.05086 12.3438 8.64955C15.4891 7.36973 16.9208 5.52589 17.1052 5.28728ZM10.5 2.15279C12.6692 2.15279 14.654 2.96624 16.1616 4.3003C16.0097 4.51722 14.7191 6.24173 11.6822 7.38055C10.2831 4.81005 8.73213 2.70593 8.4935 2.38055C9.13338 2.22871 9.80587 2.15279 10.5 2.15279ZM6.86662 2.95539C7.09437 3.25908 8.61281 5.37405 10.0336 7.8903C6.0423 8.95323 2.51736 8.93155 2.13774 8.93155C2.69089 6.28511 4.48047 4.08337 6.86662 2.95539ZM1.95336 10.6886C1.95336 10.6018 1.95336 10.515 1.95336 10.4283C2.32213 10.4391 6.46529 10.4934 10.7278 9.21355C10.9773 9.69073 11.205 10.1788 11.4219 10.6669C11.3134 10.6994 11.1941 10.732 11.0857 10.7645C6.68221 12.1853 4.33948 16.0682 4.14425 16.3935C2.7885 14.886 1.95336 12.8795 1.95336 10.6886ZM10.5 19.2244C8.526 19.2244 6.70391 18.5519 5.26139 17.4239C5.41323 17.1094 7.14856 13.7689 11.9642 12.0877C11.9859 12.0769 11.9968 12.0769 12.0184 12.066C13.2223 15.1788 13.7104 17.7927 13.8406 18.541C12.8102 18.9857 11.6822 19.2244 10.5 19.2244ZM15.2614 17.7602C15.1746 17.2395 14.7191 14.745 13.6019 11.6755C16.2809 11.2525 18.6236 11.9467 18.9165 12.0444C18.5478 14.4196 17.1811 16.4695 15.2614 17.7602Z"
                                fill="#787878"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <div className="text-paragraph dark:text-darkParagraph text-left flex-1">
                          {/* <div className="text-heading dark:text-darkHeading flex gap-2 items-center">
                            <p>34টি কোর্স </p>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2"
                                cy="2.17773"
                                r="2"
                                fill="#D9D9D9"
                              />
                            </svg>
                            <p>159 ঘন্টা</p>
                          </div> */}

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">CEO @ APAR{"'"}S</p>
                          </div>
                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">Managing Director ACS</p>
                          </div>

                          <div className="flex gap-6  my-5">
                            <div>
                              <svg
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="w-[20px] h-[22px]"
                                  d="M17 8.67773L10 1.67773L1 10.6777H3V17.6777C3 18.2082 3.21071 18.7169 3.58579 19.0919C3.96086 19.467 4.46957 19.6777 5 19.6777H12.5M7 19.6777V13.6777C7 13.1473 7.21071 12.6386 7.58579 12.2635C7.96086 11.8884 8.46957 11.6777 9 11.6777H11C11.661 11.6777 12.248 11.9977 12.612 12.4927M17 12.6777L15 16.6777H19L17 20.6777"
                                  stroke="#6A6A6A"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-base">BUET CE{"'"}15</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>
        <div className="bg-[#F1BA41]/10 dark:bg-[#080600] z-30 relative">
          <svg
            width="1311"
            height="953"
            viewBox="0 0 1311 953"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 z-0"
          >
            <g filter="url(#filter0_f_249_7574)">
              <ellipse
                cx="709.691"
                cy="328.77"
                rx="211.288"
                ry="118.953"
                transform="rotate(-10.6934 709.691 328.77)"
                fill="#DE9931"
                fillOpacity="0.48"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_249_7574"
                x="0.884995"
                y="-294.55"
                width="1417.61"
                height="1246.64"
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
                  result="effect1_foregroundBlur_249_7574"
                />
              </filter>
            </defs>
          </svg>
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <div className="w-[90%] lg:w-[80%] mx-auto  text-heading dark:text-darkHeading py-20 md:py-32">
              <div className="flex flex-col items-center gap-8 z-10 relative">
                <img src="/question and exclamation mark.png" alt="" />

                <p className="text-2xl md:text-4xl">
                  সচরাচর জানতে চাও প্রশ্নের উত্তর
                </p>
              </div>
              <div className="mt-8 lg:mt-16">
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20">
                  <input
                    type="radio"
                    name="my-accordion-3"
                    defaultChecked={true}
                  />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটি কিভাবে চলবে?
                  </div>
                  <div className="collapse-content">
                    <p>
                      আমাদের কোর্সটি তে রেকর্ডেড ভিডিও কন্টেন্ট,কাস্টম কোডিং
                      প্রব্লেম সহ অন্যান্য কন্টেন্ট গুলো নির্দিস্ট সময় পর পর
                      আনলক হবে আর সাথে রেগুলার লাইভ ক্লাস গুলো এনাউন্স করা হবে
                      যেখানে স্টুডেন্টরা সরাসরি জুম লাইভ ক্লাসে এসে ডাউট সহ
                      কনসেপ্ট ক্লিয়ার করে নিয়ে এগিয়ে যাবে সাথে রেগুলার কোডিং
                      কনটেস্ট আয়োজন করা হবে যা
                    </p>
                  </div>
                </div>

                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটি কাদের জন্যে ?
                  </div>
                  <div className="collapse-content">
                    <p>
                      যারা কম্পেটিটিভ প্রোগ্রামিং শিখতে আগ্রহী কিন্তু সঠিক
                      গাইডলাইন পাচ্ছে না। কম্পেটিটীভ প্রোগ্রামিং করেছে কিন্তু
                      মাঝপথে দিশেহারা হয়ে ছেড়ে দিয়েছে। যারা কলেজ এ থাকা অবস্থায়
                      প্রোগ্রামিং শিখে এগিয়ে থাকতে চায়। যারা বিশ্ব-বিদ্যালয় এ সি
                      এস ই নিয়ে ভর্তি হয়েছে কিন্তু প্রোগ্রামিং না পারায় পিছিয়ে
                      যাচ্ছে একাডমিক রেজাল্ট খারাপ হচ্ছে । যারা নিজেদের ভবিষ্যতে
                      GOOGLE,FACEBOOK,AMAZOM সহ বিশ্বসেরা ড্রিম কোম্পানি গুলোতে
                      চাকরি পেয়ে চায় তাড়াই আমাদের কোর্সে ভর্তি হতে পারবে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    আমি প্রোগ্রামিং তেমন পারি না আমি কি কোর্স টি করতে পারব ?
                  </div>
                  <div className="collapse-content">
                    <p>
                      আমাদের কোর্সটি এইবার নতুন করে সাজানো হয়েছে যেন একদম শূন্য
                      থেকেও প্রোগ্রামিং শিখে কোর্সটিতে এগিয়ে যাওয়া যায়।C++ এর
                      একদম বেসিক থেকে ধরে এডভ্যান্স প্রব্লেম সলভ করার জন্যে যা
                      যা প্রয়োজন তার সব ই এড করা হয়েছে এই কোর্সে তাই যারা একদমই
                      প্রোগ্রামিং পারে না তারাও আমাদের এই কোর্সটি করতে পারবে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    আমি মোটামুটি প্রোগ্রামিং পারি আর নিয়মিত সিপি করার ট্রাই করি
                    আমার কি এই কোর্সটি করা উচিত?
                  </div>
                  <div className="collapse-content">
                    <p>
                      আমাদের কোর্সে ক্লাস নিবে যারা বুয়েট সি এস ই থেকে পড়ে এখন
                      গুগলে আছে আর কোডফোর্সেস সহ প্রোগ্রামিং এর অলিম্পিকস ACM
                      ICPC তে WORLD FInalist সহ ASIA WEST Champion পর্যন্ত
                      হয়েছে। তারা CP এর কমপ্লেক্স টপিক ডায়নামিক প্রোগ্রামিং সহ
                      গেম থিওরি গুলো বুঝিয়ে দিবে তাই এডভ্যান্স জিনিসপত্র ও
                      শেখানো হবে আমাদের এই কোর্সে তাই যারা CP এর কমপ্লেক্স
                      টপিকগুলো শিখতে চাইলে জয়েন করে ফেলতে পার
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্স চলাকালীন কোন সমস্যায় পড়লে কিভাবে হেল্প পাব?
                  </div>
                  <div className="collapse-content">
                    <p>
                      তোমাদের জন্যে প্রতিটি কন্টেন্ট এর নিচে ডিসকাশন সেকশন থাকবে
                      যেখানে তোমারা ঐ কন্টেন্ট রিলেটেড প্রশ্ন করতে পারবে। সাথে
                      রেগুলার জুম লাইভ ক্লাস নেয়া হবে যেখানে তুমি সরাসরি লাইভে
                      এসে তোমার ডাউট সলভ করে নিতে পারবে আর আমাদের ফেইসবুক
                      কমিউনিটি তো থাকবেই সার্বক্ষনিক ও আজীবন তোমাকে সাপোর্ট দিতে
                      । সো সমস্যা তোমার আর সলভ করার দায়িত্ব আমাদের।
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটির কন্টেন্ট গুলো কত দিন এক্সেস থাকবে?
                  </div>
                  <div className="collapse-content">
                    <p>
                      কোর্সটির ডিউরেশন ৪ মাস কিন্তু তোমাদের সবার নিজেদের
                      পারসোনাল কাজ থাকায় আমরা কন্টেন্ট গুলো পুরো ১ বছর তোমাদের
                      প্রোফাইলে এক্সেস দিব তাই তুমি তোমার নিজের রুটিনের সাথে
                      মিলিয়ে কন্টেন্ট গুলো নিজের মত এক্সেস করতে পারবে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটির শেষে কি সার্টিফিকেট দেয়া হবে ?
                  </div>
                  <div className="collapse-content">
                    <p>
                      কোর্সটি তুমি শেষ করতে পারলে তোমাকে কোর্স কমপ্লিশন
                      সার্টিফিকেট দেয়া হবে যা তুমি সবার সাথে শেয়ার করতে পারবে বা
                      নিজের অর্জনের তালিকায় এড করতে পারবে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটি কি রিফান্ড নেয়া যাবে?
                  </div>
                  <div className="collapse-content">
                    <p>
                      না আমাদের কোর্সে কোন রিফান্ড এর ব্যবস্থা নেই তাই বুঝে শুনে
                      কোর্সটি পারচেস করবা টিচার আর সিলেবাস দেখে নিয়ে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটিতে জয়েন করে আমার বন্ধু বান্ধবীদের সাথে শেয়ার করা
                    যাবে?
                  </div>
                  <div className="collapse-content">
                    <p>
                      কোনভাবেই কোর্স বা তোমার আইডি তুমি কারো সাথে শেয়ার করতে
                      পারবে না । করলে আমরা আমাদের এন্ড থেকে থেকে আইডি রিমুভ করে
                      দেয়া হবে সাথে কোর্স এক্সেস ও বন্ধ করে দেয়া হবে আর এক
                      ডিভাইস থেকে অন্য ডিভাইসে লগইন করলে অটোমেটিক তোমাকে আগের
                      ডিভাইস থেকে রিমুভ করে দেয়া হবে
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mt-6">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl font-medium">
                    কোর্সটি করার পর আমি কি করব কিভাবে এগিয়ে যাব ?
                  </div>
                  <div className="collapse-content">
                    <p>
                      তুমি সফলভাবে কোর্সটী কমপ্লিট করতে পারলে প্রব্লেম সলভিং
                      তোমার একটি অভ্যাসে পরিণত হবে। তুমি এর পর কোডফোর্সেস এ
                      নিয়মিত কন্টেস্ট করবে সাথে অন্যান্য প্ল্যাটফর্মেও কন্টেস্ট
                      করার ট্রাই করবে আর নিজের র‍্যাংকিং এগিয়ে নেয়ার ট্রাই করবে
                      এভাবেই এগিয়ে যাবে সাথে কোথাও কোন সমস্যার মুখোমুখি হলে
                      আমাদের কমিউনিটি তে হেল্প চাইবে
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimationOnScroll>
        </div>

        <Footer />
      </div>
    </main>
  );
}
