import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Contexts/UserContext";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";
import { Toaster } from "react-hot-toast";
import {
  successStories,
  getStoriesByBatch,
  SuccessStory as StoryType,
} from "@/data/successStories";

// Component for Grid View Card
const GridCard = ({ story }: { story: StoryType }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
          Batch - {story.batch}
        </span>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
          {story.codeforces && `${story.codeforces.rating}`} ⭐
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-purple/10 mb-4">
          <img
            src={`https://via.placeholder.com/112x112?text=${story.name.charAt(0)}`}
            alt={story.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-heading dark:text-darkHeading mb-2">
          {story.name}
        </h3>
      </div>

      <div className="mt-4 space-y-2">
        {story.codeforces && (
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
            <div className="flex items-center">
              <span className="text-sm font-medium text-paragraph dark:text-darkParagraph mr-1">
                {story.codeforces.handle}
              </span>
              <span className="text-sm font-bold bg-purple/10 text-purple px-2 py-1 rounded">
                {story.codeforces.rating}
              </span>
            </div>
          </div>
        )}

        {story.codechef && (
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-medium text-paragraph dark:text-darkParagraph">
                CodeChef
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-paragraph dark:text-darkParagraph mr-1">
                {story.codechef.handle}
              </span>
              <span className="text-sm font-bold bg-yellow/10 text-yellow px-2 py-1 rounded">
                {story.codechef.rating}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Component for List View Card
const ListCard = ({ story }: { story: StoryType }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-purple/10">
          <img
            src={`https://via.placeholder.com/96x96?text=${story.name.charAt(0)}`}
            alt={story.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
          <h3 className="text-xl font-semibold text-heading dark:text-darkHeading text-center md:text-left">
            {story.name}
          </h3>

          <div className="flex gap-2 mt-2 md:mt-0 justify-center md:justify-start">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
              Batch - {story.batch}
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              {story.codeforces && `${story.codeforces.rating}`} ⭐
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {story.codeforces && (
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
              <div className="flex items-center">
                <span className="text-sm font-medium text-paragraph dark:text-darkParagraph mr-1">
                  {story.codeforces.handle}
                </span>
                <span className="text-sm font-bold bg-purple/10 text-purple px-2 py-1 rounded">
                  {story.codeforces.rating}
                </span>
              </div>
            </div>
          )}

          {story.codechef && (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-paragraph dark:text-darkParagraph">
                  CodeChef
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-paragraph dark:text-darkParagraph mr-1">
                  {story.codechef.handle}
                </span>
                <span className="text-sm font-bold bg-yellow/10 text-yellow px-2 py-1 rounded">
                  {story.codechef.rating}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const SuccessStory = () => {
  const [user, setUser] = useContext<any>(UserContext);
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(6);
  const [filteredStories, setFilteredStories] = useState(successStories);
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    // Filter stories based on batch selection using our helper function
    setFilteredStories(getStoriesByBatch(selectedBatch));
    // Reset to first page when filter changes
    setCurrentPage(1);
  }, [selectedBatch]);

  // Get current page stories
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(
    indexOfFirstStory,
    indexOfLastStory,
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  return (
    <div className={`${HindSiliguri.variable} font-hind overflow-x-hidden`}>
      <Nav />
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
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M13.2942 7.17041L12.0001 12L10.706 16.8297"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M8.49994 9L8.32837 9.17157C6.99504 10.5049 6.32837 11.1716 6.32837 12C6.32837 12.8284 6.99504 13.4951 8.32837 14.8284L8.49994 15"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </g>
        </svg>
      </button>

      <div className="py-16 bg-white dark:bg-[#000] overflow-x-hidden">
        <div className="w-[90%] lgXl:w-[80%] mx-auto py-12 z-20 min-h-[80vh]">
          {/* Hero Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-heading dark:text-darkHeading mb-4">
              প্রবলেম সল্ভারস ক্লাব🔥
            </h1>
            <p className="text-paragraph dark:text-darkParagraph text-lg max-w-3xl mx-auto">
              অনলাইনে কম্পিটিটিভ প্রোগ্রামিং কোর্স ফিনিশ করে ছাত্রদেরকে একটা
              স্পেশাল প্রগ্রাম দিয়ে প্রবলেম সল্ভারস ক্লাবে জয়েন হতে হয়।
              সেখানে ৬-৮ মাসের রেগুলারিজম ট্রেনিং করাটিং করে যে সকল ছাত্র
              বিভিন্ন অনলাইন জাজে লাভ এচিভ করছে তাদের একাংশ --
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Filter Tabs */}
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setSelectedBatch("all")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  selectedBatch === "all"
                    ? "bg-purple text-white"
                    : "bg-white dark:bg-gray-800 text-paragraph dark:text-darkParagraph border border-gray-200 dark:border-gray-600"
                }`}
              >
                Batch-All
              </button>
              {[2, 3, 4, 5].map((batch) => (
                <button
                  key={batch}
                  onClick={() => setSelectedBatch(batch.toString())}
                  className={`px-4 py-2 text-sm font-medium ${
                    batch === 5 ? "rounded-r-lg" : ""
                  } ${
                    selectedBatch === batch.toString()
                      ? "bg-purple text-white"
                      : "bg-white dark:bg-gray-800 text-paragraph dark:text-darkParagraph border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  Batch-{batch}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 rounded-l-lg ${
                  viewType === "grid"
                    ? "bg-purple text-white"
                    : "bg-white dark:bg-gray-800 text-paragraph dark:text-darkParagraph border border-gray-200 dark:border-gray-600"
                }`}
                aria-label="Grid view"
              >
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 rounded-r-lg ${
                  viewType === "list"
                    ? "bg-purple text-white"
                    : "bg-white dark:bg-gray-800 text-paragraph dark:text-darkParagraph border border-gray-200 dark:border-gray-600"
                }`}
                aria-label="List view"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Problem Solvers Grid/List View */}
          {viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStories.map((story) => (
                <GridCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {currentStories.map((story) => (
                <ListCard key={story.id} story={story} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <nav className="inline-flex items-center">
                <button
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className="p-2 mr-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-paragraph dark:text-darkParagraph disabled:opacity-50"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => paginate(idx + 1)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      currentPage === idx + 1
                        ? "bg-purple text-white"
                        : "bg-white dark:bg-gray-800 text-paragraph dark:text-darkParagraph border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    paginate(
                      currentPage < totalPages ? currentPage + 1 : totalPages,
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 ml-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-paragraph dark:text-darkParagraph disabled:opacity-50"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SuccessStory;
