import React, { useContext, useEffect, useState } from "react";

type Props = {};

import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/pages";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
      <div className={`  ${HindSiliguri.variable} font-hind  `}>
        <Nav></Nav>
        <Toaster />
        <div className="py-16 bg-[#0B060D] overflow-x-hidden">
          <div className="w-[90%] lgXl:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
            <p className="text-3xl font-semibold text-heading mb-7">
              Course Rankings
            </p>
            <div className="border rounded border-gray-400">
              <div
                className={`flex justify-between text-heading text-3xl font-semibold bg-slate-800 mb-4 px-4 py-2 rounded }`}
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
              {positions?.allPositions?.map((position: any, index: number) => (
                <div
                  key={Math.random()}
                  className={`flex justify-between text-heading text-2xl my-4 px-4 py-2 rounded ${
                    index + 1 == positions.myPosition ? "bg-gray-800" : ""
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
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0F0812] z-30 relative">
          <div className="w-[90%] lg:w-[80%] mx-auto  text-heading py-20 ">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center">
              <div className="mb-20 lg:mb-0 z-10">
                <img src="/logo.jpg" alt="" className="w-28 " />
                <div className="text-paragraph mt-8">
                  <p>© WARP 2023</p>
                  <p>169 Madison Ave, #2298</p>
                  <p>New York City, NY 10016</p>
                </div>
              </div>

              <div className="flex gap-20 text-lg text-paragraph flex-col lg:flex-row z-10">
                <div className="flex flex-col gap-4 ">
                  <Link href="" className="hover:text-white">
                    নোটিফিকেশান
                  </Link>
                  <Link href="" className="hover:text-white">
                    লাইফ ক্লাস শিডিউল
                  </Link>
                  <Link href="" className="hover:text-white">
                    কোস কন্টেন্ট
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="" className="hover:text-white">
                    নোটিফিকেশান
                  </Link>
                  <Link href="" className="hover:text-white">
                    লাইফ ক্লাস শিডিউল
                  </Link>
                  <Link href="" className="hover:text-white">
                    কোস কন্টেন্ট
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
