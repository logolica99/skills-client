import Nav from "@/components/Nav";
import { HindSiliguri } from "@/pages";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BACKEND_URL } from "@/api.config";
import {
  apiConfig,
  calculateRemainingDays,
  countAssignmentsAndVideos,
  countModulesAssignmentsVideos,
  englishToBanglaNumbers,
  isLoggedIn,
} from "@/helpers";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";

const settings = {
  dots: true,

  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState({
    studyPlan: true,
    instructor: false,
    courseComplete: false,
  });

  const changeTab = (tabName: string) => {
    let temp: any = {
      studyPlan: false,
      instructor: false,
      courseComplete: false,
    };
    temp[tabName] = true;
    setActiveTab(temp);
  };
  const router = useRouter();
  const [user, setUser] = useContext<any>(UserContext);
  const [courseData, setCourseData] = useState({
    success: true,
    isTaken: true,
    id: 3,
    title: "প্রতিযোগিতামূলক প্রোগ্রামিং মৌলিক",
    x_price: 20000,
    price: 7997,
    language: "বাংলা",
    enrolled: 400,
    you_get: {
      you_get:
        "সিলেবাস রেডি, কুইজ + সলিউশন,,  জব গাইডলাইন  জব/ইন্টার্নশীপের সুযোগ,  ডেইলি সাপোর্ট ক্লাস,  সিলেবাস রেডি,  ১৪ টি প্রোজেক্ট",
    },
    chips: {
      deadline: "2023-10-13T18:00:00.000Z",
      total_seats: "800",
    },
    short_description:
      "কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে",
    study_plan_chips: {
      module: 0,
      live_class: 0,
      assignment: 0,
      quiz: 0,
    },
    instructor_list: {
      instructors: [
        {
          name: "John Doe",
          credibility:
            "MSc (English), University of Oxford (UK);\n\nBA, MA (English), University of Dhaka;\n\nIELTS: 8.5",
          image: {},
          imagePreviewLink:
            "blob:http://localhost:5174/49c485aa-f30d-48a9-8c51-45ca6b8c8c4b",
          imageUploadedLink:
            "https://skills-by-apar.s3.ap-south-1.amazonaws.com/portrait-white-man-isolated_53876-40306%201%20%282%29.png",
        },
      ],
    },
    faq_list: {
      faqs: [
        {
          question: "এই কোর্স করলেই কি আমি গুগলে চ্যান্স পাব ?",
          answer:
            "আমাদের এই কোর্সটি মোটেও তোমাকে গুগলার হওয়ার নিশ্চয়তা দেবে না বরং গুগলের মত এই সব বড়ো কোম্পানির জন্যে তোমার ক্যারিয়ার এর পথ কে সহজ করার জন্যে তোমাকে নতুন স্কিল ডেভেলপ করার জন্যে পথে হাঁটতে শেখাবে বাকি টা তোমাদের ধৈর্য আর ডেডিকেশন এর উপর নির্ভর করবে।এই কোর্সে তোমরা লেগে থাকবে আর শিখবে প্রোগ্রামিং এর নতুন জগতের নতুন নতুন সব জিনিস আর এভাবেই নিজেকে অন্য লেভেলে নিয়ে গিয়ে বিশ্বসেরা তোমাদের ড্রিম কোম্পানি গুলো তে চাকরির সুযোগ পেতে পার",
        },
        {
          question: "এই কোর্স টি কাদের জন্যে?",
          answer:
            "আমাদের এই কোর্সটি মোটেও তোমাকে গুগলার হওয়ার নিশ্চয়তা দেবে না বরং গুগলের মত এই সব বড়ো কোম্পানির জন্যে তোমার ক্যারিয়ার এর পথ কে সহজ করার জন্যে তোমাকে নতুন স্কিল ডেভেলপ করার জন্যে পথে হাঁটতে শেখাবে বাকি টা তোমাদের ধৈর্য আর ডেডিকেশন এর উপর নির্ভর করবে।এই কোর্সে তোমরা লেগে থাকবে আর শিখবে প্রোগ্রামিং এর নতুন জগতের নতুন নতুন সব জিনিস আর এভাবেই নিজেকে অন্য লেভেলে নিয়ে গিয়ে বিশ্বসেরা তোমাদের ড্রিম কোম্পানি গুলো তে চাকরির সুযোগ পেতে পার",
        },
        {
          question: "এই কোর্সটি করার পর আমি কি করব?",
          answer:
            "আমাদের এই কোর্সটি মোটেও তোমাকে গুগলার হওয়ার নিশ্চয়তা দেবে না বরং গুগলের মত এই সব বড়ো কোম্পানির জন্যে তোমার ক্যারিয়ার এর পথ কে সহজ করার জন্যে তোমাকে নতুন স্কিল ডেভেলপ করার জন্যে পথে হাঁটতে শেখাবে বাকি টা তোমাদের ধৈর্য আর ডেডিকেশন এর উপর নির্ভর করবে।এই কোর্সে তোমরা লেগে থাকবে আর শিখবে প্রোগ্রামিং এর নতুন জগতের নতুন নতুন সব জিনিস আর এভাবেই নিজেকে অন্য লেভেলে নিয়ে গিয়ে বিশ্বসেরা তোমাদের ড্রিম কোম্পানি গুলো তে চাকরির সুযোগ পেতে পার",
        },
      ],
    },
    description:
      "কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে কিভাবে\n\nকম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে\n\n",
    feedback_list: {
      feedbacks: [
        {
          description:
            "ঘরে বসে Spoken English কোর্সটি করে বুঝতে পারলাম শত শত গ্রামার শেখার কোনো প্রয়োজন নেই, বিভিন্ন পরিস্থিতিতে ভীতি কাটিয়ে খুব সহজ",
          name: "Khama Rani Bose",
          bio: "ভর্তি পরীক্ষার",
          image: {},
          imagePreviewLink:
            "blob:http://localhost:5174/12964868-935b-4e9c-b761-908fe83d376d",
          imageUploadedLink:
            "https://skills-by-apar.s3.ap-south-1.amazonaws.com/image%20%286%29.png",
        },
        {
          description:
            "ঘরে বসে Spoken English কোর্সটি করে বুঝতে পারলাম শত শত গ্রামার শেখার কোনো প্রয়োজন নেই, বিভিন্ন পরিস্থিতিতে ভীতি কাটিয়ে খুব সহজ",
          name: "Khama Rani Bose",
          bio: "ভর্তি পরীক্ষার",
          image: {},
          imagePreviewLink:
            "blob:http://localhost:5174/216fc44a-e7c4-4e8b-ad86-00de69bc7584",
          imageUploadedLink:
            "https://skills-by-apar.s3.ap-south-1.amazonaws.com/image%20%286%29.png",
        },
        {
          description:
            "ঘরে বসে Spoken English কোর্সটি করে বুঝতে পারলাম শত শত গ্রামার শেখার কোনো প্রয়োজন নেই, বিভিন্ন পরিস্থিতিতে ভীতি কাটিয়ে খুব সহজ",
          name: "Khama Rani Bose",
          bio: "ভর্তি পরীক্ষার",
          image: {},
          imagePreviewLink:
            "blob:http://localhost:5174/9956a870-1c31-447b-b907-eb01059bc925",
          imageUploadedLink:
            "https://skills-by-apar.s3.ap-south-1.amazonaws.com/image%20%286%29.png",
        },
      ],
    },
    intro_video: "https://www.youtube.com/embed/QgjkjsqAzvo",
    is_live: true,
    chapters: [
      {
        id: 6,
        course_id: 3,
        title: "এই কোর্স করলেই কি আমি গুগলে চ্যান্স পাব ?",
        serial_string: "1",
        chips_list: {},
        is_free: true,
        is_live: true,
        modules: [
          {
            id: 6,
            chapter_id: 6,
            title: "কীভাবে ইংরেজিতে নিজেকে Introduce করবেন?",
            description:
              "<p>কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে</p>\n",
            metadata: {},
            data: {
              category: "VIDEO",
              videoUrl: "https://www.youtube.com/embed/QgjkjsqAzvo",
              videoHost: "Youtube",
            },
            is_live: true,
            is_free: null,
          },
          {
            id: 7,
            chapter_id: 6,
            title: "কীভাবে ইংরেজিতে করবেন?",
            description:
              "<p>কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে&nbsp;</p>\n",
            metadata: {},
            data: {
              category: "ASSIGNMENT",
              videoUrl: "https://www.youtube.com/embed/QgjkjsqAzvo",
              videoHost: "Youtube",
              deadline: "2023-12-14T18:59:37.000Z",
            },
            is_live: true,
            is_free: null,
          },
        ],
      },
      {
        id: 7,
        course_id: 3,
        title: "এই কোর্স করলেই কি আমি  পাব ?",
        serial_string: "2",
        chips_list: {},
        is_free: false,
        is_live: true,
        modules: [
          {
            id: 8,
            chapter_id: 7,
            title: "কীভাবে ইংরেজিতে নিজেকে Introduce করবেন?",
            description:
              "<p>কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে&nbsp;&nbsp;</p>\n",
            metadata: {},
            data: {
              category: "VIDEO",
              videoUrl: "https://www.youtube.com/embed/QgjkjsqAzvo",
              videoHost: "Youtube",
            },
            is_live: true,
            is_free: null,
          },
          {
            id: 9,
            chapter_id: 7,
            title: "এই কোর্স করলেই কি আচ্যান্স পাব ?",
            description:
              "<p>কিভাবে কম্পিউটার অন করে কিভাবে কোথায় কোড করবে বা শুধু মাত্র ফোন দিয়ে কিভাবে কোড করবে থেকে শুরু করে সি++ এর সকল বেসিক ডেটা স্ট্রাকচার থেকে শুরু করে একদম এডভ্যান্স কম্পেটিটিভ প্রোগ্রামিং এর ডায়নামিক প্রোগ্রামিং পর্যন্ত তোমাদের শিখিয়ে দেয়া হবে পাশাপাশি কম্পেটিটিভ প্রোগ্রামার রা কোথায় কিভাবে শুরু করে কোথায় প্রাকটিস করে সব দেখিয়ে শিখিয়ে দেয়া হবে&nbsp;&nbsp;</p>\n",
            metadata: {},
            data: {
              category: "ASSIGNMENT",
              videoUrl: "https://www.youtube.com/embed/QgjkjsqAzvo",
              videoHost: "Youtube",
              deadline: "2023-11-28T22:00:24.000Z",
            },
            is_live: true,
            is_free: null,
          },
        ],
      },
    ],
  });

  const fetchCourse = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/course/getfull/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourseData(res.data);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  const buyCourse = () => {
    if (isLoggedIn() === false) {
      toast.error("please sign in ");
    } else {
      setUser({ ...user, loading: true });
      const token = localStorage.getItem("token");
      axios
        .post(
          BACKEND_URL + "/user/payment/initiate/1",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          window.location=res.data.data
          // router.push("/course/12");
          //setUser({ ...user, loading: false });
        })
        .catch((err) => {
          setUser({ ...user, loading: false });
        });
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <Toaster />

      <div className="pt-20  bg-[#0B060D] overflow-x-hidden">
        <div className="w-[90%] lg:w-[80%] mx-auto py-12 z-20">
          <div className="flex flex-col-reverse lg:flex-row gap-24 justify-between relative">
            <svg
              viewBox="0 0 980 892"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute  -top-[200px] -left-[200px] w-full z-0 h-full"
            >
              <g filter="url(#filter0_f_261_7530)">
                <ellipse
                  cx="314.306"
                  cy="293.812"
                  rx="167.107"
                  ry="94.0796"
                  transform="rotate(-10.6934 314.306 293.812)"
                  fill="#B153E0"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_261_7530"
                  x="-350.838"
                  y="-303.722"
                  width="1330.29"
                  height="1195.07"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="250"
                    result="effect1_foregroundBlur_261_7530"
                  />
                </filter>
              </defs>
            </svg>
            <div style={{ flex: 2 }} className="text-heading z-10">
              <h2 className="text-2xl lg:text-4xl font-semibold">
                {courseData?.title}
              </h2>
              <div className="flex gap-8 items-center pb-6 border-b border-gray-300/10 relative ">
                <div className="flex gap-3 mt-6 items-center bg-[#FFF1E9]/20 px-3 py-2 rounded-xl">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99855 17.6269C4.23361 17.6269 0.371094 13.7645 0.371094 8.99951C0.371094 4.23457 4.23361 0.37207 8.99855 0.37207C13.7635 0.37207 17.6259 4.23457 17.6259 8.99951C17.6259 13.7645 13.7635 17.6269 8.99855 17.6269ZM8.99855 15.9015C10.8291 15.9015 12.5846 15.1743 13.879 13.8799C15.1733 12.5856 15.9005 10.83 15.9005 8.99951C15.9005 7.16901 15.1733 5.41346 13.879 4.1191C12.5846 2.82472 10.8291 2.09756 8.99855 2.09756C7.16803 2.09756 5.4125 2.82472 4.11812 4.1191C2.82376 5.41346 2.09659 7.16901 2.09659 8.99951C2.09659 10.83 2.82376 12.5856 4.11812 13.8799C5.4125 15.1743 7.16803 15.9015 8.99855 15.9015ZM9.8613 8.99951H13.3123V10.725H8.1358V4.68579H9.8613V8.99951Z"
                      fill="#F1BA41"
                    />
                  </svg>
                  {englishToBanglaNumbers(
                    calculateRemainingDays(courseData?.chips?.deadline)
                  )}{" "}
                  দিন বাকি
                </div>
                <div className="flex gap-3 mt-6 items-center bg-[#A144FF]/10 px-3 py-2 rounded-xl">
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0943 12.9745V14.807C12.3007 14.5264 11.4514 14.4403 10.6177 14.5561C9.78391 14.6717 8.99011 14.9858 8.30288 15.4719C7.61567 15.9579 7.05511 16.6017 6.66827 17.3492C6.28144 18.0968 6.07963 18.9263 6.07979 19.768L4.32617 19.7671C4.32589 18.6965 4.57073 17.6399 5.04191 16.6785C5.51309 15.717 6.1981 14.8762 7.04447 14.2204C7.89084 13.5647 8.8761 13.1114 9.92476 12.8953C10.9734 12.6791 12.0576 12.7068 13.0943 12.9745ZM11.3407 11.8767C8.43403 11.8767 6.07979 9.52248 6.07979 6.61585C6.07979 3.70922 8.43403 1.35498 11.3407 1.35498C14.2473 1.35498 16.6016 3.70922 16.6016 6.61585C16.6016 9.52248 14.2473 11.8767 11.3407 11.8767ZM11.3407 10.1231C13.2784 10.1231 14.8479 8.5536 14.8479 6.61585C14.8479 4.67809 13.2784 3.1086 11.3407 3.1086C9.40291 3.1086 7.83341 4.67809 7.83341 6.61585C7.83341 8.5536 9.40291 10.1231 11.3407 10.1231ZM16.42 17.939L19.5195 14.8395L20.7602 16.0792L16.42 20.4195L13.3196 17.3191L14.5604 16.0792L16.42 17.939Z"
                      fill="#A144FF"
                    />
                  </svg>
                  {englishToBanglaNumbers(
                    parseInt(courseData?.chips?.total_seats) -
                      courseData?.enrolled
                  )}{" "}
                  টি সিট বাকি
                </div>
              </div>

              <p className="mt-6 text-[#A3A3A3] text-lg">
                {courseData.short_description}
              </p>
              <div className="flex items-center gap-4 mt-20 pb-6 border-b border-gray-300/20">
                <button
                  onClick={() => {
                    changeTab("studyPlan");
                  }}
                  className={`${
                    activeTab.studyPlan
                      ? "text-[#F1BA41] border-[#F1BA41] bg-[#F1BA41]/5"
                      : "text-gray-300/40 border-gray-300/40 hover:text-gray-300/70 hover:border-gray-300/70"
                  } px-4 lg:px-8 py-3 border rounded-full duration-150 ease-in-out text-sm lg:text-base`}
                >
                  স্টাডি প্ল্যান
                </button>{" "}
                <button
                  onClick={() => {
                    changeTab("instructor");
                  }}
                  className={`${
                    activeTab.instructor
                      ? "text-[#F1BA41] border-[#F1BA41] bg-[#F1BA41]/5"
                      : "text-gray-300/40 border-gray-300/40 hover:text-gray-300/70 hover:border-gray-300/70"
                  } px-4 lg:px-8 py-3 border rounded-full duration-150 ease-in-out text-sm lg:text-base`}
                >
                  ইন্সট্রাক্টর
                </button>{" "}
                <button
                  onClick={() => {
                    changeTab("courseComplete");
                  }}
                  className={`${
                    activeTab.courseComplete
                      ? "text-[#F1BA41] border-[#F1BA41] bg-[#F1BA41]/5"
                      : "text-gray-300/40 border-gray-300/40 hover:text-gray-300/70 hover:border-gray-300/70"
                  } px-4 lg:px-8 py-3 border rounded-full duration-150 ease-in-out text-sm lg:text-base`}
                >
                  কোর্স সম্পর্কে বিস্তারিত
                </button>{" "}
              </div>
              {activeTab.studyPlan && (
                <div>
                  <div className="my-8 flex lg:items-center gap-8 flex-col lg:flex-row ">
                    <p className="text-2xl lg:text-3xl font-semibold">
                      স্টাডি প্ল্যান
                    </p>
                    <div className="flex items-center px-4 py-2 border border-[#B153E0]/50 bg-[#B153E0]/5 gap-4 rounded flex-wrap">
                      <p>
                        {englishToBanglaNumbers(
                          countModulesAssignmentsVideos(courseData).totalModules
                        )}{" "}
                        টি মডিউল
                      </p>

                      <svg
                        width="5"
                        height="5"
                        viewBox="0 0 5 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.829956"
                          y="0.5"
                          width="4"
                          height="4"
                          rx="2"
                          fill="#FFA500"
                        />
                      </svg>
                      <p>
                        {englishToBanglaNumbers(
                          countModulesAssignmentsVideos(courseData)
                            .totalAssignments
                        )}{" "}
                        টি এসাইনমেন্ট
                      </p>
                      <svg
                        width="5"
                        height="5"
                        viewBox="0 0 5 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.829956"
                          y="0.5"
                          width="4"
                          height="4"
                          rx="2"
                          fill="#FFA500"
                        />
                      </svg>
                      <p>
                        {englishToBanglaNumbers(
                          countModulesAssignmentsVideos(courseData).totalVideos
                        )}{" "}
                        টি ভিডিও
                      </p>
                    </div>
                  </div>
                  <div className="">
                    {courseData?.chapters.map((elem: any, index: any) => (
                      <div
                        className={
                          "collapse collapse-plus bg-gray-200 bg-opacity-5  backdrop-blur-lg border border-gray-200/20 mb-6"
                        }
                        key={Math.random()}
                      >
                        <input
                          type="radio"
                          name="my-accordion-3"
                          defaultChecked={index == 0}
                        />
                        <div className="collapse-title  font-medium ">
                          <div className="flex justify-between">
                            <div
                              className="flex gap-4 flex-col lg:flex-row justify-start"
                              style={{ flex: 3 }}
                            >
                              {elem.is_free ? (
                                <div className="">
                                  <div className=" px-2 py-2 rounded-full bg-[#B153E0]/[.14] inline-block">
                                    <p className="px-4 py-1 rounded-full bg-[#B153E0]/[.32] font-bold text-xl inline-block">
                                      {index + 1}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="">
                                  <div className=" px-2 py-2 rounded-full bg-[#FFFFFF]/[.14] inline-block">
                                    <p className="px-4 py-1 rounded-full bg-[#FFFFFF]/[.32] font-bold text-xl inline-block">
                                      {index + 1}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div>
                                <p
                                  className={`text-2xl ${
                                    !elem.is_free && "text-[#565656]"
                                  }`}
                                >
                                  {elem.title}
                                </p>
                                <div className="flex flex-wrap gap-3  lg:items-center mt-3 text-sm font-medium">
                                  <div className="flex items-center gap-3">
                                    <svg
                                      width="13"
                                      height="12"
                                      viewBox="0 0 13 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_261_7601)">
                                        <path
                                          d="M10.46 1C10.736 1 10.96 1.224 10.96 1.5V3.3785L9.95996 4.3785V2H2.95996V10H9.95996V8.621L10.96 7.621V10.5C10.96 10.776 10.736 11 10.46 11H2.45996C2.18396 11 1.95996 10.776 1.95996 10.5V1.5C1.95996 1.224 2.18396 1 2.45996 1H10.46ZM11.349 4.404L12.056 5.111L8.16696 9L7.45896 8.999L7.45996 8.293L11.349 4.404ZM6.95996 6V7H4.45996V6H6.95996ZM8.45996 4V5H4.45996V4H8.45996Z"
                                          fill={
                                            elem.is_free ? "#B153E0" : "#565656"
                                          }
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_261_7601">
                                          <rect
                                            width="12"
                                            height="12"
                                            fill="white"
                                            transform="translate(0.459961)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                    <p
                                      className={` ${
                                        !elem.is_free && "text-[#565656]"
                                      }`}
                                    >
                                      {
                                        countAssignmentsAndVideos(elem.modules)
                                          .assignmentCount
                                      }{" "}
                                      টি অ্যাসাইনমেন্ট{" "}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <svg
                                      width="13"
                                      height="12"
                                      viewBox="0 0 13 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.37 1H10.87C11.0026 1 11.1298 1.05268 11.2236 1.14645C11.3173 1.24021 11.37 1.36739 11.37 1.5V10.5C11.37 10.6326 11.3173 10.7598 11.2236 10.8536C11.1298 10.9473 11.0026 11 10.87 11H2.87C2.73739 11 2.61021 10.9473 2.51645 10.8536C2.42268 10.7598 2.37 10.6326 2.37 10.5V1.5C2.37 1.36739 2.42268 1.24021 2.51645 1.14645C2.61021 1.05268 2.73739 1 2.87 1H4.37V0H5.37V1H8.37V0H9.37V1ZM9.37 2V3H8.37V2H5.37V3H4.37V2H3.37V10H10.37V2H9.37ZM4.37 4H9.37V5H4.37V4ZM4.37 6H9.37V7H4.37V6Z"
                                        fill={
                                          elem.is_free ? "#B153E0" : "#565656"
                                        }
                                      />
                                    </svg>
                                    <p
                                      className={` ${
                                        !elem.is_free && "text-[#565656]"
                                      }`}
                                    >
                                      {
                                        countAssignmentsAndVideos(elem.modules)
                                          .videoCount
                                      }{" "}
                                      টি ভিডিও
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              {elem.is_free ? (
                                <p
                                  className="px-4 py-1 text-[#1CAB55] bg-[#1CAB55]/10 rounded-full text-sm"
                                  style={{ flex: 1 }}
                                >
                                  ফ্রি দেখুন
                                </p>
                              ) : (
                                <svg
                                  width="18"
                                  height="21"
                                  viewBox="0 0 18 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 13.5V15.5M3 19.5H15C16.1046 19.5 17 18.6046 17 17.5V11.5C17 10.3954 16.1046 9.5 15 9.5H3C1.89543 9.5 1 10.3954 1 11.5V17.5C1 18.6046 1.89543 19.5 3 19.5ZM13 9.5V5.5C13 3.29086 11.2091 1.5 9 1.5C6.79086 1.5 5 3.29086 5 5.5V9.5H13Z"
                                    stroke="#2E2E2E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="collapse-content   border-t border-gray-300/20 ">
                          <div className="pt-6"></div>
                          {elem.modules.map((module: any) => (
                            <div
                              className="flex gap-4 items-center mb-4"
                              key={Math.random()}
                            >
                              {module.data.category == "VIDEO" && (
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 20.5C15.523 20.5 20 16.023 20 10.5C20 4.977 15.523 0.5 10 0.5C4.477 0.5 0 4.977 0 10.5C0 16.023 4.477 20.5 10 20.5Z"
                                    fill={elem.is_free ? "#B153E0" : "#565656"}
                                  />
                                  <path
                                    d="M14.2164 11.3862C14.7194 10.9382 14.7194 10.0622 14.2164 9.61419C12.7337 8.28108 11.0347 7.21042 9.19235 6.44819L8.86235 6.31319C8.22935 6.05319 7.56235 6.54719 7.47635 7.30019C7.23705 9.42681 7.23705 11.5736 7.47635 13.7002C7.56135 14.4532 8.22935 14.9462 8.86235 14.6872L9.19235 14.5522C11.0347 13.7899 12.7337 12.7193 14.2164 11.3862Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                              {module.data.category == "ASSIGNMENT" && (
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5Z"
                                    fill={elem.is_free ? "#B153E0" : "#565656"}
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.85422 5.5H12.0442C13.5892 5.5 14.4492 6.39 14.4492 7.915V13.08C14.4492 14.63 13.5892 15.5 12.0452 15.5H7.85422C6.33422 15.5 5.44922 14.63 5.44922 13.08V7.915C5.44922 6.39 6.33422 5.5 7.85422 5.5ZM7.98922 7.83V7.825H9.48322C9.58732 7.825 9.68715 7.86635 9.76076 7.93996C9.83437 8.01357 9.87572 8.1134 9.87572 8.2175C9.87572 8.3216 9.83437 8.42143 9.76076 8.49504C9.68715 8.56865 9.58732 8.61 9.48322 8.61H7.98922C7.88578 8.61 7.78659 8.56891 7.71345 8.49577C7.64031 8.42263 7.59922 8.32343 7.59922 8.22C7.59922 8.11657 7.64031 8.01737 7.71345 7.94423C7.78659 7.87109 7.88578 7.83 7.98922 7.83ZM7.98922 10.87H11.9092C12.0127 10.87 12.1119 10.8289 12.185 10.7558C12.2581 10.6826 12.2992 10.5834 12.2992 10.48C12.2992 10.3766 12.2581 10.2774 12.185 10.2042C12.1119 10.1311 12.0127 10.09 11.9092 10.09H7.98922C7.88578 10.09 7.78659 10.1311 7.71345 10.2042C7.64031 10.2774 7.59922 10.3766 7.59922 10.48C7.59922 10.5834 7.64031 10.6826 7.71345 10.7558C7.78659 10.8289 7.88578 10.87 7.98922 10.87ZM7.98922 13.155H11.9092C12.1092 13.135 12.2592 12.965 12.2592 12.765C12.2605 12.6674 12.2254 12.5728 12.1606 12.4998C12.0959 12.4267 12.0063 12.3804 11.9092 12.37H7.98922C7.91552 12.3629 7.84131 12.3766 7.77497 12.4095C7.70864 12.4423 7.65281 12.4931 7.61381 12.556C7.5748 12.619 7.55417 12.6915 7.55424 12.7656C7.55431 12.8396 7.57509 12.9121 7.61422 12.975C7.69422 13.1 7.83922 13.175 7.98922 13.155Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                              {module.data.category == "QUIZ" && (
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5Z"
                                    fill={elem.is_free ? "#B153E0" : "#565656"}
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.85422 5.5H12.0442C13.5892 5.5 14.4492 6.39 14.4492 7.915V13.08C14.4492 14.63 13.5892 15.5 12.0452 15.5H7.85422C6.33422 15.5 5.44922 14.63 5.44922 13.08V7.915C5.44922 6.39 6.33422 5.5 7.85422 5.5ZM7.98922 7.83V7.825H9.48322C9.58732 7.825 9.68715 7.86635 9.76076 7.93996C9.83437 8.01357 9.87572 8.1134 9.87572 8.2175C9.87572 8.3216 9.83437 8.42143 9.76076 8.49504C9.68715 8.56865 9.58732 8.61 9.48322 8.61H7.98922C7.88578 8.61 7.78659 8.56891 7.71345 8.49577C7.64031 8.42263 7.59922 8.32343 7.59922 8.22C7.59922 8.11657 7.64031 8.01737 7.71345 7.94423C7.78659 7.87109 7.88578 7.83 7.98922 7.83ZM7.98922 10.87H11.9092C12.0127 10.87 12.1119 10.8289 12.185 10.7558C12.2581 10.6826 12.2992 10.5834 12.2992 10.48C12.2992 10.3766 12.2581 10.2774 12.185 10.2042C12.1119 10.1311 12.0127 10.09 11.9092 10.09H7.98922C7.88578 10.09 7.78659 10.1311 7.71345 10.2042C7.64031 10.2774 7.59922 10.3766 7.59922 10.48C7.59922 10.5834 7.64031 10.6826 7.71345 10.7558C7.78659 10.8289 7.88578 10.87 7.98922 10.87ZM7.98922 13.155H11.9092C12.1092 13.135 12.2592 12.965 12.2592 12.765C12.2605 12.6674 12.2254 12.5728 12.1606 12.4998C12.0959 12.4267 12.0063 12.3804 11.9092 12.37H7.98922C7.91552 12.3629 7.84131 12.3766 7.77497 12.4095C7.70864 12.4423 7.65281 12.4931 7.61381 12.556C7.5748 12.619 7.55417 12.6915 7.55424 12.7656C7.55431 12.8396 7.57509 12.9121 7.61422 12.975C7.69422 13.1 7.83922 13.175 7.98922 13.155Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                              {module.data.category == "CODE" && (
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5Z"
                                    fill={elem.is_free ? "#B153E0" : "#565656"}
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.85422 5.5H12.0442C13.5892 5.5 14.4492 6.39 14.4492 7.915V13.08C14.4492 14.63 13.5892 15.5 12.0452 15.5H7.85422C6.33422 15.5 5.44922 14.63 5.44922 13.08V7.915C5.44922 6.39 6.33422 5.5 7.85422 5.5ZM7.98922 7.83V7.825H9.48322C9.58732 7.825 9.68715 7.86635 9.76076 7.93996C9.83437 8.01357 9.87572 8.1134 9.87572 8.2175C9.87572 8.3216 9.83437 8.42143 9.76076 8.49504C9.68715 8.56865 9.58732 8.61 9.48322 8.61H7.98922C7.88578 8.61 7.78659 8.56891 7.71345 8.49577C7.64031 8.42263 7.59922 8.32343 7.59922 8.22C7.59922 8.11657 7.64031 8.01737 7.71345 7.94423C7.78659 7.87109 7.88578 7.83 7.98922 7.83ZM7.98922 10.87H11.9092C12.0127 10.87 12.1119 10.8289 12.185 10.7558C12.2581 10.6826 12.2992 10.5834 12.2992 10.48C12.2992 10.3766 12.2581 10.2774 12.185 10.2042C12.1119 10.1311 12.0127 10.09 11.9092 10.09H7.98922C7.88578 10.09 7.78659 10.1311 7.71345 10.2042C7.64031 10.2774 7.59922 10.3766 7.59922 10.48C7.59922 10.5834 7.64031 10.6826 7.71345 10.7558C7.78659 10.8289 7.88578 10.87 7.98922 10.87ZM7.98922 13.155H11.9092C12.1092 13.135 12.2592 12.965 12.2592 12.765C12.2605 12.6674 12.2254 12.5728 12.1606 12.4998C12.0959 12.4267 12.0063 12.3804 11.9092 12.37H7.98922C7.91552 12.3629 7.84131 12.3766 7.77497 12.4095C7.70864 12.4423 7.65281 12.4931 7.61381 12.556C7.5748 12.619 7.55417 12.6915 7.55424 12.7656C7.55431 12.8396 7.57509 12.9121 7.61422 12.975C7.69422 13.1 7.83922 13.175 7.98922 13.155Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                              <p className="text-[#737373] text-base">
                                {module.data.category == "VIDEO" && "Video:"}{" "}
                                {module.data.category == "ASSIGNMENT" &&
                                  "Assignment:"}{" "}
                                {module.data.category == "CODE" && "Code:"}{" "}
                                {module.data.category == "QUIZ" && "Quiz:"}{" "}
                                {module.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab.instructor && (
                <div className="py-12 relative">
                  <svg
                    viewBox="0 0 904 1160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -left-[200px] -top-[200px] h-full w-full "
                    style={{ zIndex: "-1" }}
                  >
                    <g filter="url(#filter0_f_261_7930)">
                      <ellipse
                        cx="268.669"
                        cy="580.032"
                        rx="136.757"
                        ry="76.9931"
                        transform="rotate(-10.6934 268.669 580.032)"
                        fill="#B153E0"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_261_7930"
                        x="-366.482"
                        y="0.212158"
                        width="1270.3"
                        height="1159.64"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="250"
                          result="effect1_foregroundBlur_261_7930"
                        />
                      </filter>
                    </defs>
                  </svg>

                  <h2 className="text-2xl lg:text-4xl font-semibold pb-12 relative z-10">
                    কোর্স ইন্সট্রাক্টর
                  </h2>
                  {courseData.instructor_list.instructors.map((instructor) => (
                    <div
                      className="rounded-xl cursor-pointer border border-purple/0 hover:border-purple/30 duration-150 ease-in-out z-10"
                      key={Math.random()}
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(202, 101, 253, 0.13) 0%, rgba(177, 83, 224, 0.00) 100%)",
                      }}
                    >
                      <div
                        className=" rounded-xl px-4 lg:px-12  py-4  mx-[1px] bg-[#0B060D]/30 relative top-[1px]"
                        style={{}}
                      >
                        <div className="flex  gap-4  justify-between items-center">
                          <div className="flex flex-col md:flex-row md:items-center gap-8 ">
                            <img
                              src="/Frame 1000004442.png"
                              alt=""
                              className="max-w-[100px]"
                            />
                            <div>
                              <p className="text-xl">{instructor.name}</p>
                              <p className="text-sm text-paragraph font-thin mt-1">
                                {instructor.credibility
                                  .split("\n")
                                  .map((elem: any) => (
                                    <>
                                      {elem}
                                      <br />
                                    </>
                                  ))}
                              </p>
                            </div>
                          </div>
                          <BsChevronRight color="#B153E0" size={24} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab.courseComplete && (
                <div>
                  <h2 className="text-2xl lg:text-4xl font-semibold pt-12 border-t border-gray-300/10  relative z-10">
                    কোর্স সম্পর্কে বিস্তারিত
                  </h2>
                  <div className="flex gap-8 items-center pb-6 border-b border-gray-300/10  relative z-10">
                    <div className="flex gap-3 mt-6 items-center bg-[#FFF1E9]/20 px-3 py-2 rounded-xl">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99855 17.6269C4.23361 17.6269 0.371094 13.7645 0.371094 8.99951C0.371094 4.23457 4.23361 0.37207 8.99855 0.37207C13.7635 0.37207 17.6259 4.23457 17.6259 8.99951C17.6259 13.7645 13.7635 17.6269 8.99855 17.6269ZM8.99855 15.9015C10.8291 15.9015 12.5846 15.1743 13.879 13.8799C15.1733 12.5856 15.9005 10.83 15.9005 8.99951C15.9005 7.16901 15.1733 5.41346 13.879 4.1191C12.5846 2.82472 10.8291 2.09756 8.99855 2.09756C7.16803 2.09756 5.4125 2.82472 4.11812 4.1191C2.82376 5.41346 2.09659 7.16901 2.09659 8.99951C2.09659 10.83 2.82376 12.5856 4.11812 13.8799C5.4125 15.1743 7.16803 15.9015 8.99855 15.9015ZM9.8613 8.99951H13.3123V10.725H8.1358V4.68579H9.8613V8.99951Z"
                          fill="#F1BA41"
                        />
                      </svg>
                      {englishToBanglaNumbers(
                        calculateRemainingDays(courseData?.chips?.deadline)
                      )}{" "}
                      দিন বাকি
                    </div>
                    <div className="flex gap-3 mt-6 items-center bg-[#A144FF]/10 px-3 py-2 rounded-xl">
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0943 12.9745V14.807C12.3007 14.5264 11.4514 14.4403 10.6177 14.5561C9.78391 14.6717 8.99011 14.9858 8.30288 15.4719C7.61567 15.9579 7.05511 16.6017 6.66827 17.3492C6.28144 18.0968 6.07963 18.9263 6.07979 19.768L4.32617 19.7671C4.32589 18.6965 4.57073 17.6399 5.04191 16.6785C5.51309 15.717 6.1981 14.8762 7.04447 14.2204C7.89084 13.5647 8.8761 13.1114 9.92476 12.8953C10.9734 12.6791 12.0576 12.7068 13.0943 12.9745ZM11.3407 11.8767C8.43403 11.8767 6.07979 9.52248 6.07979 6.61585C6.07979 3.70922 8.43403 1.35498 11.3407 1.35498C14.2473 1.35498 16.6016 3.70922 16.6016 6.61585C16.6016 9.52248 14.2473 11.8767 11.3407 11.8767ZM11.3407 10.1231C13.2784 10.1231 14.8479 8.5536 14.8479 6.61585C14.8479 4.67809 13.2784 3.1086 11.3407 3.1086C9.40291 3.1086 7.83341 4.67809 7.83341 6.61585C7.83341 8.5536 9.40291 10.1231 11.3407 10.1231ZM16.42 17.939L19.5195 14.8395L20.7602 16.0792L16.42 20.4195L13.3196 17.3191L14.5604 16.0792L16.42 17.939Z"
                          fill="#A144FF"
                        />
                      </svg>
                      {englishToBanglaNumbers(
                        parseInt(courseData?.chips?.total_seats) -
                          courseData?.enrolled
                      )}{" "}
                      টি সিট বাকি
                    </div>
                  </div>
                  <p className="mt-6 text-[#A3A3A3] text-lg  relative z-10">
                    {courseData.description}
                  </p>
                  <div className=" pt-8 border-t border-gray-300/10 pb-8">
                    <p className="text-2xl lg:text-4xl pb-8 font-semibold">
                      শিক্ষার্থীরা যা বলছ
                    </p>

                    <div className="max-w-[80vw] lg:max-w-[40vw] lgXl:max-w-[50vw] mx-auto">
                      <Slider {...settings}>
                        {courseData.feedback_list.feedbacks.map(
                          (feedback: any) => (
                            <div
                              className="bg-gray-300/10 backdrop-blur-lg rounded-lg p-6 "
                              key={Math.random()}
                            >
                              <svg
                                width="34"
                                height="23"
                                viewBox="0 0 34 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_25_7047)">
                                  <path
                                    d="M8.01195 8.3856C8.75922 7.05093 10.1173 5.6158 12.4273 4.24813C13.0727 3.88147 13.4804 3.21413 13.4804 2.51307C13.4804 1.07793 11.9859 0.076932 10.6277 0.677532C6.72055 2.37887 0.166016 6.61753 0.166016 15.3926C0.166016 19.3299 3.39268 22.5001 7.36662 22.5001C11.3405 22.5001 14.6009 19.3299 14.6009 15.3926C14.6009 11.7223 11.7138 8.71927 8.01195 8.3856Z"
                                    fill="#F1BA41"
                                  />
                                </g>
                                <g clipPath="url(#clip1_25_7047)">
                                  <path
                                    d="M27.0119 8.3856C27.7592 7.05093 29.1173 5.6158 31.4273 4.24813C32.0727 3.88147 32.4804 3.21413 32.4804 2.51307C32.4804 1.07793 30.9859 0.076932 29.6277 0.677532C25.7205 2.37887 19.166 6.61753 19.166 15.3926C19.166 19.3299 22.3927 22.5001 26.3666 22.5001C30.3405 22.5001 33.6009 19.3299 33.6009 15.3926C33.6009 11.7223 30.7138 8.71927 27.0119 8.3856Z"
                                    fill="#F1BA41"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_25_7047">
                                    <rect
                                      width="15"
                                      height="22"
                                      fill="white"
                                      transform="translate(0 0.5)"
                                    />
                                  </clipPath>
                                  <clipPath id="clip1_25_7047">
                                    <rect
                                      width="15"
                                      height="22"
                                      fill="white"
                                      transform="translate(19 0.5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>

                              <p className="py-8 text-xl text-paragraph">
                                {feedback.description}
                              </p>
                              <div className="flex gap-4">
                                <img
                                  src={feedback.imageUploadedLink}
                                  alt=""
                                  className="rounded-full"
                                />
                                <div>
                                  <p className="text-xl">{feedback.name}</p>
                                  <p className="text-paragraph">
                                    {feedback.bio}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </Slider>
                    </div>
                  </div>

                  <div className=" pt-8 border-t border-gray-300/10 relative">
                    <svg
                      viewBox="0 0 852 1192"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -top-[200px] -left-[200px] h-full"
                      style={{ zIndex: "-1" }}
                    >
                      <g filter="url(#filter0_f_275_7266)">
                        <ellipse
                          cx="189.598"
                          cy="595.691"
                          rx="163.368"
                          ry="91.9748"
                          transform="rotate(-10.6934 189.598 595.691)"
                          fill="#DE9931"
                          fillOpacity="0.75"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_275_7266"
                          x="-471.852"
                          y="0.339355"
                          width="1322.9"
                          height="1190.7"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="250"
                            result="effect1_foregroundBlur_275_7266"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-xl lg:text-3xl mb-8 font-semibold">
                      সচরাচর জানতে চাও প্রশ্নের উত্তর
                    </p>
                    {courseData.faq_list.faqs.map((faq: any, index: any) => (
                      <div
                        className="collapse collapse-plus bg-gray-200 bg-opacity-5  backdrop-blur-lg border border-gray-200/20 mb-4"
                        key={Math.random()}
                      >
                        <input
                          type="radio"
                          name="my-accordion-4"
                          defaultChecked={index == 0}
                        />
                        <div className="collapse-title text-xl font-medium">
                          {faq.question}
                        </div>
                        <div className="collapse-content">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="p-4  text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl rounded-b-none  ">
                <iframe
                  className="rounded-xl w-full min-h-[200px] lg:min-h-[260px]"
                  src={courseData.intro_video}
                  title="How do we scale web applications?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-2 justify-between py-8 border-b border-gray-300/20">
                  <div className="flex items-center gap-4">
                    <p className="text-purple line-through font-semibold text-lg">
                      {englishToBanglaNumbers(courseData.x_price)}/-
                    </p>
                    <p className="text-4xl font-bold mr-8">
                      {" "}
                      {englishToBanglaNumbers(courseData.price)}/-
                    </p>
                  </div>
                  <div className="flex gap-3 ">
                    <div className="flex items-center gap-2">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.64062 2.83333H9.64063M5.64063 1.5V2.83333M6.33942 9.16667C5.32118 8.11186 4.49444 6.87097 3.9152 5.5M7.97396 11.5H12.6406M6.97396 13.5L10.3073 6.83333L13.6406 13.5M8.14138 2.83333C7.496 6.68015 5.02042 9.90636 1.64062 11.586"
                          stroke="#B153E0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>{courseData.language}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        width="15"
                        height="13"
                        viewBox="0 0 15 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6733 11.8332H14.0067V10.4998C14.0067 9.39527 13.1112 8.49984 12.0067 8.49984C11.3696 8.49984 10.8021 8.7977 10.4358 9.26176M10.6733 11.8332H4.00667M10.6733 11.8332V10.4998C10.6733 10.0623 10.5891 9.64454 10.4358 9.26176M4.00667 11.8332H0.67334V10.4998C0.67334 9.39527 1.56877 8.49984 2.67334 8.49984C3.31041 8.49984 3.87791 8.7977 4.24417 9.26176M4.00667 11.8332V10.4998C4.00667 10.0623 4.09096 9.64454 4.24417 9.26176M4.24417 9.26176C4.73567 8.03385 5.93655 7.1665 7.34001 7.1665C8.74346 7.1665 9.94434 8.03385 10.4358 9.26176M9.34001 3.1665C9.34001 4.27107 8.44458 5.1665 7.34001 5.1665C6.23544 5.1665 5.34001 4.27107 5.34001 3.1665C5.34001 2.06193 6.23544 1.1665 7.34001 1.1665C8.44458 1.1665 9.34001 2.06193 9.34001 3.1665ZM13.34 5.1665C13.34 5.90288 12.7431 6.49984 12.0067 6.49984C11.2703 6.49984 10.6733 5.90288 10.6733 5.1665C10.6733 4.43012 11.2703 3.83317 12.0067 3.83317C12.7431 3.83317 13.34 4.43012 13.34 5.1665ZM4.00667 5.1665C4.00667 5.90288 3.40972 6.49984 2.67334 6.49984C1.93696 6.49984 1.34001 5.90288 1.34001 5.1665C1.34001 4.43012 1.93696 3.83317 2.67334 3.83317C3.40972 3.83317 4.00667 4.43012 4.00667 5.1665Z"
                          stroke="#B153E0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>{englishToBanglaNumbers(courseData.enrolled)} জন</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg mt-8">এই কোর্সে আপনি পাচ্ছেন</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-y-3 gap-x-16">
                  {courseData.you_get.you_get.split(",").map((item: any) => (
                    <div
                      className="flex gap-2 items-center"
                      key={Math.random()}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="min-w-[16px] min-h-[16px]"
                      >
                        <g opacity="0.7">
                          <path
                            d="M8.00065 14.6663C4.31865 14.6663 1.33398 11.6817 1.33398 7.99967C1.33398 4.31767 4.31865 1.33301 8.00065 1.33301C11.6827 1.33301 14.6673 4.31767 14.6673 7.99967C14.6673 11.6817 11.6827 14.6663 8.00065 14.6663ZM8.00065 13.333C9.41512 13.333 10.7717 12.7711 11.7719 11.7709C12.7721 10.7707 13.334 9.41414 13.334 7.99967C13.334 6.58519 12.7721 5.22863 11.7719 4.22844C10.7717 3.22824 9.41512 2.66634 8.00065 2.66634C6.58616 2.66634 5.22961 3.22824 4.22942 4.22844C3.22922 5.22863 2.66732 6.58519 2.66732 7.99967C2.66732 9.41414 3.22922 10.7707 4.22942 11.7709C5.22961 12.7711 6.58616 13.333 8.00065 13.333ZM7.33598 10.6663L4.50732 7.83767L5.44998 6.89501L7.33598 8.78101L11.1067 5.00967L12.05 5.95234L7.33598 10.6663Z"
                            fill="#B153E0"
                          />
                        </g>
                      </svg>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                {courseData.isTaken ? (
                  <Link
                    href="/course/12"
                    className=" flex justify-center items-center bg-[#1CAB55] py-3 w-full mt-8 rounded-xl hover:bg-opacity-50 ease-in-out duration-150"
                  >
                    কোর্সে যান
                  </Link>
                ) : (
                  <button
                    onClick={buyCourse}
                    className="bg-[#1CAB55] py-3 w-full mt-8 rounded-xl hover:bg-opacity-50 ease-in-out duration-150"
                  >
                    কোর্সটি কিনুন
                  </button>
                )}
              </div>
              <div className="bg-gray-300/10   flex items-center justify-between gap-8 py-3 px-4 lg:px-6 rounded-xl rounded-t-none">
                <p className="text-sm">কোর্সটি সম্পর্কে বিস্তারিত জানত</p>
                <a
                  href="tel:+4733378901"
                  className="flex items-center bg-gray-300/10 p-2 rounded-lg gap-3 hover:bg-gray-300/5 ease-in-out duration-150 text-sm"
                >
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6005 10.8429L10.538 9.53042C10.4072 9.47466 10.2618 9.46291 10.1237 9.49694C9.98562 9.53097 9.86232 9.60893 9.77238 9.71909L8.41613 11.3761C6.28762 10.3725 4.57467 8.65959 3.57109 6.53108L5.22813 5.17483C5.33851 5.08505 5.41663 4.96176 5.45067 4.82361C5.48472 4.68547 5.47283 4.53999 5.4168 4.40921L4.1043 1.34671C4.0428 1.20572 3.93405 1.09062 3.79678 1.02123C3.65951 0.951848 3.50233 0.932537 3.35234 0.966627L0.508594 1.62288C0.363992 1.65627 0.234977 1.73769 0.142607 1.85385C0.0502374 1.97 -3.33104e-05 2.11404 1.65599e-08 2.26245C1.65599e-08 9.27612 5.68477 14.9499 12.6875 14.9499C12.836 14.95 12.9801 14.8998 13.0963 14.8074C13.2125 14.715 13.2939 14.586 13.3273 14.4414L13.9836 11.5976C14.0175 11.4469 13.9977 11.2891 13.9278 11.1513C13.8579 11.0136 13.7422 10.9045 13.6005 10.8429Z"
                      fill="#1CAB55"
                    />
                  </svg>
                  ফোন করুন <span className="hidden lg:block">(16910)</span>
                </a>
              </div>
            </div>
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
