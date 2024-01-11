import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
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
import { Typography } from "@mui/material";

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

export default function SuccessPage() {
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
      .get(BACKEND_URL + "/user/course/getfull/" + COURSE_ID, {
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
    setTimeout(function () {
      setUser({ ...user, loading: false });
      router.push("/course/12");
    }, 3000);
    // setUser({ ...user, loading: true });
    //   const token = localStorage.getItem("token");
    //   axios
    //     .post(
    //       BACKEND_URL + "/user/course/takes/1",
    //       {},
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //         setTimeout(
    //             function() {
    //                 setUser({ ...user, loading: false });
    //                 router.push("/course/12");
    //             }, 2000);

    //     })
    //     .catch((err) => {
    //       setUser({ ...user, loading: false });
    //     });
  };

  useEffect(() => {
    buyCourse();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">
        কোর্সটি কেনা সফল হয়েছে... অপেক্ষা করুন
      </Typography>
    </div>
  );
}
