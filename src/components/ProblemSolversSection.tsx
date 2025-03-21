import React from "react";
import Link from "next/link";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { getTopSuccessStories, SuccessStory } from "@/data/successStories";

// Get top 3 success stories
const topSuccessStories = getTopSuccessStories(3);

const ProblemSolversSection = () => {
  return (
    <div className="py-16 bg-white dark:bg-[#0B060D] w-full">
      <div className="w-[90%] lgXl:w-[80%] mx-auto">
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heading dark:text-darkHeading mb-4">
              প্রবলেম সল্ভারস ক্লাব🔥
            </h2>
            <p className="text-paragraph dark:text-darkParagraph text-lg max-w-3xl mx-auto">
              অনলাইনে কম্পিটিটিভ প্রোগ্রামিং কোর্স ফিনিশ করে ছাত্রদেরকে একটা
              স্পেশাল প্রগ্রাম দিয়ে প্রবলেম সল্ভারস ক্লাবে জয়েন হতে হয়।
              সেখানে ৬-৮ মাসের রেগুলারিজম ট্রেনিং করাটিং করে যে সকল ছাত্র
              বিভিন্ন অনলাইন জাজে লাভ এচিভ করছে তাদের একাংশ --
            </p>
          </div>
        </AnimationOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {topSuccessStories.map((story: SuccessStory) => (
            <AnimationOnScroll
              key={story.id}
              animateIn="animate__fadeInUp"
              delay={story.id * 100}
            >
              <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-md border border-gray-200/20 dark:border-gray-700/20 transition-all hover:shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                    Batch - {story.batch}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    {story.codeforces?.rating} ⭐
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-purple/10 mb-4">
                    <img
                      src={`https://via.placeholder.com/96x96?text=${story.name.charAt(0)}`}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-heading dark:text-darkHeading mb-2 text-center">
                    {story.name}
                  </h3>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-paragraph dark:text-darkParagraph">
                        Codeforces
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-bold bg-purple/10 text-purple px-2 py-1 rounded">
                        {story.codeforces?.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/success-story"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple to-[#8A2BE2] rounded-lg font-medium hover:opacity-90 transition-all"
          >
            সকল প্রবলেম সল্ভারস দেখুন
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolversSection;
