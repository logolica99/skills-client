import Nav from "@/components/Nav";
import React, { useState, useContext, useEffect } from "react";
import { HindSiliguri } from "@/helpers";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";
import { UserContext } from "@/Contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/helpers";
import FloatingCompiler from "@/components/FloatingCompiler";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Footer from "@/components/Footer";

type Props = {};

export default function NotificationPage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);

  return (
    <ProtectedRoute>
      <div className={`  ${HindSiliguri.variable} font-hind   overflow-x-hidden`}>
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

        <div className="py-16 bg-white dark:bg-[#0B060D] overflow-x-hidden">
          <div className="w-[90%] lgXl:w-[80%] mx-auto py-12 z-20">
            <div className="min-h-[80vh]">
              <p className="text-heading dark:text-darkHeading text-3xl">
                আপনার নোটিফিকেশানস
              </p>
              <div className="mt-10">
                <div className="flex items-center  gap-8 hover:bg-gray-400/10 ease-in-out duration-150 cursor-pointer dark:bg-[#0B060D]/30 bg-gray-400/30  backdrop-blur-lg border border-gray-400/80  dark:border-gray-200/20 rounded-md my-4 p-8">
                  <svg
                    height={30}
                    width={30}
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.94513 1.25H15.0549C16.4225 1.24998 17.5248 1.24996 18.3918 1.36652C19.2919 1.48754 20.0497 1.74643 20.6517 2.34835C21.2536 2.95027 21.5125 3.70814 21.6335 4.60825C21.75 5.47522 21.75 6.57754 21.75 7.94513V16.0549C21.75 17.4225 21.75 18.5248 21.6335 19.3918C21.5125 20.2919 21.2536 21.0497 20.6517 21.6517C20.0497 22.2536 19.2919 22.5125 18.3918 22.6335C17.5248 22.75 16.4225 22.75 15.0549 22.75H8.94513C8.63162 22.75 8.33204 22.75 8.04605 22.7486C8.03082 22.7495 8.01546 22.75 8 22.75C7.98169 22.75 7.96353 22.7493 7.94555 22.7481C7.02806 22.7424 6.25306 22.7202 5.60825 22.6335C4.70814 22.5125 3.95027 22.2536 3.34835 21.6517C2.74643 21.0497 2.48754 20.2919 2.36652 19.3918C2.2704 18.6768 2.25356 17.8018 2.25062 16.75H2C1.58579 16.75 1.25 16.4142 1.25 16C1.25 15.5858 1.58579 15.25 2 15.25H2.25V12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H2.25V8.75H2C1.58579 8.75 1.25 8.41421 1.25 8C1.25 7.58579 1.58579 7.25 2 7.25H2.25062C2.25356 6.19818 2.2704 5.32319 2.36652 4.60825C2.48754 3.70814 2.74643 2.95027 3.34835 2.34835C3.95027 1.74643 4.70814 1.48754 5.60825 1.36652C6.47522 1.24996 7.57754 1.24998 8.94513 1.25ZM3.75 8.75H4C4.41421 8.75 4.75 8.41421 4.75 8C4.75 7.58579 4.41421 7.25 4 7.25H3.75078C3.75398 6.2042 3.77029 5.42437 3.85315 4.80812C3.9518 4.07435 4.13225 3.68577 4.40901 3.40901C4.68577 3.13225 5.07434 2.9518 5.80812 2.85315C6.2098 2.79914 6.68097 2.77341 7.25 2.76115V21.2389C6.68097 21.2266 6.2098 21.2009 5.80812 21.1469C5.07434 21.0482 4.68577 20.8678 4.40901 20.591C4.13225 20.3142 3.9518 19.9257 3.85315 19.1919C3.77029 18.5756 3.75398 17.7958 3.75078 16.75H4C4.41421 16.75 4.75 16.4142 4.75 16C4.75 15.5858 4.41421 15.25 4 15.25H3.75V12.75H4C4.41421 12.75 4.75 12.4142 4.75 12C4.75 11.5858 4.41421 11.25 4 11.25H3.75V8.75ZM8.75 21.25C8.83184 21.25 8.91516 21.25 9 21.25H15C16.4354 21.25 17.4365 21.2484 18.1919 21.1469C18.9257 21.0482 19.3142 20.8678 19.591 20.591C19.8678 20.3142 20.0482 19.9257 20.1469 19.1919C20.2484 18.4365 20.25 17.4354 20.25 16V8C20.25 6.56458 20.2484 5.56347 20.1469 4.80812C20.0482 4.07435 19.8678 3.68577 19.591 3.40901C19.3142 3.13225 18.9257 2.9518 18.1919 2.85315C17.4365 2.75159 16.4354 2.75 15 2.75H9C8.91516 2.75 8.83184 2.75001 8.75 2.75004V21.25ZM10.75 6.5C10.75 6.08579 11.0858 5.75 11.5 5.75H16.5C16.9142 5.75 17.25 6.08579 17.25 6.5C17.25 6.91421 16.9142 7.25 16.5 7.25H11.5C11.0858 7.25 10.75 6.91421 10.75 6.5ZM10.75 10C10.75 9.58579 11.0858 9.25 11.5 9.25H16.5C16.9142 9.25 17.25 9.58579 17.25 10C17.25 10.4142 16.9142 10.75 16.5 10.75H11.5C11.0858 10.75 10.75 10.4142 10.75 10Z"
                        fill={user.darkMode?"#E2E8F0":"black"}
                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="flex w-full justify-center">
                    <p className="text-heading dark:text-darkHeading text-xl">
                      Your Assignment Has been Returned
                    </p>
                  </div>
                </div>
                <div className="flex items-center  gap-8 hover:bg-gray-400/10 ease-in-out duration-150 cursor-pointer dark:bg-[#0B060D]/30 bg-gray-400/30  backdrop-blur-lg border border-gray-400/80  dark:border-gray-200/20 rounded-md my-4 p-8">
                  <svg
                    height={30}
                    width={30}
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
                      <g opacity="0.5">
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.46689 4.39207C5.75949 4.68526 5.75902 5.16013 5.46583 5.45273C3.78722 7.128 2.75 9.44218 2.75 12C2.75 14.5878 3.81163 16.9262 5.52503 18.6059C5.82082 18.8959 5.82554 19.3707 5.53557 19.6665C5.24561 19.9623 4.77076 19.967 4.47497 19.677C2.48564 17.7269 1.25 15.0071 1.25 12C1.25 9.02783 2.45721 6.33616 4.40623 4.39102C4.69941 4.09842 5.17429 4.09889 5.46689 4.39207ZM18.6164 4.46446C18.9122 4.17449 19.387 4.17921 19.677 4.475C21.5771 6.41326 22.75 9.07043 22.75 12C22.75 14.9645 21.5491 17.6499 19.609 19.5938C19.3164 19.887 18.8415 19.8875 18.5484 19.5949C18.2552 19.3023 18.2547 18.8274 18.5473 18.5342C20.2182 16.86 21.25 14.5512 21.25 12C21.25 9.47873 20.2422 7.1943 18.6059 5.52507C18.3159 5.22928 18.3206 4.75443 18.6164 4.46446ZM8.30923 7.48757C8.59226 7.79001 8.57652 8.26462 8.27408 8.54765C7.32517 9.43564 6.75 10.6502 6.75 11.9822C6.75 13.3297 7.33869 14.5573 8.30756 15.4479C8.61251 15.7282 8.63248 16.2026 8.35216 16.5076C8.07185 16.8125 7.59739 16.8325 7.29244 16.5522C6.03967 15.4006 5.25 13.7824 5.25 11.9822C5.25 10.203 6.02148 8.60128 7.24916 7.45242C7.5516 7.16939 8.02621 7.18513 8.30923 7.48757ZM15.7429 7.52559C16.0292 7.22626 16.5039 7.21571 16.8033 7.50202C18.0005 8.64714 18.75 10.2286 18.75 11.9822C18.75 13.7568 17.9825 15.3548 16.7604 16.503C16.4586 16.7867 15.9839 16.7719 15.7003 16.47C15.4167 16.1681 15.4315 15.6935 15.7333 15.4099C16.6778 14.5225 17.25 13.3108 17.25 11.9822C17.25 10.6692 16.6911 9.47046 15.7664 8.58599C15.4671 8.29968 15.4566 7.82492 15.7429 7.52559Z"
                          fill={user.darkMode?"#E2E8F0":"black"}

                        ></path>{" "}
                      </g>{" "}
                      <path
                        d="M13.6563 10.4511C14.5521 11.1088 15 11.4376 15 12C15 12.5624 14.5521 12.8912 13.6563 13.5489C13.4091 13.7304 13.1638 13.9014 12.9384 14.0438C12.7407 14.1688 12.5168 14.298 12.2849 14.4249C11.3913 14.914 10.9444 15.1586 10.5437 14.8878C10.1429 14.617 10.1065 14.0502 10.0337 12.9166C10.0131 12.596 10 12.2817 10 12C10 11.7183 10.0131 11.404 10.0337 11.0834C10.1065 9.94977 10.1429 9.38296 10.5437 9.1122C10.9444 8.84144 11.3913 9.08599 12.2849 9.57509C12.5168 9.70198 12.7407 9.83123 12.9384 9.95619C13.1638 10.0986 13.4091 10.2696 13.6563 10.4511Z"
                        fill={user.darkMode?"#E2E8F0":"black"}

                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="flex w-full justify-center">
                    <p className="text-heading dark:text-darkHeading text-xl">
                      New Live Class has Announced!
                    </p>
                  </div>
                </div>
                <div className="flex items-center  gap-8 hover:bg-gray-400/10 ease-in-out duration-150 cursor-pointer dark:bg-[#0B060D]/30 bg-gray-400/30  backdrop-blur-lg border border-gray-400/80  dark:border-gray-200/20 rounded-md my-4 p-8">
                  <svg
                    height={30}
                    width={30}
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
                      <circle
                        opacity="0.5"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={user.darkMode?"#E2E8F0":"black"}

                        stroke-width="1.5"
                      ></circle>{" "}
                      <path
                        d="M12 17V11"
                        stroke={user.darkMode?"#E2E8F0":"black"}

                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <circle
                        cx="1"
                        cy="1"
                        r="1"
                        transform="matrix(1 0 0 -1 11 9)"
                        fill={user.darkMode?"#E2E8F0":"black"}

                      ></circle>{" "}
                    </g>
                  </svg>
                  <div className="flex w-full justify-center">
                    <p className="text-heading dark:text-darkHeading text-xl">
                      Custom Admin Message
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
