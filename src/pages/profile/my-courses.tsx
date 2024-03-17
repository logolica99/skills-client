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
import ProfileLayout from "@/components/ProfileLayout";

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
    <ProfileLayout>
      <div className="rounded-xl flex-[3] h-full  py-16 px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 w-full">
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
            This is the comprehensive courses that might be good for you for
            upskilling your coding journey check that out
          </p>

          <div className="mt-10 mb-4 text-white">
            {wishListCourses.map(
              (courseData: {
                intro_video: string | undefined;
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                short_description: string;
              }) => (
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
              ),
            )}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
