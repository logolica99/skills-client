import React, { useContext, useEffect, useState } from "react";

type Props = {};

import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";

export default function MyCourses({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [wishListCourses, setWishlistCourses] = useState<any>([]);

  const fetchWishtLists = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/course/getWishList/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWishlistCourses(res.data?.data);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };
  useEffect(() => {
    fetchWishtLists();
  }, []);
  return (
    <ProtectedRoute>
      <div
        className={`  ${HindSiliguri.variable} overflow-x-hidden   font-hind`}
      >
        <Nav></Nav>
        <Toaster />
        <FloatingCompiler />

        <button
          style={{ zIndex: 999 }}
          onClick={() => {
            setUser({ ...user, openCompiler: true });
          }}
          className="fixed -left-2 top-80 border border-gray-200/20  bg-[#0B060D] bg-opacity-30 p-3 backdrop-blur-lg hover:bg-gray-300/20 "
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
        <div className="overflow-x-hidden bg-white py-16 dark:bg-[#0E0E0E]">
          <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 lgXl:w-[80%]">
            <div className="flex flex-col  lg:flex-row  justify-between gap-20 w-full">
              <div className="rounded-xl flex-[1] border py-16 px-8 border-[#2BA98B]/50 bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 w-full">
                <div className="flex flex-col items-center">
                  <img
                    src="/profile_image.png"
                    alt=""
                    className="w-[100px] h-[100px] object-cover rounded-full"
                  />
                  <div className="mt-8 mb-12 flex flex-col items-center w-full">
                    <div className="bg-[#DFDBDB]/10 w-full h-4 rounded-full">
                      <div className="bg-[#2BA98B] w-[15%] h-4 rounded-full"></div>
                    </div>
                    <p className="mt-3 text-paragraph dark:text-darkParagraph">
                      45% Completed
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 px-4 py-3 border rounded-xl border-[#2BA98B]/20  backdrop-blur-lg bg-[#2BA98B]/5 ">
                    <svg
                      width="24"
                      height="20"
                      viewBox="0 0 24 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 18.1671C10.4038 17.2456 8.59313 16.7604 6.75 16.7604C4.90686 16.7604 3.0962 17.2456 1.5 18.1671V3.00048C3.0962 2.07892 4.90686 1.59375 6.75 1.59375C8.59313 1.59375 10.4038 2.07892 12 3.00048M12 18.1671C13.5962 17.2456 15.4069 16.7604 17.25 16.7604C19.0931 16.7604 20.9038 17.2456 22.5 18.1671V3.00048C20.9038 2.07892 19.0931 1.59375 17.25 1.59375C15.4069 1.59375 13.5962 2.07892 12 3.00048M12 18.1671V3.00048"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-heading dark:text-darkHeading font-semibold text-xl">
                      My Courses
                    </p>
                  </div>

                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.196 19.9905C5.48476 19.0294 6.07563 18.187 6.88095 17.5883C7.68628 16.9896 8.66315 16.6664 9.66667 16.6667H14.3333C15.3381 16.6663 16.3162 16.9903 17.1221 17.5904C17.928 18.1905 18.5187 19.0347 18.8063 19.9975M1.5 12C1.5 13.3789 1.77159 14.7443 2.29926 16.0182C2.82694 17.2921 3.60036 18.4496 4.57538 19.4246C5.55039 20.3996 6.70791 21.1731 7.98182 21.7007C9.25574 22.2284 10.6211 22.5 12 22.5C13.3789 22.5 14.7443 22.2284 16.0182 21.7007C17.2921 21.1731 18.4496 20.3996 19.4246 19.4246C20.3996 18.4496 21.1731 17.2921 21.7007 16.0182C22.2284 14.7443 22.5 13.3789 22.5 12C22.5 10.6211 22.2284 9.25574 21.7007 7.98182C21.1731 6.70791 20.3996 5.55039 19.4246 4.57538C18.4496 3.60036 17.2921 2.82694 16.0182 2.29927C14.7443 1.77159 13.3789 1.5 12 1.5C10.6211 1.5 9.25574 1.77159 7.98182 2.29927C6.70791 2.82694 5.55039 3.60036 4.57538 4.57538C3.60036 5.55039 2.82694 6.70791 2.29926 7.98182C1.77159 9.25574 1.5 10.6211 1.5 12ZM8.5 9.66667C8.5 10.5949 8.86875 11.4852 9.52513 12.1415C10.1815 12.7979 11.0717 13.1667 12 13.1667C12.9283 13.1667 13.8185 12.7979 14.4749 12.1415C15.1313 11.4852 15.5 10.5949 15.5 9.66667C15.5 8.73841 15.1313 7.84817 14.4749 7.19179C13.8185 6.53542 12.9283 6.16667 12 6.16667C11.0717 6.16667 10.1815 6.53542 9.52513 7.19179C8.86875 7.84817 8.5 8.73841 8.5 9.66667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      My Profile
                    </p>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49949 14.4997L14.4995 7.4997M9.83282 3.99971L10.373 3.37437C11.4671 2.28042 12.951 1.66591 14.4982 1.66602C16.0453 1.66613 17.5291 2.28085 18.6231 3.37496C19.717 4.46906 20.3315 5.95293 20.3314 7.50012C20.3313 9.04731 19.7166 10.5311 18.6225 11.625L17.9995 12.1664M12.1662 17.9997L11.703 18.6227C10.5961 19.7173 9.10227 20.3311 7.5456 20.3311C5.98893 20.3311 4.49506 19.7173 3.38818 18.6227C2.8426 18.0832 2.40946 17.4409 2.11384 16.7329C1.81823 16.0248 1.66602 15.2652 1.66602 14.498C1.66602 13.7307 1.81823 12.9711 2.11384 12.263C2.40946 11.555 2.8426 10.9127 3.38818 10.3732L3.99951 9.83304"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Social Links
                    </p>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 18.5837L8.5 16.8337M8.5 16.8337L1.5 20.3337V5.16699L8.5 1.66699M8.5 16.8337V1.66699M8.5 1.66699L15.5 5.16699M15.5 5.16699L22.5 1.66699V10.417M15.5 5.16699V11.5837M20.1667 18.0003V18.012M22.6412 20.4748C23.1308 19.9854 23.4642 19.3617 23.5993 18.6828C23.7345 18.0038 23.6652 17.3 23.4003 16.6604C23.1355 16.0208 22.6869 15.4741 22.1113 15.0895C21.5357 14.7049 20.8589 14.4996 20.1667 14.4996C19.4744 14.4996 18.7977 14.7049 18.2221 15.0895C17.6465 15.4741 17.1979 16.0208 16.933 16.6604C16.6681 17.3 16.5989 18.0038 16.734 18.6828C16.8691 19.3617 17.2026 19.9854 17.6922 20.4748C18.1798 20.9637 19.0047 21.694 20.1667 22.667C21.3928 21.6287 22.2188 20.8983 22.6412 20.4748Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Gift Address
                    </p>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.196 19.9905C5.48476 19.0294 6.07563 18.187 6.88095 17.5883C7.68628 16.9896 8.66315 16.6664 9.66667 16.6667H14.3333C15.3381 16.6663 16.3162 16.9903 17.1221 17.5904C17.928 18.1905 18.5187 19.0347 18.8063 19.9975M1.5 12C1.5 13.3789 1.77159 14.7443 2.29926 16.0182C2.82694 17.2921 3.60036 18.4496 4.57538 19.4246C5.55039 20.3996 6.70791 21.1731 7.98182 21.7007C9.25574 22.2284 10.6211 22.5 12 22.5C13.3789 22.5 14.7443 22.2284 16.0182 21.7007C17.2921 21.1731 18.4496 20.3996 19.4246 19.4246C20.3996 18.4496 21.1731 17.2921 21.7007 16.0182C22.2284 14.7443 22.5 13.3789 22.5 12C22.5 10.6211 22.2284 9.25574 21.7007 7.98182C21.1731 6.70791 20.3996 5.55039 19.4246 4.57538C18.4496 3.60036 17.2921 2.82694 16.0182 2.29927C14.7443 1.77159 13.3789 1.5 12 1.5C10.6211 1.5 9.25574 1.77159 7.98182 2.29927C6.70791 2.82694 5.55039 3.60036 4.57538 4.57538C3.60036 5.55039 2.82694 6.70791 2.29926 7.98182C1.77159 9.25574 1.5 10.6211 1.5 12ZM8.5 9.66667C8.5 10.5949 8.86875 11.4852 9.52513 12.1415C10.1815 12.7979 11.0717 13.1667 12 13.1667C12.9283 13.1667 13.8185 12.7979 14.4749 12.1415C15.1313 11.4852 15.5 10.5949 15.5 9.66667C15.5 8.73841 15.1313 7.84817 14.4749 7.19179C13.8185 6.53542 12.9283 6.16667 12 6.16667C11.0717 6.16667 10.1815 6.53542 9.52513 7.19179C8.86875 7.84817 8.5 8.73841 8.5 9.66667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Education Details
                    </p>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.334 1.5V6.16667C12.334 6.47609 12.4569 6.77283 12.6757 6.99162C12.8945 7.21042 13.1912 7.33333 13.5007 7.33333H18.1673M12.334 1.5H4.16732C3.54848 1.5 2.95499 1.74583 2.5174 2.18342C2.07982 2.621 1.83398 3.21449 1.83398 3.83333V20.1667C1.83398 20.7855 2.07982 21.379 2.5174 21.8166C2.95499 22.2542 3.54848 22.5 4.16732 22.5H15.834C16.4528 22.5 17.0463 22.2542 17.4839 21.8166C17.9215 21.379 18.1673 20.7855 18.1673 20.1667V7.33333M12.334 1.5L18.1673 7.33333M6.50065 17.8333H13.5007M6.50065 13.1667H13.5007"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      My Experience
                    </p>
                  </div>
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 12H2.66667M12 1.5V2.66667M21.3333 12H22.5M4.53333 4.53333L5.35 5.35M19.4667 4.53333L18.65 5.35M9.31666 17.8333H14.6833M8.5 16.6667C7.52055 15.9321 6.79706 14.9079 6.432 13.7393C6.06695 12.5707 6.07885 11.3168 6.46601 10.1553C6.85318 8.99385 7.59597 7.98362 8.58919 7.26775C9.58241 6.55188 10.7757 6.16667 12 6.16667C13.2243 6.16667 14.4176 6.55188 15.4108 7.26775C16.404 7.98362 17.1468 8.99385 17.534 10.1553C17.9211 11.3168 17.933 12.5707 17.568 13.7393C17.2029 14.9079 16.4795 15.9321 15.5 16.6667C15.0445 17.1176 14.7015 17.6694 14.4988 18.2774C14.2962 18.8854 14.2395 19.5326 14.3333 20.1667C14.3333 20.7855 14.0875 21.379 13.6499 21.8166C13.2123 22.2542 12.6188 22.5 12 22.5C11.3812 22.5 10.7877 22.2542 10.3501 21.8166C9.9125 21.379 9.66667 20.7855 9.66667 20.1667C9.76053 19.5326 9.70383 18.8854 9.50115 18.2774C9.29847 17.6694 8.9555 17.1176 8.5 16.6667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Skill Set
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl flex-[3] h-full border py-16 px-8 border-[#2BA98B]/50 bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 w-full">
                <div>
                  <div className="flex gap-4 items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8539 6.14569C15.5417 5.83255 15.1606 5.59666 14.741 5.45683L13.3632 5.00939C13.257 4.97196 13.165 4.90253 13.1 4.81068C13.0349 4.71883 13 4.60908 13 4.49656C13 4.38404 13.0349 4.27429 13.1 4.18244C13.165 4.09058 13.257 4.02116 13.3632 3.98372L14.741 3.53628C15.1547 3.39352 15.5299 3.15705 15.837 2.84537C16.1357 2.54224 16.3623 2.17595 16.5 1.77372L16.5114 1.73963L16.9592 0.362894C16.9967 0.256782 17.0662 0.164895 17.1581 0.0998993C17.25 0.0349035 17.3598 0 17.4724 0C17.5851 0 17.6949 0.0349035 17.7868 0.0998993C17.8787 0.164895 17.9482 0.256782 17.9857 0.362894L18.4335 1.73963C18.5727 2.15819 18.8077 2.53853 19.1198 2.85041C19.432 3.1623 19.8126 3.39715 20.2315 3.53628L21.6093 3.98372L21.6368 3.99061C21.743 4.02804 21.835 4.09747 21.9 4.18932C21.9651 4.28117 22 4.39092 22 4.50344C22 4.61596 21.9651 4.72571 21.9 4.81756C21.835 4.90942 21.743 4.97884 21.6368 5.01628L20.259 5.46372C19.8402 5.60285 19.4595 5.8377 19.1474 6.14959C18.8353 6.46147 18.6003 6.84181 18.461 7.26037L18.0132 8.63711C17.9758 8.74322 17.9063 8.8351 17.8144 8.9001C17.7224 8.9651 17.6126 9 17.5 9C17.3874 9 17.2776 8.9651 17.1856 8.9001C17.0937 8.8351 17.0242 8.74322 16.9868 8.63711L16.539 7.26037C16.4007 6.84054 16.166 6.45883 15.8539 6.14569ZM23.7829 10.2132L23.0175 9.9646C22.7848 9.8873 22.5733 9.75683 22.3999 9.58356C22.2265 9.41029 22.0959 9.199 22.0186 8.96646L21.7698 8.20161C21.749 8.14266 21.7104 8.09161 21.6593 8.0555C21.6083 8.01939 21.5473 8 21.4847 8C21.4221 8 21.3611 8.01939 21.31 8.0555C21.259 8.09161 21.2204 8.14266 21.1996 8.20161L20.9508 8.96646C20.875 9.19736 20.7467 9.40761 20.5761 9.58076C20.4055 9.75392 20.1971 9.88529 19.9672 9.9646L19.2018 10.2132C19.1428 10.234 19.0917 10.2725 19.0555 10.3236C19.0194 10.3746 19 10.4356 19 10.4981C19 10.5606 19.0194 10.6216 19.0555 10.6726C19.0917 10.7236 19.1428 10.7622 19.2018 10.783L19.9672 11.0316C20.2003 11.1093 20.412 11.2403 20.5855 11.4143C20.7589 11.5882 20.8893 11.8003 20.9661 12.0335L21.2149 12.7984C21.2357 12.8573 21.2743 12.9084 21.3254 12.9445C21.3764 12.9806 21.4374 13 21.5 13C21.5626 13 21.6236 12.9806 21.6746 12.9445C21.7257 12.9084 21.7643 12.8573 21.7851 12.7984L22.0339 12.0335C22.1113 11.801 22.2418 11.5897 22.4152 11.4164C22.5886 11.2432 22.8001 11.1127 23.0328 11.0354L23.7982 10.7868C23.8572 10.766 23.9083 10.7275 23.9445 10.6764C23.9806 10.6254 24 10.5644 24 10.5019C24 10.4394 23.9806 10.3784 23.9445 10.3274C23.9083 10.2764 23.8572 10.2378 23.7982 10.217L23.7829 10.2132ZM5.25 3H13.0473C12.741 3.10986 12.4741 3.30783 12.28 3.56903C12.0984 3.83411 12.0008 4.14772 12 4.46903C12.001 4.78722 12.0986 5.09759 12.28 5.35903C12.4454 5.64387 12.6977 5.86818 13 5.99903L14.4 6.45903C14.6697 6.55049 14.9156 6.70079 15.12 6.89903L15.3 6.99903C15.4258 7.16549 15.5237 7.35123 15.59 7.54903L16 8.99903C16.1057 9.3085 16.3049 9.57754 16.57 9.76903C16.7025 9.86098 16.8477 9.93141 17 9.97863V14H21V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V5.25C3 4.00736 4.00736 3 5.25 3ZM17 19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V15.5H17V19.5ZM6.5 7.75C6.5 8.16421 6.83579 8.5 7.25 8.5H12.75C13.1642 8.5 13.5 8.16421 13.5 7.75C13.5 7.33579 13.1642 7 12.75 7H7.25C6.83579 7 6.5 7.33579 6.5 7.75ZM7.25 11C6.83579 11 6.5 11.3358 6.5 11.75C6.5 12.1642 6.83579 12.5 7.25 12.5H12.75C13.1642 12.5 13.5 12.1642 13.5 11.75C13.5 11.3358 13.1642 11 12.75 11H7.25ZM6.5 15.75C6.5 16.1642 6.83579 16.5 7.25 16.5H10.25C10.6642 16.5 11 16.1642 11 15.75C11 15.3358 10.6642 15 10.25 15H7.25C6.83579 15 6.5 15.3358 6.5 15.75Z"
                        fill="white"
                      />
                    </svg>
                    <p className="font-bold text-white text-2xl">My Wishlists</p>
                  </div>
                  <p className="text-xl text-white">
                    This is the comprehensive courses that might be good for you
                    for upskilling your coding journey check that out
                  </p>

                  <div className="mt-10 mb-4 text-white">
                    {wishListCourses.map((courseData: { intro_video: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; short_description: string; }) => (
                      <div className="max-w-[250px]" key={Math.random()}>
                        <iframe
                          className="rounded-xl w-full"
                          src={courseData?.intro_video}
                          title="How do we scale web applications?"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        <h2 className="text-white text-xl my-4 ">
                          {courseData?.title}
                        </h2>
                        <p className="text-sm text-white">
                          {courseData?.short_description.substring(0, 120)}
                        </p>
                      </div>
                    ))}
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
