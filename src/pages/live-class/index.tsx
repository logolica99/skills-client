import Nav from "@/components/Nav";
import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { HindSiliguri } from "@/helpers";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import { convertUnixTimestamp } from "@/helpers";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";

type Props = {};

export default function LiveClass({}: Props) {
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

      <div className="pt-20  bg-white dark:bg-[#0B060D] overflow-x-hidden">
        <div className="w-[90%] lg:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
          <p className="text-heading dark:text-darkHeading text-4xl font-bold mb-4">
            Live Classes
          </p>
          <div className="flex  flex-wrap gap-8 justify-center md:justify-start">
            {liveClasses?.list?.map((liveClass: any) => {
              if (liveClass.scheduled_at <= liveClasses.serverTimeStamp) {
                return (
                  <div
                    key={Math.random()}
                    className={`p-4 pb-6 max-w-[332px] text-heading dark:text-darkHeading bg-gray-300/40 dark:bg-gray-100/5 backdrop-blur-xl rounded-xl rounded-b-none 
               `}
                  >
                    <img
                      src={liveClass.thumbnail}
                      className="max-w-[300px] rounded"
                    />
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold mt-4 my-2">
                      {liveClass.title}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph">
                      {" "}
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph">
                      {liveClass.duration}
                    </p>

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
          <p className="text-heading dark:text-darkHeading text-4xl font-bold mb-4 mt-12">
            Upcoming Live Classes
          </p>
          <div className="flex  flex-wrap gap-8 justify-center md:justify-start">
            {liveClasses?.list?.map((liveClass: any) => {
              if (liveClass.scheduled_at > liveClasses.serverTimeStamp) {
                return (
                  <div
                    key={Math.random()}
                    className={`p-4 pb-6 max-w-[332px] text-heading dark:text-darkHeading bg-gray-100/5 backdrop-blur-xl rounded-xl rounded-b-none
               `}
                  >
                    <img
                      src={liveClass.thumbnail}
                      className="max-w-[300px] rounded"
                    />
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold mt-4 my-2">
                      {liveClass.title}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph">
                      {" "}
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph">
                      {liveClass.duration}
                    </p>

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
      <Footer />
    </div>
  );
}
