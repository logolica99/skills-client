import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";

type Props = {};

// Types for contest data
interface ContestParticipant {
  participant_id: number;
  user_id: number;
  user_name: string;
  score: number;
  joining_date: string;
  is_current_user: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Contest {
  id: number;
  course_id: number;
  course_title?: string;
  title: string;
  description: string;
  contest_link: string;
  contest_video_link?: string;
  start_date: string;
  end_date: string;
  thumbnail_link: string;
  number_of_problems: string;
  contest_duration: string;
  facebook_group_link?: string;
  rules?: string[];
  faqs?: FAQ[];
}

interface LeaderboardResponse {
  success: boolean;
  data: ContestParticipant[];
  user_rank: number;
  contest_id: string;
  error?: string;
}

// Helper functions for time formatting
function epochToDateString(epochTime: any) {
  // Create a Date object from the epoch timestamp in milliseconds
  const date = new Date(epochTime);

  // Format the date string with day and month name (short format)
  const dateString = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  // Extract the day and month components (can be customized if needed)
  const day = dateString.split(", ")[0];
  const month = dateString.split(", ")[1];

  // Return the formatted string "DD Month"
  return `${day} `;
}

function epochToTimeString(epochTime: any, useTimeZone = true) {
  const date = new Date(epochTime);

  // Format the time string with hours, minutes, and optional AM/PM indicator
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let timeString = `${hours}:${minutes}`;

  // Handle 12-hour clock format with AM/PM indicator (if requested)
  if (useTimeZone) {
    const isAfternoon = hours >= 12;
    hours = isAfternoon ? (hours - 12 || 12) : hours || 12; // Convert to 12-hour format
    timeString = `${hours}:${minutes} ${isAfternoon ? "PM" : "AM"}`;
  }

  return timeString;
}

// Format date for display (Day, Month DD, YYYY)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Format time for display (HH:MM AM/PM)
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Determine contest status based on start and end dates
const getContestStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "completed";
};

export default function SingleContestPage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [contest, setContest] = useState<Contest | null>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [leaderboard, setLeaderboard] = useState<ContestParticipant[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [contestStatus, setContestStatus] = useState<"upcoming" | "ongoing" | "completed">("upcoming");
  const [activeTab, setActiveTab] = useState("details"); // details, leaderboard, faqs
  const [videoError, setVideoError] = useState(false);
  
  const router = useRouter();
  const { contesId } = router.query;

  // Calculate time left until contest starts or ends
  const calculateTimeLeft = () => {
    if (!contest) return;
    
    const now: any = new Date();
    const target: any = new Date(contest.start_date);
    const difference: any = target - now;

    // If contest already started, calculate time left until it ends
    if (difference <= 0) {
      const endTime: any = new Date(contest.end_date);
      const timeUntilEnd: any = endTime - now;
      
      if (timeUntilEnd <= 0) {
        // Contest has ended
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      
      const remainingDays = Math.floor(timeUntilEnd / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor(
        (timeUntilEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const remainingMinutes = Math.floor(
        (timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60),
      );
      const remainingSeconds = Math.floor((timeUntilEnd % (1000 * 60)) / 1000);

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
      return;
    }

    const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const remainingMinutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    setDays(remainingDays);
    setHours(remainingHours);
    setMinutes(remainingMinutes);
    setSeconds(remainingSeconds);
  };

  // Direct API calls using localStorage token
  useEffect(() => {
    if (!contesId) return;
    
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      setError("Please login to view contest details");
      setLoading(false);
      return;
    }
    
    console.log("Fetching contest details for ID:", contesId);
    setLoading(true);
    
    // Fetch contest details using localStorage token
    axios
      .get(`${BACKEND_URL}/user/contest/course/15`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Contest course response:", res.data);
        
        if (res.data.success) {
          const contestList = res.data.data;
          const currentContest = contestList.find(
            (c: Contest) => c.id === Number(contesId)
          );
          
          if (currentContest) {
            console.log("Found contest:", currentContest);
            setContest(currentContest);
            setContestStatus(getContestStatus(currentContest.start_date, currentContest.end_date));
            
            // Fetch leaderboard using localStorage token
            axios
              .get(`${BACKEND_URL}/user/contest/leaderboard/${contesId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((leaderboardRes) => {
                console.log("Leaderboard response:", leaderboardRes.data);
                
                if (leaderboardRes.data.success) {
                  setLeaderboard(leaderboardRes.data.data || []);
                  setUserRank(leaderboardRes.data.user_rank);
                  
                  // Fix: Empty array means user hasn't registered
                  const hasUserJoined = leaderboardRes.data.data && 
                                       leaderboardRes.data.data.length > 0 && 
                                       leaderboardRes.data.data.some(
                                         (p: ContestParticipant) => p.is_current_user
                                       );
                                       
                  console.log("Leaderboard data:", leaderboardRes.data.data);
                  console.log("User has joined contest:", hasUserJoined);
                  
                  // If the array is empty, the user hasn't registered yet
                  if (leaderboardRes.data.data.length === 0) {
                    console.log("Leaderboard is empty, user has not registered yet");
                    setHasJoined(false);
                  } else {
                    setHasJoined(hasUserJoined);
                  }
                  
                  console.log("Final hasJoined state:", hasUserJoined);
                }
              })
              .catch((err) => {
                console.log("Error fetching leaderboard:", err);
                setHasJoined(false);
              });
          } else {
            setError("Contest not found");
          }
        } else {
          setError(res.data.error || "Failed to fetch contest details");
        }
      })
      .catch((err) => {
        console.error("Error fetching contest details:", err);
        setError(err.response?.data?.error || "An error occurred while fetching contest details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contesId]);
  
  // Join contest function using localStorage token
  const joinContest = () => {
    if (!contesId) return;
    
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to join the contest");
      return;
    }
    
    console.log("Attempting to join contest:", contesId);
    setLoading(true);
    
    axios
      .post(`${BACKEND_URL}/user/contest/join/${contesId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Join contest response:", res.data);
        
        if (res.data.success) {
          if (res.data.data && res.data.data.length > 0) {
            console.log("Successfully registered for the contest");
            toast.success("আপনি সফলভাবে প্রতিযোগিতায় রেজিস্ট্রেশন করেছেন!");
          } else {
            console.log("User was already registered");
            toast.success("আপনি ইতিমধ্যে এই প্রতিযোগিতায় রেজিস্ট্রেশন করেছেন!");
          }
          setHasJoined(true);
          
          // Refresh leaderboard using localStorage token
          axios
            .get(`${BACKEND_URL}/user/contest/leaderboard/${contesId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((leaderboardRes) => {
              if (leaderboardRes.data.success) {
                console.log("Updated leaderboard after registration:", leaderboardRes.data);
                setLeaderboard(leaderboardRes.data.data);
                setUserRank(leaderboardRes.data.user_rank);
              }
            });
        } else {
          console.error("Join contest API returned success: false", res.data.error);
          toast.error(res.data.error || "প্রতিযোগিতায় যোগদান করতে ব্যর্থ হয়েছে");
        }
      })
      .catch((err) => {
        console.error("Error joining contest:", err);
        toast.error(err.response?.data?.error || "প্রতিযোগিতায় যোগদান করতে ব্যর্থ হয়েছে");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update countdown timer
  useEffect(() => {
    if (contest) {
      calculateTimeLeft();
      const intervalId = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(intervalId);
    }
  }, [contest]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className={`${HindSiliguri.variable} overflow-x-hidden font-hind`}>
          <Nav></Nav>
          <div className="overflow-x-hidden bg-white py-16 dark:bg-[#000000] min-h-screen">
            <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 flex justify-center items-center">
              <p className="text-heading dark:text-darkHeading">Loading contest details...</p>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className={`${HindSiliguri.variable} overflow-x-hidden font-hind`}>
          <Nav></Nav>
          <div className="overflow-x-hidden bg-white py-16 dark:bg-[#000000] min-h-screen">
            <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 flex justify-center items-center">
              <p className="text-heading dark:text-darkHeading">Error: {error}</p>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div
        className={`${HindSiliguri.variable} overflow-x-hidden font-hind`}
      >
        <Nav></Nav>
        <Toaster />
        <FloatingCompiler />

        <button
          style={{ zIndex: 999 }}
          onClick={() => {
            setUser({ ...user, openCompiler: true });
          }}
          className="fixed -left-2 top-80 border border-gray-200/20 bg-[#0B060D] bg-opacity-30 p-3 backdrop-blur-lg hover:bg-gray-300/20"
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
        <div className="overflow-x-hidden bg-white py-16 dark:bg-[#000000]">
          <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 lgXl:w-[90%]">
            <Link
              href={"/contests/lists"}
              className="flex items-center gap-4 mb-10"
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66797 9H20.3346M1.66797 9L9.66797 17M1.66797 9L9.66797 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-heading dark:text-darkHeading font-bold text-xl">
                Contest List
              </p>
            </Link>
            
            {contest && (
              <>
                {/* <div className="mb-10">
                  <img
                    className="lg:w-[40%] mx-auto rounded-lg"
                    src={contest.thumbnail_link}
                    alt={contest.title}
                  />
                </div> */}
                <div className="rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 relative z-30">
                  <div
                    className="rounded-xl h-full py-[.3px] backdrop-blur-xl bg-opacity-50"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255, 165, 0, 0.62) 0%, rgba(255, 165, 0, 0) 100%)",
                    }}
                  >
                    <div className="rounded-xl px-4 my-[1px] bg-[#221d13] relative left-[1px]">
                      <div className="flex justify-between items-center flex-col-reverse gap-4 lg:flex-row">
                        <div className="lg:py-6 lg:pl-10">
                          <p className="text-white font-bold text-3xl">
                            {contest.title}
                          </p>
                          <p className="my-4 text-lg text-darkHeading">
                            {contest.description}
                          </p>
                          {courseTitle && (
                            <p className="text-[#66F4D2] text-base mb-2 px-2 py-[1px] inline-block rounded-full bg-[#66F4D2]/10">
                              {courseTitle}
                            </p>
                          )}
                          <p className="text-base text-darkHeading">
                            আপনার সহ {leaderboard.length} জন শিক্ষার্থী এই প্রতিযোগিতায় রেজিস্ট্রেশন করেছে!
                          </p>
                          <div className="mt-4">
                            {!hasJoined ? (
                              <button
                                onClick={joinContest}
                                disabled={loading}
                                className="py-2 px-6 bg-[#F9AE39] text-white rounded-md hover:bg-[#e69d28] transition-all"
                              >
                                {loading ? "Processing..." : "প্রতিযোগিতায় রেজিস্ট্রেশন করুন"}
                              </button>
                            ) : (
                              <p className="text-green-500 font-semibold">
                                আপনি সফলভাবে এই প্রতিযোগিতায় রেজিস্ট্রেশন করেছেন
                              </p>
                            )}
                            {/* <div className="mt-4 text-sm">
                              <p>Debug Info (remove in production):</p>
                              <p>Contest ID: {contesId}</p>
                              <p>Contest Status: {contestStatus}</p>
                              <p>Has Joined: {hasJoined ? "Yes" : "No"}</p>
                              <p>Leaderboard Size: {leaderboard?.length || 0}</p>
                              <button 
                                onClick={() => console.log({
                                  contest,
                                  leaderboard,
                                  hasJoined,
                                  contestStatus
                                })} 
                                className="text-blue-500 underline"
                              >
                                Log State
                              </button>
                            </div> */}
                          </div>
                          <div className="flex justify-between items-center lg:mt-3 flex-col-reverse my-6 lg:mb-0 lg:flex-row">
                            <div>
                              {contestStatus === "upcoming" && !hasJoined && (
                                <button
                                  onClick={joinContest}
                                  className="bg-[#EB9E11] px-6 py-3 mt-4 text-white rounded-lg font-semibold block hover:opacity-70 ease-in-out duration-150"
                                >
                                  রেজিস্ট্রেশন করুন
                                </button>
                              )}
                              {hasJoined && contestStatus === "upcoming" && (
                                <p className="text-[#EB9E11] px-6 py-3 mt-4 font-semibold">
                                  আপনি রেজিস্ট্রেশন করেছেন!
                                </p>
                              )}
                              {contestStatus === "ongoing" && (
                                <a
                                  href={contest.contest_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#EB9E11] px-6 py-3 mt-4 text-white rounded-lg font-semibold block hover:opacity-70 ease-in-out duration-150"
                                >
                                  কন্টেস্টে যান
                                </a>
                              )}
                              {contestStatus === "completed" && (
                                <a
                                  href={contest.contest_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#EB9E11] px-6 py-3 mt-4 text-white rounded-lg font-semibold block hover:opacity-70 ease-in-out duration-150"
                                >
                                  রেজাল্ট দেখ
                                </a>
                              )}
                            </div>
                            <div className="mr-4">
                              <div className="flex justify-between text-base">
                                <p className="text-white">
                                  {contestStatus === "upcoming" ? "শুরু হতে বাকি" : 
                                   contestStatus === "ongoing" ? "শেষ হতে বাকি" : 
                                   "কন্টেস্ট শেষ হয়েছে"}
                                </p>
                                {contestStatus !== "completed" && (
                                  <div className="flex gap-2">
                                    <svg
                                      width="12"
                                      height="15"
                                      viewBox="0 0 12 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.66536 1.5V6.16667H10.6654L5.33203 13.5V8.83333H1.33203L6.66536 1.5Z"
                                        stroke="url(#paint0_linear_4530_4930)"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_4530_4930"
                                          x1="5.9987"
                                          y1="1.5"
                                          x2="5.9987"
                                          y2="13.5"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#CF8E16" />
                                          <stop offset="1" stop-color="#FFE49C" />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                    <p className="text-[#FDAF22]">{contestStatus === "upcoming" ? "প্রস্তুত হন" : "তারাতারি কর"}</p>
                                  </div>
                                )}
                              </div>
                              {contestStatus !== "completed" && (
                                <div className="flex gap-4">
                                  {days > 0 && (
                                    <div className="flex flex-col items-center">
                                      <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                        {days.toString().padStart(2, "0")}
                                      </p>
                                      <p className="mt-1">দিন</p>
                                    </div>
                                  )}
                                  <div className="flex flex-col items-center">
                                    <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                      {hours.toString().padStart(2, "0")}
                                    </p>
                                    <p className="mt-1">ঘন্টা</p>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                      {minutes.toString().padStart(2, "0")}
                                    </p>
                                    <p className="mt-1">মিনিট</p>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                      {seconds.toString().padStart(2, "0")}
                                    </p>
                                    <p className="mt-1">সেকেন্ড</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="max-w-[50%] flex items-center justify-center">
                          <img
                            src={contest.thumbnail_link ? contest.thumbnail_link : "/Frame 2147223443.png"}
                            alt={contest.title || ""}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-b border-gray-300/20">
                  <div className="flex">
                    <button
                      className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-[#66F4D2] text-white font-medium' : 'text-darkParagraph'}`}
                      onClick={() => setActiveTab('details')}
                    >
                      বিস্তারিত
                    </button>
                    <button
                      className={`px-4 py-2 ${activeTab === 'leaderboard' ? 'border-b-2 border-[#66F4D2] text-white font-medium' : 'text-darkParagraph'}`}
                      onClick={() => setActiveTab('leaderboard')}
                    >
                      লিডারবোর্ড
                    </button>
                    {contest.faqs && contest.faqs.length > 0 && (
                      <button
                        className={`px-4 py-2 ${activeTab === 'faqs' ? 'border-b-2 border-[#66F4D2] text-white font-medium' : 'text-darkParagraph'}`}
                        onClick={() => setActiveTab('faqs')}
                      >
                        FAQ
                      </button>
                    )}
                  </div>
                </div>
                
                {activeTab === 'details' && (
                  <div>
                    <div className="mt-20">
                      {/* Contest Details */}
                      <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                        প্রতিযোগিতার বিবরণ
                      </p>
                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-3">
                        <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.48438 8.00171H7.5167L8.50108 5.67524L9.48438 8.00171ZM0 2.75C0 1.23122 1.23122 0 2.75 0H19.25C20.7688 0 22 1.23122 22 2.75V11.5372C20.7381 10.5728 19.161 10 17.4502 10C14.9973 10 12.8195 11.1775 11.4511 12.9981L4.2251 12.9981C3.81088 12.9981 3.4751 13.3339 3.4751 13.7481C3.4751 14.1623 3.81089 14.4981 4.2251 14.4981L10.5751 14.4981C10.1732 15.4173 9.9502 16.4326 9.9502 17.5C9.9502 19.1884 10.5081 20.7465 11.4496 22H2.75C1.23122 22 0 20.7688 0 19.25V2.75ZM9.19229 3.45768C9.07498 3.18012 8.80294 2.99972 8.50161 2.99966C8.20028 2.99961 7.92817 3.1799 7.81075 3.45741L5.05924 9.96029C4.89783 10.3418 5.07622 10.7819 5.45769 10.9433C5.83916 11.1047 6.27926 10.9263 6.44066 10.5448L6.88202 9.50171H10.1184L10.5591 10.5445C10.7204 10.9261 11.1604 11.1046 11.5419 10.9434C11.9235 10.7821 12.102 10.3421 11.9408 9.96057L9.19229 3.45768ZM3.4751 17.7511C3.4751 18.1653 3.81088 18.5011 4.22509 18.5011L8.7505 18.5012C9.16471 18.5012 9.5005 18.1654 9.5005 17.7512C9.5005 17.3369 9.16472 17.0012 8.75051 17.0012L4.2251 17.0011C3.81089 17.0011 3.4751 17.3369 3.4751 17.7511ZM15.5 3.74991C15.5 3.3357 15.1642 2.99991 14.75 2.99991C14.3358 2.99991 14 3.3357 14 3.74991V5H12.7523C12.3381 5 12.0023 5.33579 12.0023 5.75C12.0023 6.16421 12.3381 6.5 12.7523 6.5H14V7.7476C14 8.16181 14.3358 8.4976 14.75 8.4976C15.1642 8.4976 15.5 8.16181 15.5 7.7476V6.5H16.75C17.1642 6.5 17.5 6.16421 17.5 5.75C17.5 5.33579 17.1642 5 16.75 5H15.5V3.74991ZM23.9502 17.5C23.9502 21.0899 21.04 24 17.4502 24C13.8603 24 10.9502 21.0899 10.9502 17.5C10.9502 13.9101 13.8603 11 17.4502 11C21.04 11 23.9502 13.9101 23.9502 17.5ZM17.9502 13.5C17.9502 13.2239 17.7263 13 17.4502 13C17.1741 13 16.9502 13.2239 16.9502 13.5V17H13.4502C13.1741 17 12.9502 17.2239 12.9502 17.5C12.9502 17.7761 13.1741 18 13.4502 18H16.9502V21.5C16.9502 21.7761 17.1741 22 17.4502 22C17.7263 22 17.9502 21.7761 17.9502 21.5V18H21.4502C21.7263 18 21.9502 17.7761 21.9502 17.5C21.9502 17.2239 21.7263 17 21.4502 17H17.9502V13.5Z"
                              fill="#D95344"
                            />
                          </svg>
                          <div>
                            <p className="text-paragraph dark:text-darkParagraph text-xl">
                              সমস্যার সংখ্যা
                            </p>
                            <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                              {contest.number_of_problems} টি
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5">
                          <svg
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.75 0.5C1.95507 0.5 0.5 1.95508 0.5 3.75V14.25C0.5 16.0449 1.95507 17.5 3.75 17.5H13.25C15.0449 17.5 16.5 16.0449 16.5 14.25V3.75C16.5 1.95507 15.0449 0.5 13.25 0.5H3.75ZM21.6232 15.6431L18 12.0935V5.99889L21.6121 2.3706C22.3988 1.58044 23.748 2.13753 23.748 3.25251V14.7502C23.748 15.8577 22.4143 16.4181 21.6232 15.6431Z"
                              fill="#B2F100"
                            />
                          </svg>

                          <div>
                            <p className="text-paragraph dark:text-darkParagraph text-xl">
                              সময়কাল
                            </p>
                            <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                              {contest.contest_duration} মিনিট
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.25 11.5H9.25C8.836 11.5 8.5 11.164 8.5 10.75V4.75C8.5 4.336 8.836 4 9.25 4C9.664 4 10 4.336 10 4.75V10H13.25C13.664 10 14 10.336 14 10.75C14 11.164 13.664 11.5 13.25 11.5ZM10 0C4.478 0 0 4.478 0 10C0 15.522 4.478 20 10 20C15.522 20 20 15.522 20 10C20 4.478 15.522 0 10 0Z"
                              fill="#2BA98B"
                            />
                          </svg>

                          <div>
                            <p className="text-paragraph dark:text-darkParagraph text-xl">
                              শেষ সময়সীমা
                            </p>
                            <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                              {formatDate(contest.end_date)}, {formatTime(contest.end_date)}
                            </p>
                          </div>
                        </div>
                        {contest.facebook_group_link && (
                          <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5">
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 10.3105C20 4.79055 15.52 0.310547 10 0.310547C4.48 0.310547 0 4.79055 0 10.3105C0 15.1505 3.44 19.1805 8 20.1105V13.3105H6V10.3105H8V7.81055C8 5.88055 9.57 4.31055 11.5 4.31055H14V7.31055H12C11.45 7.31055 11 7.76055 11 8.31055V10.3105H14V13.3105H11V20.2605C16.05 19.7605 20 15.5005 20 10.3105Z"
                                className="fill-black dark:fill-white"
                              />
                            </svg>
                            <div>
                              <p className="text-paragraph dark:text-darkParagraph text-xl">
                                ফেসবুক গ্রুপ
                              </p>
                              <a 
                                href={contest.facebook_group_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-heading dark:text-darkHeading font-bold text-2xl mt-1 hover:text-[#EB9E11]"
                              >
                                গ্রুপে যোগ দিন
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Contest Video */}
                      {contest.contest_video_link && 
                        contest.contest_video_link.trim() !== "" && 
                        (contest.contest_video_link.startsWith("http://") || 
                         contest.contest_video_link.startsWith("https://")) && (
                        <div className="mt-14">
                          <p className="text-2xl font-bold text-heading dark:text-darkHeading mb-5">
                            প্রতিযোগিতার ভিডিও
                          </p>
                          <div className="aspect-video w-full lg:w-2/3 mx-auto">
                            <iframe
                              className="w-full h-full rounded-lg"
                              src={contest.contest_video_link}
                              title="Contest Video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              loading="lazy"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}

                      {/* Contest Rules */}
                      {contest.rules && contest.rules.length > 0 && (
                        <div className="mt-10">
                          <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                            প্রতিযোগিতার নিয়ম
                          </p>
                          <div className="mt-3">
                            {contest.rules.map((rule, index) => (
                              <div key={index} className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                                <div className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]`}>
                                  <p className={`px-3 py-[2px] rounded-full font-bold text-xl bg-[#03614A]/[1] text-darkHeading`}>
                                    {index + 1}
                                  </p>
                                </div>
                                <p className="text-lg">{rule}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'leaderboard' && (
                  <div className="mt-10">
                    <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                      লিডারবোর্ড
                    </p>
                    
                    {leaderboard.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-darkParagraph">এখনও কোন অংশগ্রহণকারী নেই।</p>
                      </div>
                    ) : (
                      <>
                        {userRank && (
                          <div className="mb-6 p-4 bg-[#2BA98B]/20 rounded-lg">
                            <p className="text-white font-medium">আপনার র‍্যাংক: #{userRank}</p>
                          </div>
                        )}
                        
                        <div className="mt-6 overflow-x-auto">
                          <table className="min-w-full bg-white/5 border border-gray-300/10 rounded-lg">
                            <thead>
                              <tr className="bg-gray-300/10 border-b border-gray-300/10 text-left">
                                <th className="px-6 py-3 text-heading dark:text-darkHeading">র‍্যাংক</th>
                                <th className="px-6 py-3 text-heading dark:text-darkHeading">অংশগ্রহণকারী</th>
                                <th className="px-6 py-3 text-heading dark:text-darkHeading text-right">স্কোর</th>
                                <th className="px-6 py-3 text-heading dark:text-darkHeading text-right">যোগদান তারিখ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {leaderboard.map((participant, index) => (
                                <tr 
                                  key={participant.participant_id}
                                  className={`border-b border-gray-300/10 ${participant.is_current_user ? 'bg-[#EB9E11]/10' : ''}`}
                                >
                                  <td className="px-6 py-4 text-paragraph dark:text-darkParagraph">
                                    {index + 1}
                                  </td>
                                  <td className="px-6 py-4 font-medium text-paragraph dark:text-darkParagraph">
                                    {participant.user_name}
                                    {participant.is_current_user && <span className="ml-2 text-[#EB9E11]">(আপনি)</span>}
                                  </td>
                                  <td className="px-6 py-4 text-paragraph dark:text-darkParagraph text-right">
                                    {participant.score}
                                  </td>
                                  <td className="px-6 py-4 text-paragraph dark:text-darkParagraph text-right">
                                    {formatDate(participant.joining_date)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {activeTab === 'faqs' && contest.faqs && contest.faqs.length > 0 && (
                  <div className="mt-10">
                    <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                      FAQ
                    </p>
                    {contest.faqs.map((faq, index) => (
                      <div key={index} className="bg-white/[.1] rounded-lg p-5 mt-6">
                        <p className="text-heading dark:text-darkHeading text-lg font-bold">
                          {faq.question}
                        </p>
                        <p className="text-paragraph dark:text-darkParagraph text-lg mt-2">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}