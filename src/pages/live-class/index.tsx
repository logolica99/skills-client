import Nav from "@/components/Nav";
import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { HindSiliguri } from "..";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { BACKEND_URL, COURSE_ID } from "@/api.config";

type Props = {};

export default function index({}: Props) {
  const [user, setUser] = useContext(UserContext);

  const [liveClasses, setLiveClasses] = useState<any>([]);

  const fetchClasses = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/live/list/" + COURSE_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setLiveClasses(res.data.data);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <Toaster />
      <div>
        {liveClasses.map((liveClass: any) => (
          <div className="p-40 ">
          <p>{liveClass.title}</p>  
            <button className="p-4 bg-red-400">Click Me</button>
          </div>
        ))}
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
  );
}
