import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getTopSuccessStories,
  successStories,
  SuccessStory,
} from "@/data/successStories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Get top success stories
const topSuccessStories = getTopSuccessStories(6);

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  dotsClass: "slick-dots custom-dots",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProblemSolversSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-16 bg-white dark:bg-[#0B060D] w-full">
      <div className="w-[90%] lgXl:w-[80%] mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-heading dark:text-darkHeading mb-4">
            Journey to Success 🔥
          </h2>
          <p className="text-paragraph dark:text-darkParagraph text-lg max-w-3xl mx-auto">
            ৫-৬ মাসব্যাপী আমাদের কম্পিটিটিভ প্রোগ্রামিং কোর্সটি সফলভাবে শেষ করার
            পর, বিগত ব্যাচের অনেক শিক্ষার্থীই বিভিন্ন আন্তর্জাতিক ও জাতীয়
            অনলাইন জাজ প্ল্যাটফর্মে অসাধারণ দক্ষতা প্রদর্শন করেছে। আমরা তাদের
            মধ্য থেকে কিছু স্ট্যান্ডআউট পারফর্মারেরদের তুলে ধরছি, যারা কোর্স
            শেষে বাস্তব জাজ প্ল্যাটফর্মে নিজেদের মেধা ও পরিশ্রমের মাধ্যমে প্রমাণ
            করেছে
          </p>
        </div>

        <div className="mt-10">
          <style jsx global>{`
            .custom-dots li button:before {
              color: #999 !important;
            }
            .custom-dots li.slick-active button:before {
              color: #8a2be2 !important;
            }
            .slick-list {
              margin-bottom: 20px;
            }
          `}</style>
          {mounted && (
            <Slider {...settings} className="pb-16">
              {topSuccessStories.map((story: SuccessStory) => (
                <div key={story.id} className="px-2 pb-3">
                  <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-md border border-gray-200/20 dark:border-gray-700/20 transition-all hover:shadow-lg hover:border-purple/50 hover:shadow-purple/20 p-6 h-full min-h-[320px] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                        Batch - {story.batch}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                        {story.codeforces?.rating} ⭐
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-purple/10 mb-4 relative">
                        {story.image && story.image !== "placeholder" ? (
                          <Image
                            src={story.image}
                            alt={story.name}
                            className="object-cover"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-2xl font-bold">
                            {story.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-heading dark:text-darkHeading mb-2 text-center">
                        {story.name}
                      </h3>
                    </div>

                    <div className="mt-4 flex-grow">
                      <div
                        className={`grid ${story.codeforces && story.codechef ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-2`}
                      >
                        {story.codeforces && (
                          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center">
                              <div className="w-5 h-5 mr-2 relative">
                                <Image
                                  src="/assets/success-story/codeforces-96x96.png"
                                  alt="Codeforces"
                                  className="object-contain"
                                  width={20}
                                  height={20}
                                  priority
                                  onError={(e) => {
                                    // @ts-ignore
                                    e.currentTarget.src =
                                      "https://codeforces.org/s/0/favicon-32x32.png";
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium text-paragraph dark:text-darkParagraph">
                                Codeforces
                              </span>
                            </div>
                            <div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-bold bg-purple/10 text-purple px-2 py-1 rounded">
                                  {story.codeforces.rating}
                                </span>
                                {story.codeforces.rankName && (
                                  <span className="text-sm mt-1 font-medium text-paragraph dark:text-darkParagraph">
                                    {story.codeforces.rankName}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {story.codechef && (
                          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center">
                              <div className="w-5 h-5 mr-2 relative">
                                <Image
                                  src="/assets/success-story/codechef-100x100.png"
                                  alt="CodeChef"
                                  className="object-contain"
                                  width={20}
                                  height={20}
                                  priority
                                  onError={(e) => {
                                    // @ts-ignore
                                    e.currentTarget.src =
                                      "https://cdn.codechef.com/images/favicon-32x32.png";
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium text-paragraph dark:text-darkParagraph">
                                CodeChef
                              </span>
                            </div>
                            <div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-bold bg-yellow/10 text-yellow px-2 py-1 rounded">
                                  {story.codechef.rating}
                                </span>
                                {story.codechef.rankName && (
                                  <span className="text-sm mt-1 font-medium text-paragraph dark:text-darkParagraph">
                                    {story.codechef.rankName}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/success-story"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple to-[#8A2BE2] rounded-lg font-medium hover:opacity-90 transition-all"
          >
            সবাইকে দেখো
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
