import React, { useContext, useEffect, useState } from "react";
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

type Props = {};

// Types for contest data
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
  thumbnail_link: string | null;
  number_of_problems: string;
  contest_duration: string;
  facebook_group_link?: string;
  rules?: string[];
  faqs?: { question: string; answer: string }[];
  user_score?: number;
  joining_date?: string;
  isParticipated?: boolean;
}

interface Course {
  id: number;
  title: string;
}

function epochToDateString(epochTime: any) {
  // Create a Date object from the epoch timestamp in milliseconds
  const date = new Date(epochTime * 1000);

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
  const date = new Date(epochTime * 1000);

  // Format the time string with hours, minutes, and optional AM/PM indicator
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let timeString = `${hours}:${minutes}`;

  // Handle 12-hour clock format with AM/PM indicator (if requested)
  if (useTimeZone) {
    const isAfternoon = hours >= 12;
    hours = isAfternoon ? (hours - 12) % 12 : hours % 12; // Convert to 12-hour format
    timeString = `${timeString} ${isAfternoon ? "PM" : "AM"}`;
  }

  return timeString;
}

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Format time for display
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

export default function ContestListPage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [upcomingContests, setUpcomingContests] = useState<Contest[]>([]);
  const [ongoingContests, setOngoingContests] = useState<Contest[]>([]);
  const [completedContests, setCompletedContests] = useState<Contest[]>([]);
  const [myContests, setMyContests] = useState<Contest[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch user's enrolled courses
  const getUserCourses = () => {
    const token =localStorage.getItem('token')
    if(!token) return

    setLoading(true);
    axios
      .get(`${BACKEND_URL}/user/course/getMyCourses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllCourses(res.data.data);
        
        // After getting courses, fetch contests for each course
        const courses = res.data.data;
        if (courses.length > 0) {
          fetchContestsForCourses(courses);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch enrolled courses");
        toast.error("Failed to fetch enrolled courses");
      });
  };
  
  // Fetch contests for all user's enrolled courses
  const fetchContestsForCourses = async (courses: Course[]) => {
    
    const token =localStorage.getItem('token')
    if(!token) return

    try {
      const participatedContests = await getParticipatedContests(user.token);
      
      let allContests: Contest[] = [];
      
      // For each course, get contests
      for (const course of courses) {
        const response = await axios.get(
          `${BACKEND_URL}/user/contest/course/${course.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.success && response.data.data.length > 0) {
          // Add course title to each contest
          const courseContests = response.data.data.map((contest: Contest) => ({
            ...contest,
            course_title: course.title,
            // Check if user has participated in this contest
            isParticipated: participatedContests.some(
              (pc: Contest) => pc.id === contest.id
            ),
          }));
          
          allContests = [...allContests, ...courseContests];
        }
      }
      
      // Sort and categorize contests
      const upcoming: Contest[] = [];
      const ongoing: Contest[] = [];
      const completed: Contest[] = [];
      
      allContests.forEach((contest: Contest) => {
        const status = getContestStatus(contest.start_date, contest.end_date);
        if (status === "upcoming") upcoming.push(contest);
        else if (status === "ongoing") ongoing.push(contest);
        else completed.push(contest);
      });
      
      setUpcomingContests(upcoming);
      setOngoingContests(ongoing);
      setCompletedContests(completed);
      setMyContests(participatedContests);
      
    } catch (err: any) {
      setError("Failed to fetch contests");
      toast.error("Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  // Get contests the user has participated in
  const getParticipatedContests = async (token: string): Promise<Contest[]> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/contest/my-contests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data.success ? response.data.data : [];
    } catch (err) {
      console.error("Error fetching participated contests:", err);
      return [];
    }
  };
  
  // Direct API calls in useEffect
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      setError("Please login to view contests");
      setLoading(false);
      return;
    }
    
    console.log("Fetching contests data...");
    setLoading(true);
    
    // Fetch my participated contests using localStorage token
    const fetchMyContests = axios.get(`${BACKEND_URL}/user/contest/my-contests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Fetch course contests using localStorage token
    const fetchCourseContests = axios.get(`${BACKEND_URL}/user/contest/course/15`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Execute both requests in parallel
    Promise.all([fetchMyContests, fetchCourseContests])
      .then(([myContestsRes, courseContestsRes]) => {
        console.log("API responses received:", myContestsRes.data, courseContestsRes.data);
        
        // Process my contests
        if (myContestsRes.data.success) {
          setMyContests(myContestsRes.data.data);
        }
        
        // Process course contests
        if (courseContestsRes.data.success) {
          const contests = courseContestsRes.data.data;
          
          // Sort and categorize contests
          const upcoming: Contest[] = [];
          const ongoing: Contest[] = [];
          const completed: Contest[] = [];
          
          contests.forEach((contest: Contest) => {
            const status = getContestStatus(contest.start_date, contest.end_date);
            if (status === "upcoming") upcoming.push(contest);
            else if (status === "ongoing") ongoing.push(contest);
            else completed.push(contest);
          });
          
          setUpcomingContests(upcoming);
          setOngoingContests(ongoing);
          setCompletedContests(completed);
        } else {
          setError(courseContestsRes.data.error || "Failed to fetch contests");
        }
      })
      .catch((err) => {
        console.error("Error fetching contests:", err);
        setError("Failed to fetch contests");
        toast.error("Failed to fetch contests");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  // Join contest function
  const joinContest = (contestId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to join the contest");
      return;
    }

    console.log("Joining contest:", contestId);
    
    axios
      .post(`${BACKEND_URL}/user/contest/join/${contestId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Join contest response:", res.data);
        
        if (res.data.success) {
          toast.success("Successfully registered for the contest!");
          // Update the contests lists
          setUpcomingContests(prevContests => 
            prevContests.map(contest => 
              contest.id === contestId 
                ? { ...contest, isParticipated: true } 
                : contest
            )
          );
          
          // Refresh my contests using localStorage token
          axios
            .get(`${BACKEND_URL}/user/contest/my-contests`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.data.success) {
                setMyContests(res.data.data);
              }
            });
        }
      })
      .catch((err) => {
        console.error("Error joining contest:", err);
        toast.error(err.response?.data?.error || "Failed to register for the contest");
      });
  };

  return (
    <ProtectedRoute>
      <div className={`${HindSiliguri.variable} overflow-x-hidden font-hind`}>
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
            <div className="rounded-lg flex-[3] bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 relative z-30">
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
                        কোডিং প্রতিযোগিতায় অংশগ্রহণ করে {" "}
                        <br className="hidden lg:block" />
                        <span className="text-[#EB9E11]">
                          উপহার এবং গুডি পাওয়ার{" "}
                        </span>{" "}
                        সুযোগ জিতে নাও!
                      </p>
                      <p className="my-4 text-lg text-white">
                        অন্যান্য অংশগ্রহণকারীদের সাথে প্রতিযোগিতা করে তোমার
                        দক্ষতা মূল্যায়ন করো
                      </p>
                      <p className="text-sm text-white">
                        তোমার মত আরো অনেক শিক্ষার্থী এই প্রতিযোগিতায় অংশগ্রহণ করছে!{" "}
                      </p>
                    </div>
                    <div>
                      <img
                        src="/Frame 2147223443.png"
                        alt=""
                        className="h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-heading dark:text-darkHeading">Loading contests...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-heading dark:text-darkHeading text-red-500">{error}</p>
              </div>
            ) : (
              <div className="mt-10">
                {myContests.length > 0 && (
            <div>
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold">
                      আমার প্রতিযোগিতাসমূহ
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myContests.map((contest) => (
                        <Link
                          href={`/contests/${contest.id}`}
                          key={contest.id}
                          className="block hover:bg-gray-300/5 bg-gray-300/10 rounded-lg border border-[#2BA98B]/50 overflow-hidden"
                        >
                          {contest.thumbnail_link && (
                            <img
                              src={contest.thumbnail_link}
                              alt={contest.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-4">
                            <h3 className="text-xl font-bold text-heading dark:text-darkHeading mb-2">{contest.title}</h3>
                            <p className="text-paragraph dark:text-darkParagraph mb-3">{contest.description}</p>
                            <div className="flex items-center text-sm text-paragraph dark:text-darkParagraph">
                              <span className="bg-[#2BA98B]/20 text-[#2BA98B] dark:text-[#66F4D2] px-2 py-1 rounded">
                                স্কোর: {contest.user_score}
                              </span>
                              <span className="ml-auto">
                                {formatDate(contest.joining_date || '')}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {ongoingContests.length > 0 && (
                  <div className="mt-10">
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold">
                      চলমান প্রতিযোগিতা
                    </p>
                    <div className="mt-4 space-y-6">
                      {ongoingContests.map((contest) => (
              <Link
                          href={`/contests/${contest.id}`}
                          className="block hover:bg-gray-300/5 bg-gray-300/10 p-4 rounded-lg border border-[#2BA98B]/50"
                          key={contest.id}
              >
                <div className="flex flex-col lgXl:flex-row items-center gap-6">
                {contest.thumbnail_link && (
                            <img
                              src={contest.thumbnail_link}
                              alt={contest.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                  <div className="flex-1">
                              <h2 className="text-2xl mt-3 mb-1 text-heading dark:text-darkHeading">
                                {contest.title}
                    </h2>
                              <p className="text-paragraph dark:text-darkParagraph">
                                {contest.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                                <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.number_of_problems} প্রবলেম
                                </p>
                                <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.contest_duration} মিনিট
                                </p>
                                {contest.course_title && (
                                  <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                    {contest.course_title}
                                  </p>
                                )}
                    </div>
                    <div className="flex w-full flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                                <div className="flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="4"
                                      className="fill-black dark:fill-[#EFF5F3]"
                            fill-opacity="0.05"
                          />
                          <path
                            d="M4 17.6C4 18.96 5.04 20 6.4 20H17.6C18.96 20 20 18.96 20 17.6V11.2H4V17.6ZM17.6 5.6H16V4.8C16 4.32 15.68 4 15.2 4C14.72 4 14.4 4.32 14.4 4.8V5.6H9.6V4.8C9.6 4.32 9.28 4 8.8 4C8.32 4 8 4.32 8 4.8V5.6H6.4C5.04 5.6 4 6.64 4 8V9.6H20V8C20 6.64 18.96 5.6 17.6 5.6Z"
                            className="fill-black dark:fill-white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                                    শেষ হবে: {formatDate(contest.end_date)}, {formatTime(contest.end_date)}
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={contest.contest_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      window.open(contest.contest_link, "_blank");
                                    }}
                                    className="flex items-center gap-4 border font-bold bg-[#2BA98B] border-gray-600 dark:border-gray-300/20 py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out"
                                  >
                                    <p className="text-heading dark:text-darkHeading">
                                      কন্টেস্টে যান
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {upcomingContests.length > 0 && (
                  <div className="mt-10">
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold">
                      আসন্ন প্রতিযোগিতা
                    </p>
                    <div className="mt-4 space-y-6">
                      {upcomingContests.map((contest) => (
                        <Link
                          href={`/contests/${contest.id}`}
                          className="block hover:bg-gray-300/5 bg-gray-300/10 p-4 rounded-lg border border-[#2BA98B]/50"
                          key={contest.id}
                        >
                          <div className="flex flex-col lgXl:flex-row items-center gap-6">
                          {contest.thumbnail_link && (
                            <img
                              src={contest.thumbnail_link}
                              alt={contest.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                            <div className="flex-1">
                              <h2 className="text-2xl mt-3 mb-1 text-heading dark:text-darkHeading">
                                {contest.title}
                              </h2>
                              <p className="text-paragraph dark:text-darkParagraph">
                                {contest.description}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.number_of_problems} প্রবলেম
                                </p>
                                <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.contest_duration} মিনিট
                                </p>
                                {contest.course_title && (
                                  <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                    {contest.course_title}
                                  </p>
                                )}
                              </div>
                              <div className="flex w-full flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                                <div className="flex items-center">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                                    <rect
                                      width="24"
                                      height="24"
                                      rx="4"
                                      className="fill-black dark:fill-[#EFF5F3]"
                                      fill-opacity="0.05"
                                    />
                          <path
                                      d="M4 17.6C4 18.96 5.04 20 6.4 20H17.6C18.96 20 20 18.96 20 17.6V11.2H4V17.6ZM17.6 5.6H16V4.8C16 4.32 15.68 4 15.2 4C14.72 4 14.4 4.32 14.4 4.8V5.6H9.6V4.8C9.6 4.32 9.28 4 8.8 4C8.32 4 8 4.32 8 4.8V5.6H6.4C5.04 5.6 4 6.64 4 8V9.6H20V8C20 6.64 18.96 5.6 17.6 5.6Z"
                            className="fill-black dark:fill-white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                                    শুরু: {formatDate(contest.start_date)}, {formatTime(contest.start_date)}
                        </p>
                      </div>
                        <div>
                          <button
                                    onClick={(e) => joinContest(contest.id, e)}
                                    disabled={contest.isParticipated}
                                    className={`flex items-center gap-4 border font-bold ${
                                      contest.isParticipated ? "bg-gray-500" : "bg-[#2BA98B]"
                                    } border-gray-600 dark:border-gray-300/20 py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out`}
                                  >
                                    <p className="text-heading dark:text-darkHeading">
                                      {contest.isParticipated ? "রেজিস্ট্রেশন করা হয়েছে" : "রেজিস্ট্রেশন করুন"}
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                )}

                {completedContests.length > 0 && (
                  <div className="mt-10">
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold">
                      সম্পন্ন প্রতিযোগিতা
                    </p>
                    <div className="mt-4 space-y-6">
                      {completedContests.map((contest) => (
              <Link
                          href={`/contests/${contest.id}`}
                          className="block hover:bg-gray-300/5 bg-gray-300/10 p-4 rounded-lg border border-[#2BA98B]/50"
                          key={contest.id}
              >
                <div className="flex flex-col lgXl:flex-row items-center gap-6">
                {contest.thumbnail_link && (
                            <img
                              src={contest.thumbnail_link}
                              alt={contest.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                  <div className="flex-1">
                              <h2 className="text-2xl mt-3 mb-1 text-heading dark:text-darkHeading">
                                {contest.title}
                    </h2>
                              <p className="text-paragraph dark:text-darkParagraph">
                                {contest.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                              <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.number_of_problems} প্রবলেম
                                </p>
                                <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                  {contest.contest_duration} মিনিট
                                </p>
                                {contest.course_title && (
                                  <p className="text-[#19745d] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                                    {contest.course_title}
                                  </p>
                                )}
                    </div>
                    <div className="flex w-full flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                                <div className="flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="4"
                                      className="fill-black dark:fill-[#EFF5F3]"
                            fill-opacity="0.05"
                          />
                          <path
                            d="M4 17.6C4 18.96 5.04 20 6.4 20H17.6C18.96 20 20 18.96 20 17.6V11.2H4V17.6ZM17.6 5.6H16V4.8C16 4.32 15.68 4 15.2 4C14.72 4 14.4 4.32 14.4 4.8V5.6H9.6V4.8C9.6 4.32 9.28 4 8.8 4C8.32 4 8 4.32 8 4.8V5.6H6.4C5.04 5.6 4 6.64 4 8V9.6H20V8C20 6.64 18.96 5.6 17.6 5.6Z"
                                      className="fill-black dark:fill-white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                                    সমাপ্ত: {formatDate(contest.end_date)}
                        </p>
                      </div>
                        <div>
                          <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open(contest.contest_link, "_blank");
                                    }}
                                    className="flex items-center gap-4 border font-bold bg-[#2BA98B] border-gray-600 dark:border-gray-300/20 py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out"
                                  >
                                    <p className="text-heading dark:text-darkHeading">
                                      রেজাল্ট দেখুন
                            </p>
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
                      ))}
            </div>
                  </div>
                )}

                {upcomingContests.length === 0 && ongoingContests.length === 0 && completedContests.length === 0 && (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-heading dark:text-darkHeading">কোন প্রতিযোগিতা পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}