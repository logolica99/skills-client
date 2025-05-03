import Nav from "@/components/Nav";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { HindSiliguri } from "@/helpers";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { BACKEND_URL, COURSE_ID, COURSE_ID_2 } from "@/api.config";
import { convertUnixTimestamp } from "@/helpers";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";
import jwtDecode from "jwt-decode";

type Props = {};

// Countdown Timer Component
const CountdownTimer = ({ targetTimestamp }: { targetTimestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetTimestamp * 1000 - Date.now();
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return (
    <div className="flex items-center gap-2 bg-gray-200/10 p-2 rounded mt-2">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{timeLeft.days}</span>
        <span className="text-xs">days</span>
      </div>
      <span className="text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{timeLeft.hours}</span>
        <span className="text-xs">hours</span>
      </div>
      <span className="text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{timeLeft.minutes}</span>
        <span className="text-xs">mins</span>
      </div>
      <span className="text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{timeLeft.seconds}</span>
        <span className="text-xs">secs</span>
      </div>
    </div>
  );
};

// Weekly Classes Slider Component
const WeeklyClassesSlider = ({ classes, getCourseName, fetchMeetingProps, submitInterested, selectedCourseId }: {
  classes: any[],
  getCourseName: (id: string) => string,
  fetchMeetingProps: (id: any) => void,
  submitInterested: (id: any) => void,
  selectedCourseId: string
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weekClasses, setWeekClasses] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter classes for current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // End on Saturday
    
    const startTimestamp = Math.floor(startOfWeek.getTime() / 1000);
    const endTimestamp = Math.floor(endOfWeek.getTime() / 1000);
    
    // Get classes scheduled for this week
    const thisWeekClasses = classes.filter((liveClass: any) => 
      liveClass.scheduled_at >= startTimestamp &&
      liveClass.scheduled_at <= endTimestamp
    );
    
    setWeekClasses(thisWeekClasses);
  }, [classes]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < weekClasses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Get day name from timestamp
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Format time from timestamp (e.g., "10:30 AM")
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Check if class is current (live)
  const isCurrentClass = (liveClass: any) => {
    const now = Math.floor(Date.now() / 1000);
    const duration = getDurationInMinutes(liveClass.duration) * 60; // Convert minutes to seconds
    return liveClass.scheduled_at <= now && (liveClass.scheduled_at + duration) > now;
  };

  // Helper function to get duration in minutes
  const getDurationInMinutes = (duration: string) => {
    if (!duration) return 60; // Default to 60 minutes
    if (typeof duration === 'number') return duration;
    
    // Handle string format like "1 Hour" or "1.5 Hour"
    const match = duration.match(/(\d+(?:\.\d+)?)\s*Hour/i);
    if (match && match[1]) {
      return parseFloat(match[1]) * 60;
    }
    return parseInt(duration);
  };

  if (weekClasses.length === 0) {
    return null; // Don't render if no classes for this week
  }

  return (
    <div className="mb-16 pt-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-heading dark:text-darkHeading">This Week Schedule</h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className={`p-2 rounded-full ${currentIndex === 0 ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed' : 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentIndex === weekClasses.length - 1 || weekClasses.length === 0}
            className={`p-2 rounded-full ${currentIndex === weekClasses.length - 1 || weekClasses.length === 0 ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed' : 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {weekClasses.map((liveClass: any, index) => (
            <div key={liveClass.id} className="min-w-full px-1">
              <div className={`p-6 rounded-xl flex flex-col md:flex-row gap-6 backdrop-blur-lg 
                ${isCurrentClass(liveClass) 
                  ? 'bg-green-400/20 dark:bg-green-200/10 border border-green-500/30' 
                  : 'bg-gray-100/10 dark:bg-gray-200/5 border border-gray-300/20'}`}
              >
                <div className="md:w-1/3">
                  <img
                    src={liveClass.thumbnail || "/Group 33514.png"}
                    className="w-full aspect-video object-cover rounded-lg"
                    alt={liveClass.title || "Live Class"}
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${isCurrentClass(liveClass) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-purple-500/20 text-purple-500 dark:text-purple-300'}`}
                      >
                        {isCurrentClass(liveClass) ? 'LIVE NOW' : getDayName(liveClass.scheduled_at)}
                      </span>
                      <span className="text-paragraph dark:text-darkParagraph">
                        {formatTime(liveClass.scheduled_at)}
                      </span>
                    </div>
                    <span className="text-[#1f493f] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">
                      {getCourseName(selectedCourseId)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-heading dark:text-darkHeading mb-2">
                    {liveClass.title || "Untitled Session"}
                  </h3>
                  
                  <p className="text-paragraph dark:text-darkParagraph mb-3 line-clamp-2">
                    {liveClass.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <span className="text-paragraph dark:text-darkParagraph">
                        {liveClass.duration || "1 Hour"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <span className="text-paragraph dark:text-darkParagraph">
                        {liveClass.instructor_name || "Instructor"}
                      </span>
                    </div>
                  </div>
                  
                  {!isCurrentClass(liveClass) && (
                    <div className="mt-auto">
                      <p className="text-paragraph dark:text-darkParagraph font-medium mb-1">Starts in:</p>
                      <CountdownTimer targetTimestamp={liveClass.scheduled_at} />
                    </div>
                  )}
                  
                  <div className="mt-4">
                    {isCurrentClass(liveClass) ? (
                      <button
                        onClick={() => fetchMeetingProps(liveClass.id)}
                        className="w-full py-2 flex items-center justify-center gap-2 px-6 
                        rounded font-semibold text-white text-lg
                        bg-green-500 hover:opacity-75 cursor-pointer ease-in-out duration-150 focus:ring ring-gray-300/80"
                      >
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.343 0.99728C4.43595 1.10226 4.50969 1.22693 4.56 1.36415C4.61031 1.50138 4.6362 1.64847 4.6362 1.79702C4.6362 1.94557 4.61031 2.09266 4.56 2.22989C4.50969 2.36711 4.43595 2.49178 4.343 2.59676C2.84287 4.29325 2.00013 6.59401 2.00013 8.993C2.00013 11.392 2.84287 13.6928 4.343 15.3892C4.43848 15.4935 4.51465 15.6182 4.56704 15.7562C4.61943 15.8941 4.64701 16.0424 4.64816 16.1925C4.64932 16.3426 4.62402 16.4914 4.57376 16.6303C4.52349 16.7693 4.44926 16.8955 4.35539 17.0016C4.26153 17.1077 4.14991 17.1917 4.02705 17.2485C3.90419 17.3053 3.77254 17.3339 3.6398 17.3326C3.50706 17.3313 3.37588 17.3002 3.25391 17.2409C3.13194 17.1817 3.02163 17.0956 2.92941 16.9876C-0.976469 12.5723 -0.976469 5.41253 2.92941 0.99728C3.11688 0.785367 3.37112 0.666321 3.63621 0.666321C3.90129 0.666321 4.15553 0.785367 4.343 0.99728ZM17.0713 0.99728C20.9762 5.41366 20.9762 12.5723 17.0713 16.9876C16.8839 17.1997 16.6296 17.3189 16.3644 17.319C16.0992 17.3191 15.8448 17.2001 15.6572 16.9882C15.4697 16.7762 15.3642 16.4887 15.3641 16.1888C15.364 15.889 15.4693 15.6013 15.6567 15.3892C17.1569 13.6928 17.9996 11.392 17.9996 8.993C17.9996 6.59401 17.1569 4.29325 15.6567 2.59676C15.4692 2.38466 15.3638 2.09698 15.3638 1.79702C15.3638 1.49706 15.4692 1.20938 15.6567 0.99728C15.8443 0.785175 16.0988 0.666016 16.364 0.666016C16.6293 0.666016 16.8838 0.785175 17.0713 0.99728ZM7.30915 4.24598C7.49657 4.45796 7.60185 4.74542 7.60185 5.04516C7.60185 5.34489 7.49657 5.63236 7.30915 5.84434C6.94521 6.25581 6.65651 6.7443 6.45954 7.28194C6.26257 7.81957 6.1612 8.39581 6.1612 8.97774C6.1612 9.55968 6.26257 10.1359 6.45954 10.6735C6.65651 11.2112 6.94521 11.6997 7.30915 12.1111C7.40197 12.2162 7.47558 12.3408 7.52579 12.478C7.576 12.6152 7.60181 12.7622 7.60177 12.9107C7.60172 13.0592 7.57581 13.2062 7.52552 13.3434C7.47522 13.4805 7.40153 13.6051 7.30865 13.7101C7.21577 13.815 7.10551 13.8982 6.98418 13.955C6.86284 14.0118 6.73281 14.041 6.6015 14.0409C6.47019 14.0409 6.34017 14.0116 6.21888 13.9547C6.09758 13.8978 5.98737 13.8145 5.89456 13.7095C4.7847 12.4545 4.1612 10.7525 4.1612 8.97774C4.1612 7.203 4.7847 5.50094 5.89456 4.24598C5.9874 4.14088 6.09766 4.05751 6.21902 4.00062C6.34039 3.94374 6.47047 3.91446 6.60185 3.91446C6.73323 3.91446 6.86332 3.94374 6.98468 4.00062C7.10605 4.05751 7.2163 4.14088 7.30915 4.24598ZM14.2651 4.24598C15.375 5.50094 15.9985 7.203 15.9985 8.97774C15.9985 10.7525 15.375 12.4545 14.2651 13.7095C14.0766 13.9154 13.8241 14.0293 13.562 14.0268C13.2998 14.0242 13.0491 13.9053 12.8637 13.6957C12.6784 13.4861 12.5732 13.2026 12.571 12.9063C12.5687 12.6099 12.6695 12.3243 12.8516 12.1111C13.2155 11.6997 13.5042 11.2112 13.7012 10.6735C13.8981 10.1359 13.9995 9.55968 13.9995 8.97774C13.9995 8.39581 13.8981 7.81957 13.7012 7.28194C13.5042 6.7443 13.2155 6.25581 12.8516 5.84434C12.6695 5.63114 12.5687 5.34561 12.571 5.04923C12.5732 4.75285 12.6784 4.46933 12.8637 4.25975C13.0491 4.05017 13.2998 3.93129 13.562 3.92872C13.8241 3.92614 14.0766 4.04008 14.2651 4.24598ZM10.0804 7.37713C10.4781 7.37713 10.8595 7.55577 11.1407 7.87375C11.4219 8.19173 11.5799 8.623 11.5799 9.07269C11.5799 9.52238 11.4219 9.95366 11.1407 10.2716C10.8595 10.5896 10.4781 10.7683 10.0804 10.7683C9.68264 10.7683 9.30122 10.5896 9.02 10.2716C8.73877 9.95366 8.58078 9.52238 8.58078 9.07269C8.58078 8.623 8.73877 8.19173 9.02 7.87375C9.30122 7.55577 9.68264 7.37713 10.0804 7.37713Z"
                            fill="white"
                          />
                        </svg>
                        Join Live Class
                      </button>
                    ) : (
                      <button
                        onClick={() => submitInterested(liveClass.id)}
                        className={`w-full py-2 flex items-center justify-center gap-2 px-6 
                          rounded font-semibold text-white text-lg
                          ${
                            liveClass.interested
                              ? "bg-gray-600 cursor-not-allowed opacity-60"
                              : "bg-purple-600 hover:opacity-75 cursor-pointer ease-in-out duration-150 focus:ring ring-gray-300/80"
                          }`}
                        disabled={liveClass.interested}
                      >
                        {liveClass.interested ? "Already Interested" : "Interested"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      {weekClasses.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {weekClasses.map((_, i) => (
            <div 
              key={i}
              className={`h-2 w-2 rounded-full cursor-pointer
                ${currentIndex === i ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              onClick={() => setCurrentIndex(i)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function LiveClass({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [liveClasses, setLiveClasses] = useState<any>({
    list: [],
    serverTimeStamp: Math.floor(Date.now() / 1000)
  });
  const [isMeeting, setMeeting] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  const fetchEnrolledCourses = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setUser({ ...user, loading: true });
    
    // Get user_id from token - not needed for request body but kept for reference
    const decoded = jwtDecode<any>(token);
    const userId = decoded.id;
    
    console.log("Fetching enrolled courses for user ID:", userId);
    
    axios
      .get(BACKEND_URL + "/user/course/getEnrolledCoursesByUserId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Get all courses from API response
        const allCourses = res.data.data || [];
        console.log("All enrolled courses:", allCourses);
        
        // Filter to only keep courses with IDs 1 or 15
        const filteredCourses = allCourses.filter((course: any) => 
          course.id.toString() === COURSE_ID || course.id.toString() === COURSE_ID_2
        );
        console.log("Filtered courses (ID 1 or 15):", filteredCourses);
        
        setEnrolledCourses(filteredCourses);
        
        // Set default selection, prioritizing COURSE_ID_2 (15) if available
        const hasCourse15 = filteredCourses.some((course: any) => course.id.toString() === COURSE_ID_2);
        const hasCourse1 = filteredCourses.some((course: any) => course.id.toString() === COURSE_ID);
        
        if (hasCourse15) {
          console.log("Course ID 15 found - setting selected course to:", COURSE_ID_2);
          setSelectedCourseId(COURSE_ID_2);
        } else if (hasCourse1) {
          console.log("Course ID 1 found - setting selected course to:", COURSE_ID);
          setSelectedCourseId(COURSE_ID);
        } else {
          console.log("Neither course ID 1 nor 15 found - defaulting to COURSE_ID:", COURSE_ID);
          // Default to COURSE_ID if neither course is found
          setSelectedCourseId(COURSE_ID);
          
          // Show toast message if neither course is found
          if (filteredCourses.length === 0) {
            toast.error("আপনি কোন কোর্সে অন্তর্ভুক্ত হননি। দয়া করে প্রয়োজনীয় কোর্সে অন্তর্ভুক্ত হোন।", {
              duration: 5000,
            });
          }
        }
        
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        console.error("Error fetching enrolled courses:", err);
        setUser({ ...user, loading: false });
        
        // Show error message
        toast.error("কোর্স তথ্য লোড করা যায়নি। দয়া করে আবার চেষ্টা করুন।", {
          duration: 3000,
        });
      });
  };

  const fetchClasses = () => {
    if (!selectedCourseId) {
      console.log("No course ID selected yet, skipping fetch");
      return;
    }
    
    console.log("Fetching classes for course ID:", selectedCourseId);
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/live/list/" + selectedCourseId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLiveClasses(res.data.data);
        console.log("Classes loaded for course ID:", selectedCourseId);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        console.error("Error fetching live classes:", err);
        setUser({ ...user, loading: false });
        toast.error("Failed to fetch live classes");
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
        toast.success("Marked as interested");
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
        toast.error("Failed to mark interest");
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
        initiateMeeting(res.data.data);
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
        toast.error("Failed to join the meeting");
      });
  };

  const initiateMeeting = async (config: any) => {
    try {
      var ZoomMtg = await (await import("@zoomus/websdk/index")).ZoomMtg;

      ZoomMtg.setZoomJSLib("https://source.zoom.us/2.16.0/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");

      const zmmtgRoot = window.document.getElementById("zmmtg-root");
      if (zmmtgRoot) {
        zmmtgRoot.style.display = "block";
      }

      ZoomMtg.init({
        leaveUrl: config.leaveUrl,
        success: (success: any) => {
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
              setUser({ ...user, loading: false });
            },
            error: (error: any) => {
              setUser({ ...user, loading: false });
              toast.error("Failed to join meeting");
            },
          });
        },
        error: (error: any) => {
          setUser({ ...user, loading: false });
          toast.error("Failed to initialize meeting");
        },
      });
    } catch (error) {
      setUser({ ...user, loading: false });
      toast.error("Failed to load Zoom SDK");
    }
  };

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      console.log("useEffect triggered - fetchClasses with ID:", selectedCourseId);
      fetchClasses();
    }
  }, [selectedCourseId]);

  useEffect(() => {
    console.log("Selected course ID changed to:", selectedCourseId);
  }, [selectedCourseId]);

  if (isMeeting) return <div id="zmmtg-root" />;

  // Helper function to get duration in minutes
  const getDurationInMinutes = (duration: string) => {
    if (!duration) return 60; // Default to 60 minutes
    if (typeof duration === 'number') return duration;
    
    // Handle string format like "1 Hour" or "1.5 Hour"
    const match = duration.match(/(\d+(?:\.\d+)?)\s*Hour/i);
    if (match && match[1]) {
      return parseFloat(match[1]) * 60;
    }
    return parseInt(duration);
  };

  // Categorize classes based on their timing
  const currentClasses = liveClasses?.list?.filter(
    (liveClass: any) => liveClass.scheduled_at <= liveClasses.serverTimeStamp && 
    (liveClass.scheduled_at + getDurationInMinutes(liveClass.duration)) > liveClasses.serverTimeStamp
  ) || [];

  const upcomingClasses = liveClasses?.list?.filter(
    (liveClass: any) => liveClass.scheduled_at > liveClasses.serverTimeStamp
  ) || [];
  
  const pastClasses = liveClasses?.list?.filter(
    (liveClass: any) => (liveClass.scheduled_at + getDurationInMinutes(liveClass.duration)) <= liveClasses.serverTimeStamp
  ) || [];

  const getCourseName = (courseId: string) => {
    if (!courseId) return "No Course Selected";
    const course = enrolledCourses.find(course => course.id.toString() === courseId);
    if (course?.title) return course.title;
    if (courseId === COURSE_ID) return "Basic Course";
    if (courseId === COURSE_ID_2) return "Current Batch";
    return `Course ${courseId}`;
  };

  return (
    <div className={`${HindSiliguri.variable} font-hind overflow-x-hidden`}>
      <Nav></Nav>
      <Toaster />

      <FloatingCompiler />
      <button
        style={{ zIndex: 999 }}
        onClick={() => {
          setUser({ ...user, openCompiler: true });
        }}
        className="fixed top-80 -left-2 bg-[#0B060D] bg-opacity-30 backdrop-blur-lg border border-gray-200/20 p-3 hover:bg-gray-300/20"
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

      <div className="pt-20 bg-white dark:bg-[#0B060D] overflow-x-hidden">
        <div className="w-[90%] lg:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
          <div className="flex justify-between items-center mb-7">
            <p className="text-4xl font-semibold text-heading dark:text-darkHeading">
              Live Classes
            </p>
            {enrolledCourses.length > 1 && (
              <div className="flex items-center gap-2">
                <label className="text-heading dark:text-darkHeading">Select Course:</label>
                <select 
                  className="bg-gray-400/20 dark:bg-gray-200/5 text-heading dark:text-darkHeading p-2 rounded-lg"
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                >
                  {enrolledCourses.map((course: any) => (
                    <option key={course.id} value={course.id.toString()}>
                      {getCourseName(course.id.toString())}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Weekly Classes Slider */}
          {liveClasses?.list && liveClasses.list.length > 0 && (
            <WeeklyClassesSlider 
              classes={liveClasses.list} 
              getCourseName={getCourseName} 
              fetchMeetingProps={fetchMeetingProps} 
              submitInterested={submitInterested}
              selectedCourseId={selectedCourseId}
            />
          )}

          {/* Current Live Classes */}
          {currentClasses.length > 0 && (
            <div>
              <p className="text-heading dark:text-darkHeading text-3xl font-bold mb-4">
                Running Live Classes
              </p>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {currentClasses.map((liveClass: any) => (
                  <div
                    key={liveClass.id}
                    className="p-4 pb-6 max-w-[340px] text-heading dark:text-darkHeading bg-green-400/20 dark:bg-green-200/5 backdrop-blur-xl rounded-xl"
                  >
                    <img
                      src={liveClass.thumbnail || "/Group 33514.png"}
                      className="max-w-[300px] rounded"
                      alt={liveClass.title || "Live Class"}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-paragraph dark:text-darkParagraph">
                        {liveClass.instructor_name || "Course"}
                      </p>
                      <span className="text-[#1f493f] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">
                        {getCourseName(selectedCourseId)}
                      </span>
                    </div>
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold mt-2 mb-1">
                      {liveClass.title || "Untitled Session"}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph text-sm line-clamp-2">
                      {liveClass.description || "No description available"}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph mt-2">
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)} • {liveClass.duration}
                    </p>
                    <button
                      onClick={() => fetchMeetingProps(liveClass.id)}
                      className="w-full py-2 flex items-center justify-center gap-2 mt-5 px-6 
                      rounded font-semibold text-white text-lg
                      bg-green-500 hover:opacity-75 cursor-pointer ease-in-out duration-150 focus:ring ring-gray-300/80"
                    >
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.343 0.99728C4.43595 1.10226 4.50969 1.22693 4.56 1.36415C4.61031 1.50138 4.6362 1.64847 4.6362 1.79702C4.6362 1.94557 4.61031 2.09266 4.56 2.22989C4.50969 2.36711 4.43595 2.49178 4.343 2.59676C2.84287 4.29325 2.00013 6.59401 2.00013 8.993C2.00013 11.392 2.84287 13.6928 4.343 15.3892C4.43848 15.4935 4.51465 15.6182 4.56704 15.7562C4.61943 15.8941 4.64701 16.0424 4.64816 16.1925C4.64932 16.3426 4.62402 16.4914 4.57376 16.6303C4.52349 16.7693 4.44926 16.8955 4.35539 17.0016C4.26153 17.1077 4.14991 17.1917 4.02705 17.2485C3.90419 17.3053 3.77254 17.3339 3.6398 17.3326C3.50706 17.3313 3.37588 17.3002 3.25391 17.2409C3.13194 17.1817 3.02163 17.0956 2.92941 16.9876C-0.976469 12.5723 -0.976469 5.41253 2.92941 0.99728C3.11688 0.785367 3.37112 0.666321 3.63621 0.666321C3.90129 0.666321 4.15553 0.785367 4.343 0.99728ZM17.0713 0.99728C20.9762 5.41366 20.9762 12.5723 17.0713 16.9876C16.8839 17.1997 16.6296 17.3189 16.3644 17.319C16.0992 17.3191 15.8448 17.2001 15.6572 16.9882C15.4697 16.7762 15.3642 16.4887 15.3641 16.1888C15.364 15.889 15.4693 15.6013 15.6567 15.3892C17.1569 13.6928 17.9996 11.392 17.9996 8.993C17.9996 6.59401 17.1569 4.29325 15.6567 2.59676C15.4692 2.38466 15.3638 2.09698 15.3638 1.79702C15.3638 1.49706 15.4692 1.20938 15.6567 0.99728C15.8443 0.785175 16.0988 0.666016 16.364 0.666016C16.6293 0.666016 16.8838 0.785175 17.0713 0.99728ZM7.30915 4.24598C7.49657 4.45796 7.60185 4.74542 7.60185 5.04516C7.60185 5.34489 7.49657 5.63236 7.30915 5.84434C6.94521 6.25581 6.65651 6.7443 6.45954 7.28194C6.26257 7.81957 6.1612 8.39581 6.1612 8.97774C6.1612 9.55968 6.26257 10.1359 6.45954 10.6735C6.65651 11.2112 6.94521 11.6997 7.30915 12.1111C7.40197 12.2162 7.47558 12.3408 7.52579 12.478C7.576 12.6152 7.60181 12.7622 7.60177 12.9107C7.60172 13.0592 7.57581 13.2062 7.52552 13.3434C7.47522 13.4805 7.40153 13.6051 7.30865 13.7101C7.21577 13.815 7.10551 13.8982 6.98418 13.955C6.86284 14.0118 6.73281 14.041 6.6015 14.0409C6.47019 14.0409 6.34017 14.0116 6.21888 13.9547C6.09758 13.8978 5.98737 13.8145 5.89456 13.7095C4.7847 12.4545 4.1612 10.7525 4.1612 8.97774C4.1612 7.203 4.7847 5.50094 5.89456 4.24598C5.9874 4.14088 6.09766 4.05751 6.21902 4.00062C6.34039 3.94374 6.47047 3.91446 6.60185 3.91446C6.73323 3.91446 6.86332 3.94374 6.98468 4.00062C7.10605 4.05751 7.2163 4.14088 7.30915 4.24598ZM14.2651 4.24598C15.375 5.50094 15.9985 7.203 15.9985 8.97774C15.9985 10.7525 15.375 12.4545 14.2651 13.7095C14.0766 13.9154 13.8241 14.0293 13.562 14.0268C13.2998 14.0242 13.0491 13.9053 12.8637 13.6957C12.6784 13.4861 12.5732 13.2026 12.571 12.9063C12.5687 12.6099 12.6695 12.3243 12.8516 12.1111C13.2155 11.6997 13.5042 11.2112 13.7012 10.6735C13.8981 10.1359 13.9995 9.55968 13.9995 8.97774C13.9995 8.39581 13.8981 7.81957 13.7012 7.28194C13.5042 6.7443 13.2155 6.25581 12.8516 5.84434C12.6695 5.63114 12.5687 5.34561 12.571 5.04923C12.5732 4.75285 12.6784 4.46933 12.8637 4.25975C13.0491 4.05017 13.2998 3.93129 13.562 3.92872C13.8241 3.92614 14.0766 4.04008 14.2651 4.24598ZM10.0804 7.37713C10.4781 7.37713 10.8595 7.55577 11.1407 7.87375C11.4219 8.19173 11.5799 8.623 11.5799 9.07269C11.5799 9.52238 11.4219 9.95366 11.1407 10.2716C10.8595 10.5896 10.4781 10.7683 10.0804 10.7683C9.68264 10.7683 9.30122 10.5896 9.02 10.2716C8.73877 9.95366 8.58078 9.52238 8.58078 9.07269C8.58078 8.623 8.73877 8.19173 9.02 7.87375C9.30122 7.55577 9.68264 7.37713 10.0804 7.37713Z"
                          fill="white"
                        />
                      </svg>
                      Join Live Class
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Live Classes */}
          {upcomingClasses.length > 0 && (
            <div className={currentClasses.length > 0 ? "mt-12" : ""}>
              <p className="text-heading dark:text-darkHeading text-3xl font-bold mb-4">
                Upcoming Live Classes
              </p>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {upcomingClasses.map((liveClass: any) => (
                  <div
                    key={liveClass.id}
                    className="p-4 pb-6 max-w-[340px] text-heading dark:text-darkHeading bg-gray-100/5 backdrop-blur-xl rounded-xl"
                  >
                    <img
                      src={liveClass.thumbnail || "/Group 33514.png"}
                      className="max-w-[300px] rounded"
                      alt={liveClass.title || "Live Class"}
                    />
                    {/* <div className="flex items-center justify-between mt-2">
                      <p className="text-paragraph dark:text-darkParagraph">
                        {liveClass.instructor_name || "Course"}
                      </p>
                      <span className="text-[#1f493f] dark:text-[#66F4D2] text-sm px-2 py-[1px] rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">
                        {getCourseName(selectedCourseId)}
                      </span>
                    </div> */}
                    <p className="text-heading dark:text-darkHeading text-2xl font-bold mt-2 mb-1">
                      {liveClass.title || "Untitled Session"}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph text-sm line-clamp-2">
                      {liveClass.description || "No description available"}
                    </p>
                    <p className="text-paragraph dark:text-darkParagraph mt-2">
                      {convertUnixTimestamp(liveClass.scheduled_at * 1000)} • {liveClass.duration}
                    </p>
                    
                    <div className="mt-2">
                      <p className="text-paragraph dark:text-darkParagraph font-medium mb-1">Starts in:</p>
                      <CountdownTimer targetTimestamp={liveClass.scheduled_at} />
                    </div>
                    
                    <button
                      onClick={() => submitInterested(liveClass.id)}
                      className={`w-full py-2 flex items-center justify-center gap-2 mt-5 px-6 
                        rounded font-semibold text-white text-lg
                        ${
                          liveClass.interested
                            ? "bg-gray-600 cursor-not-allowed opacity-60"
                            : "bg-green-500 hover:opacity-75 cursor-pointer ease-in-out duration-150 focus:ring ring-gray-300/80"
                        }`}
                      disabled={liveClass.interested}
                    >
                      {liveClass.interested ? "Already Interested" : "Interested"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Live Classes */}
          {pastClasses.length > 0 && (
            <div className={(currentClasses.length > 0 || upcomingClasses.length > 0) ? "mt-12" : ""}>
              <p className="text-heading dark:text-darkHeading text-3xl font-bold mb-4">
                Past Live Classes
              </p>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {pastClasses.map((liveClass: any) => (
                  <div
                    key={liveClass.id}
                    className="p-4 pb-6 w-[340px] h-[480px] text-heading dark:text-darkHeading bg-gray-100/5 backdrop-blur-xl rounded-xl flex flex-col"
                  >
                    <img
                      src={liveClass.thumbnail || "/Group 33514.png"}
                      className="w-full h-[190px] object-cover rounded"
                      alt={liveClass.title || "Live Class"}
                    />
                    <div className="flex-grow">
                      <p className="text-heading dark:text-darkHeading text-2xl font-bold mt-2 mb-1 line-clamp-2">
                        {liveClass.title || "Untitled Session"}
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph text-sm line-clamp-3">
                        {liveClass.description || "No description available"}
                      </p>
                      <p className="text-paragraph dark:text-darkParagraph mt-2">
                        {convertUnixTimestamp(liveClass.scheduled_at * 1000)} • {liveClass.duration}
                      </p>
                    </div>
                    
                    {liveClass.data?.recordedMeetingLink ? (
                      <a 
                        href={liveClass.data.recordedMeetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 flex items-center justify-center gap-2 mt-5 px-6 
                        rounded font-semibold text-heading dark:text-darkHeading text-lg
                        border border-gray-600 dark:border-gray-300/20 hover:opacity-75 cursor-pointer ease-in-out duration-150"
                      >
                        Watch Recording
                      </a>
                    ) : (
                      <button className="w-full py-2 flex items-center justify-center gap-2 mt-5 px-6 
                        rounded font-semibold text-heading dark:text-darkHeading text-lg
                        border border-gray-600 dark:border-gray-300/20 opacity-50 cursor-not-allowed">
                        Recording Unavailable
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Classes Message */}
          {(!liveClasses?.list || liveClasses.list.length === 0) && (
            <div className="py-10 text-center mt-10">
              <div className="mx-auto w-24 h-24 mb-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-400">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-heading dark:text-darkHeading text-xl">
                No live classes available for this course yet.
              </p>
              <p className="text-paragraph dark:text-darkParagraph mt-2">
                Check back later for upcoming sessions.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
