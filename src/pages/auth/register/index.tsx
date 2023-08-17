import Nav from "@/components/Nav";
import React, { useState, useContext, useEffect } from "react";
import { HindSiliguri } from "@/pages";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";
import { UserContext } from "@/Contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/helpers";

type Props = {};

export default function RegisterPage({}: Props) {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [user, setUser] = useContext<any>(UserContext);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setUser({ ...user, loading: true });
    axios
      .post(BACKEND_URL + "/admin/auth/register", {
        login: userData.email,
        password: userData.password,
        name: userData.name,
        type: 3,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser({ ...user, loading: false });
        router.push("/course-details/12");
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/course-details/12");
    }
  }, []);

  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <div className="pt-20  bg-[#0B060D] overflow-x-hidden min-h-[100vh] relative">
        <svg
          className="absolute h-full w-full z-0 -top-20"
          viewBox="0 0 1215 926"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_748_4329)">
            <ellipse
              cx="549.662"
              cy="328.453"
              rx="167.107"
              ry="94.0796"
              transform="rotate(-10.6934 549.662 328.453)"
              fill="#B153E0"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_748_4329"
              x="-115.482"
              y="-269.081"
              width="1330.29"
              height="1195.07"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="250"
                result="effect1_foregroundBlur_748_4329"
              />
            </filter>
          </defs>
        </svg>

        <div className="w-[90%] lg:w-[80%] mx-auto py-16 z-20">
          <form
            className="px-8 py-6 text-heading bg-gray-100/5  backdrop-blur-xl rounded-xl  lg:w-[50%] mx-auto flex flex-col items-center  gap-4"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold">Register</h2>
            <div className="w-full">
              <p className="text-lg font-semibold mb-1">Name</p>
              <input
                className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                placeholder="Name"
                value={userData.name}
                required
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-semibold mb-1">Email</p>
              <input
                className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                placeholder="Email"
                value={userData.email}
                type="email"
                required
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-semibold mb-1">Password</p>
              <input
                className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                placeholder="Password"
                value={userData.password}
                type="password"
                required
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />

              <div className="flex font-semibold gap-2 mt-3">
                <p>Already have an account? </p>
                <Link
                  href="/auth/login"
                  className="text-purple hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="py-2 px-8 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white text-lg "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
