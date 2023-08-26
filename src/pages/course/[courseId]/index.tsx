import Nav from "@/components/Nav";
import { HindSiliguri } from "@/pages";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";
import {
  calculateRemainingDays,
  countAssignmentsAndVideos,
  englishToBanglaNumbers,
} from "@/helpers";

export default function CourseDetailsPage() {
  const [user, setUser] = useContext<any>(UserContext);

  const [activeModule, setActiveModule] = useState({
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
  });

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

  const isActiveChapter = (chapter: any) => {
    for (module of chapter.modules) {
      if (String(module.id) === String(activeModule.id)) {
        return true;
      }
    }

    return false;
  };

  const fetchCourse = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/course/getfull/3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourseData(res.data);
        setActiveModule(res.data.chapters[0].modules[0]);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  const submitAssignment = () => {};

  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>
      <div className="py-16 bg-[#0B060D] overflow-x-hidden">
        <div className="w-[90%] lgXl:w-[80%] mx-auto py-12 z-20">
          <div className="flex flex-col lg:flex-row gap-24 justify-between relative">
            <svg
              viewBox="0 0 980 892"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute  -top-[70px] -left-[200px] h-full z-0"
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
                {courseData.title}
              </h2>
              {!courseData.isTaken && (
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
              )}
              {courseData.isTaken && (
                <div className="pb-6 border-b border-gray-300/10"></div>
              )}

              <div className="mt-8">
                {activeModule.data.category == "VIDEO" &&
                  activeModule.data.videoHost === "Youtube" && (
                    <iframe
                      className="rounded-xl w-full min-h-[260px]  md:min-h-[400px]  lg:min-h-[500px] "
                      src={activeModule.data.videoUrl}
                      title="How do we scale web applications?"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  )}
                {activeModule.data.category === "ASSIGNMENT" && (
                  <div className=" mx-auto  z-20">
                    <form
                      onSubmit={submitAssignment}
                      className="lg:px-8 px-6 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  mx-auto flex flex-col items-center  gap-4"
                    >
                      <div className="w-full">
                        <p className="text-lg font-semibold mb-1">Github URL</p>
                        <input
                          className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                          placeholder="Github URL"
                          // value={userData.email}
                          required
                          type="email"
                          onChange={(e) => {}}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-lg font-semibold mb-1">
                          Youtube URL
                        </p>
                        <input
                          className="w-full px-3 py-3 rounded bg-gray-200/20 outline-none focus:ring ring-gray-300/80"
                          placeholder="Youtube URL"
                          // value={userData.password}
                          required
                          onChange={(e) => {}}
                        />
                        {/* {errorMsg.length > 0 && (
                            <p className="text-red-500">{errorMsg}</p>
                          )} */}
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="py-2 px-8 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white text-lg "
                        >
                          Submit Assignment
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="mt-12">
                <p className="font-semibold text-2xl pb-4 border-b border-gray-300/10 ">
                  Description
                </p>
                <div
                  className="text-lg pt-6 border-t border-gray-300/10 "
                  dangerouslySetInnerHTML={{
                    __html: activeModule.description,
                  }}
                ></div>
              </div>
            </div>
            <div style={{ flex: 1 }} className="z-10 relative">
              <div className="text-heading">
                {courseData?.chapters.map((elem: any, index: any) => (
                  <div
                  key={Math.random()}
                    className={
                      "collapse collapse-plus bg-gray-200 bg-opacity-5  backdrop-blur-lg border border-gray-200/20 mb-6"
                    }
                  >
                    <input
                      type="radio"
                      name="my-accordion-3"
                      defaultChecked={isActiveChapter(elem)}
                    />
                    <div className="collapse-title  font-medium ">
                      <div className="flex justify-between">
                        <div
                          className="flex gap-4 flex-col lg:flex-row justify-start"
                          style={{ flex: 3 }}
                        >
                          {elem.is_free || courseData.isTaken ? (
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
                                !elem.is_free &&
                                !courseData.isTaken &&
                                "text-[#565656]"
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
                                        elem.is_free || courseData.isTaken
                                          ? "#B153E0"
                                          : "#565656"
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
                                    !elem.is_free &&
                                    !courseData.isTaken &&
                                    "text-[#565656]"
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
                                      elem.is_free || courseData.isTaken
                                        ? "#B153E0"
                                        : "#565656"
                                    }
                                  />
                                </svg>
                                <p
                                  className={` ${
                                    !elem.is_free &&
                                    !courseData.isTaken &&
                                    "text-[#565656]"
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
                          {elem.is_free && (
                            <p
                              className="px-4 py-1 text-[#1CAB55] bg-[#1CAB55]/10 rounded-full text-sm"
                              style={{ flex: 1 }}
                            >
                              ফ্রি দেখুন
                            </p>
                          )}
                          {!elem.is_free && !courseData.isTaken && (
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
                        key={Math.random()}
                          className="flex gap-4 items-center mb-4 "
                          onClick={() => {
                            if (elem.is_free || courseData.isTaken) {
                              if (
                                module.data.category === "ASSIGNMENT" &&
                                courseData.isTaken
                              ) {
                                setActiveModule(module);
                              }
                              if (module.data.category === "VIDEO") {
                                setActiveModule(module);
                              }
                            }
                          }}
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
                                fill={
                                  elem.is_free || courseData.isTaken
                                    ? "#B153E0"
                                    : "#565656"
                                }
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
                                fill={
                                  elem.is_free || courseData.isTaken
                                    ? "#B153E0"
                                    : "#565656"
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.85422 5.5H12.0442C13.5892 5.5 14.4492 6.39 14.4492 7.915V13.08C14.4492 14.63 13.5892 15.5 12.0452 15.5H7.85422C6.33422 15.5 5.44922 14.63 5.44922 13.08V7.915C5.44922 6.39 6.33422 5.5 7.85422 5.5ZM7.98922 7.83V7.825H9.48322C9.58732 7.825 9.68715 7.86635 9.76076 7.93996C9.83437 8.01357 9.87572 8.1134 9.87572 8.2175C9.87572 8.3216 9.83437 8.42143 9.76076 8.49504C9.68715 8.56865 9.58732 8.61 9.48322 8.61H7.98922C7.88578 8.61 7.78659 8.56891 7.71345 8.49577C7.64031 8.42263 7.59922 8.32343 7.59922 8.22C7.59922 8.11657 7.64031 8.01737 7.71345 7.94423C7.78659 7.87109 7.88578 7.83 7.98922 7.83ZM7.98922 10.87H11.9092C12.0127 10.87 12.1119 10.8289 12.185 10.7558C12.2581 10.6826 12.2992 10.5834 12.2992 10.48C12.2992 10.3766 12.2581 10.2774 12.185 10.2042C12.1119 10.1311 12.0127 10.09 11.9092 10.09H7.98922C7.88578 10.09 7.78659 10.1311 7.71345 10.2042C7.64031 10.2774 7.59922 10.3766 7.59922 10.48C7.59922 10.5834 7.64031 10.6826 7.71345 10.7558C7.78659 10.8289 7.88578 10.87 7.98922 10.87ZM7.98922 13.155H11.9092C12.1092 13.135 12.2592 12.965 12.2592 12.765C12.2605 12.6674 12.2254 12.5728 12.1606 12.4998C12.0959 12.4267 12.0063 12.3804 11.9092 12.37H7.98922C7.91552 12.3629 7.84131 12.3766 7.77497 12.4095C7.70864 12.4423 7.65281 12.4931 7.61381 12.556C7.5748 12.619 7.55417 12.6915 7.55424 12.7656C7.55431 12.8396 7.57509 12.9121 7.61422 12.975C7.69422 13.1 7.83922 13.175 7.98922 13.155Z"
                                fill="white"
                              />
                            </svg>
                          )}
                          <p
                            className={`text-base ${
                              (elem.is_free || courseData.isTaken) &&
                              module.data.category === "VIDEO"
                                ? "hover:text-white cursor-pointer"
                                : "cursor-not-allowed"
                            }
                              
                              ${
                                courseData.isTaken &&
                                module.data.category === "ASSIGNMENT"
                                  ? "hover:text-white cursor-pointer"
                                  : "cursor-not-allowed"
                              }
                              ${
                                module.id === activeModule.id
                                  ? "text-white"
                                  : "text-[#737373]"
                              } `}
                          >
                            {module.data.category == "VIDEO" && "Video:"}{" "}
                            {module.data.category == "ASSIGNMENT" &&
                              "Assignment:"}{" "}
                            {module.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0F0812] z-30 relative">
        <div className="w-[90%] lg:w-[80%] mx-auto  text-heading py-20 ">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center">
            <div className="mb-20 lg:mb-0 z-10">
              <img src="/logo.png" alt="" className="w-28 " />
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
