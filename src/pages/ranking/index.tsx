import React, { useContext, useEffect, useState } from "react";

type Props = {};

import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";

export default function Ranking({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);

  const [positions, setPositions] = useState<any>({});

  const fetchRanking = () => {
    const token = localStorage.getItem("token");
    setUser({ ...user, loading: true });
    axios
      .get(BACKEND_URL + `/user/course/getRanking/${COURSE_ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPositions(res.data.data);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <ProtectedRoute>
      <div
        className={`  ${HindSiliguri.variable} font-hind   overflow-x-hidden`}
      >
        <Nav></Nav>
        <Toaster />
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
          <div className="w-[90%] lgXl:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
            <p className="text-3xl font-semibold text-heading dark:text-darkHeading mb-7">
              Course Rankings
            </p>
            <div className="overflow-x-scroll">
              <div className="border rounded border-gray-400 min-w-[700px] ">
                <div
                  className={`flex justify-between items-center text-heading dark:text-darkHeading text-lg md:text-xl lg:text-3xl md:font-semibold bg-slate-200 dark:bg-slate-800 mb-4 px-4 py-2 rounded }`}
                >
                  <div className="flex-1 flex justify-center">
                    <p>Position</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p> Name</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p>Score</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p>Codeforces Account</p>
                  </div>
                </div>
                {positions?.allPositions?.map(
                  (position: any, index: number) => (
                    <div
                      key={Math.random()}
                      className={`flex justify-between text-heading dark:text-darkHeading text-2xl my-4 px-4 py-2 rounded ${
                        index + 1 == positions.myPosition ? "bg-gray-200" : ""
                      }`}
                    >
                      <div className="flex-1 flex justify-center">
                        <p>{index + 1}</p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <p> {position.name}</p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <p>{position.score}</p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <a
                          target="_blank"
                          className="underline"
                          href={`https://codeforces.com/profile/${position.cf_handle}`}
                        >
                          {position.cf_handle}
                        </a>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
