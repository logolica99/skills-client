import Nav from "@/components/Nav";
import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { HindSiliguri } from "..";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import { convertUnixTimestamp } from "@/helpers";

type Props = {};

export default function index({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);

  const [liveClasses, setLiveClasses] = useState<any>({});
  const [isMeeting, setMeeting] = useState(false);

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
        setLiveClasses(res.data.data);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  const submitInterested = (id: any) => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");

    axios
      .post(
        BACKEND_URL + `/user/live/interest/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        fetchClasses();
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const initiateMeeting = async (config: any) => {
    var ZoomMtg = await (await import("@zoomus/websdk/index")).ZoomMtg;

    //console.log(ZoomMtg)

    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.16.0/lib", "/av");

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load("en-US");
    ZoomMtg.i18n.reload("en-US");

    const zmmtgRoot = window.document.getElementById("zmmtg-root");
    if (zmmtgRoot) {
      zmmtgRoot.style.display = "block";
    }

    ZoomMtg.init({
      leaveUrl: config.leaveUrl,
      success: (success: any) => {
        console.log(success);
        setUser({ ...user, loading: false });
        setMeeting(true);
        ZoomMtg.join({
          signature: config.signature,
          sdkKey: config.sdkKey,
          meetingNumber: config.meetingNumber,
          passWord: config.passWord,
          userName: config.userName,
          userEmail: config.userEmail,
          tk: config.registrantToken,
          zak: config.zakToken,
          success: (success: any) => {
            console.log(success);
            setUser({ ...user, loading: false });
          },
          error: (error: any) => {
            console.log(error);
            setUser({ ...user, loading: false });
          },
        });
      },
      error: (error: any) => {
        console.log(error);
        setUser({ ...user, loading: false });
      },
    });
  };

  const fetchMeetingProps = (liveId: any) => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/meeting/getMeetingProps/" + liveId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        initiateMeeting(res.data.data);
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  if (isMeeting) return <div />;

  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <Toaster />
      <div>
        {/* {liveClasses?.map((liveClass: any) => (
          <div className="p-40 ">
            <p>{liveClass.title}</p>
            <button
              className="p-4 bg-red-400"
              onClick={() => {
                fetchMeetingProps(liveClass.id);
              }}
            >
              Click Me
            </button>
          </div>
        ))} */}
      </div>

      <div className="pt-20  bg-[#0B060D] overflow-x-hidden">
        <div className="w-[90%] lg:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
          <p className="text-heading text-4xl font-bold mb-4">Live Classes</p>
          <div className="flex  flex-wrap gap-8 justify-center md:justify-start">
            {liveClasses?.list?.map((liveClass: any) => {
              if (liveClass.scheduled_at <= liveClasses.serverTimeStamp) {
                return (
                  <div
                    className={`p-4 pb-6 max-w-[332px] text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl rounded-b-none 
               `}
                  >
                    <img
                      src={liveClass.thumbnail}
                      className="max-w-[300px] rounded"
                    />
                    <p className="text-heading text-2xl font-bold mt-4 my-2">
                      {liveClass.title}
                    </p>
                    <p className="text-paragraph">
                      {" "}
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)}
                    </p>
                    <p className="text-paragraph">{liveClass.duration}</p>

                    <div>
                      <button
                        onClick={() => {
                          fetchMeetingProps(liveClass.id);
                        }}
                        className={`py-2  flex gap-2 items-center mt-5 px-6 
                   rounded font-semibold text-white text-lg
                   bg-green-500 hover:opacity-75 cursor-pointer ease-in-out duration-150  focus:ring ring-gray-300/80 
                  `}
                      >
                        Join Class
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <p className="text-heading text-4xl font-bold mb-4 mt-12">
            Upcoming Live Classes
          </p>
          <div className="flex  flex-wrap gap-8 justify-center md:justify-start">
            {liveClasses?.list?.map((liveClass: any) => {
              if (liveClass.scheduled_at > liveClasses.serverTimeStamp) {
                return (
                  <div
                    className={`p-4 pb-6 max-w-[332px] text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl rounded-b-none
               `}
                  >
                    <img
                      src={liveClass.thumbnail}
                      className="max-w-[300px] rounded"
                    />
                    <p className="text-heading text-2xl font-bold mt-4 my-2">
                      {liveClass.title}
                    </p>
                    <p className="text-paragraph">
                      {" "}
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)}
                    </p>
                    <p className="text-paragraph">{liveClass.duration}</p>

                    <div>
                      <button
                        onClick={() => {
                          submitInterested(liveClass.id);
                        }}
                        className={`py-2  flex gap-2 items-center mt-5 px-6 
                   rounded font-semibold text-white text-lg
                   ${
                     liveClass.interested
                       ? "bg-gray-600 cursor-not-allowed opacity-60"
                       : "bg-green-500 hover:opacity-75 cursor-pointer ease-in-out duration-150  focus:ring ring-gray-300/80 "
                   }
                  `}
                        disabled={liveClass.interested}
                      >
                        Interested
                      </button>
                    </div>
                  </div>
                );
              }
            })}
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
  );
}
