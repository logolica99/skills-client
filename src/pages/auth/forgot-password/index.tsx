import Nav from "@/components/Nav";
import React, { useState, useContext, useEffect } from "react";
import { HindSiliguri } from "@/helpers";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";
import { UserContext } from "@/Contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeFirstWord, isLoggedIn } from "@/helpers";
import Button from "@/components/Button";
import bcrypt from "bcryptjs-react";

type Props = {};

export default function ForgotPasswordPage({}: Props) {
  const [userData, setUserData] = useState<{
    phone: any;
    otp: any;
    password: any;
    confirmPass: any;
  }>({
    phone: "",
    otp: "",
    password: "",
    confirmPass: "",
  });

  const [user, setUser] = useContext<any>(UserContext);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [otpHash, setOtpHash] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSubmitButtonLoading(true);

    if (userData.otp.length > 0) {
      if (!isPhoneVerified) {
        const compareOtp = bcrypt.compareSync(userData.otp, otpHash);
        if (compareOtp) {
          setIsPhoneVerified(true);
          setSubmitButtonLoading(false);

          setErrorMsg("");
        } else {
          setErrorMsg("Wrong OTP!");
          setSubmitButtonLoading(false);
        }
      } else {
        if (userData.password === userData.confirmPass) {
          axios
            .put(BACKEND_URL + "/admin/auth/change-password", {
              phone: userData.phone,
              password: userData.password,
            })
            .then((res) => {
              setSubmitButtonLoading(false);

              setErrorMsg("");
              router.push("/auth/login");
            })
            .catch((err) => {
              setSubmitButtonLoading(false);
            });
        } else {
          setErrorMsg("The Passwords Must Match!");
          setSubmitButtonLoading(false);
        }
      }
    } else {
      axios
        .get(BACKEND_URL + "/admin/auth/otp-forgot/" + userData.phone)
        .then((res) => {
          setSubmitButtonLoading(false);
          setOtpHash(res.data.data.otp);
          setShowOtp(true);
          setErrorMsg("");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.data);
          setSubmitButtonLoading(false);
        });
    }
    // setUser({ ...user, loading: true });
    // axios
    //   .post(BACKEND_URL + "/admin/auth/login", {
    //     login: userData.email,
    //     password: userData.password,
    //   })
    //   .then((res) => {
    //     localStorage.setItem("token", res.data.token);
    //     setUser({ ...user, loading: false });
    //     setErrorMsg("");
    //     router.push("/course-details/12");
    //   })
    //   .catch((err) => {
    //     setUser({ ...user, loading: false });

    //     setErrorMsg(capitalizeFirstWord(err.response.data.error));
    //   });
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
            onSubmit={submitHandler}
            className="px-8 py-6 text-heading dark:text-darkHeading bg-gray-100/5 backdrop-blur-xl rounded-xl  lg:w-[50%] mx-auto flex flex-col items-center  gap-4"
          >
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <div className="w-full">
              <p className="text-lg font-semibold mb-1">Phone Number</p>
              <input
                className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                placeholder="Phone Number"
                value={userData.phone}
                required
                type="number"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
            {/* <div className="w-full">
              <p className="text-lg font-semibold mb-1">Password</p>
              <input
                className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                placeholder="Password"
                value={userData.password}
                required
                type="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
             
              <div className="flex font-semibold gap-2 mt-3">
                <p>Don{"'"}t have an account? </p>
                <Link
                  href="/auth/register"
                  className="text-purple hover:underline"
                >
                  Register
                </Link>
              </div>
            </div> */}{" "}
            {showOtp && (
              <div className="w-full">
                <p className="text-green-400">OTP sent to your Phone Number</p>
                <p className="text-lg font-semibold mb-1 mt-1">Enter OTP</p>
                <input
                  className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                  placeholder="OTP"
                  value={userData.otp}
                  type="number"
                  required
                  onChange={(e) =>
                    setUserData({ ...userData, otp: e.target.value })
                  }
                />
              </div>
            )}
            {isPhoneVerified && (
              <div className="w-full">
                <p className="text-lg font-semibold mb-1">Password</p>
                <input
                  className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                  placeholder="Password"
                  value={userData.password}
                  required
                  type="password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
            )}
            {isPhoneVerified && (
              <div className="w-full">
                <p className="text-lg font-semibold mb-1">Confirm Password</p>
                <input
                  className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                  placeholder="Confirm Password"
                  value={userData.confirmPass}
                  required
                  type="password"
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPass: e.target.value })
                  }
                />
              </div>
            )}
            <div className="w-full">
              <div className="flex font-semibold gap-2 mt-2">
                <Link
                  href="/auth/login"
                  className="text-purple hover:underline"
                >
                  Return to login page
                </Link>
              </div>
            </div>
            {errorMsg.length > 0 && <p className="text-red-500">{errorMsg}</p>}
            <div className="mt-4">
              <Button
                type="submit"
                loading={submitButtonLoading}
                bgColor={"#532e62"}
                label="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
