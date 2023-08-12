import Nav from "@/components/Nav";
import { HindSiliguri } from "@/pages";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Editor from "@monaco-editor/react";
import { useState } from "react";

const testCases = ["[1,23,4]", "[33,35]"];

export default function CourseDetailsPage() {
  const codeString =
    "Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]] \nOutput: 2\nExplanation: There is one obstacle in the middle of the 3x3 grid above.\nThere are two ways to reach the bottom-right corner:\n1. Right -> Right -> Down -> Down\n2. Down -> Down -> Right -> Right";

  const [testCaseTab, setTestCaseTab] = useState({
    testcase: true,
    result: false,
  });

  const changeTestCaseTab = (tabName: string) => {
    let temp: any = {
      testcase: false,
      result: false,
    };
    temp[tabName] = true;

    setTestCaseTab(temp);
  };

  const [language, setLanguage] = useState("c++");

  const [activeTestCase, setActiveTestCase] = useState(0);

  return (
    <div className={`  ${HindSiliguri.variable} font-hind  `}>
      <Nav></Nav>{" "}
      <div className="pt-16 pb-1 bg-[#0B060D] overflow-x-hidden">
        <div className="w-[98%]  mx-auto pt-8 z-20">
          <div className="flex flex-col lg:flex-row gap-2 justify-between relative">
            <svg
              viewBox="0 0 1215 926"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0 w-full h-full z-0"
            >
              <g filter="url(#filter0_f_748_4329)">
                <ellipse
                  cx="549.662"
                  cy="328.453"
                  rx="167.107"
                  ry="94.0796"
                  transform="rotate(-10.6934 549.662 328.453)"
                  fill="#B153E0"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_748_4329"
                  x="-115.482"
                  y="-269.081"
                  width="1330.29"
                  height="1195.07"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="250"
                    result="effect1_foregroundBlur_748_4329"
                  />
                </filter>
              </defs>
            </svg>

            <div className="text-heading flex-1 lg:h-[89vh] lg:overflow-y-scroll  z-10">
              <div className="px-4 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  ">
                <div>
                  <h2 className="text-2xl font-semibold">
                    63. Unique Paths II
                  </h2>
                  <p className="text-lg font-semibold text-green-400 mt-2">
                    Medium
                  </p>
                </div>
                <div className="text-xl flex flex-col gap-8 mt-6">
                  <p>
                    You are given an m x n integer array grid. There is a robot
                    initially located at the top-left corner (i.e., grid[0][0]).
                    The robot tries to move to the bottom-right corner (i.e.,
                    grid[m - 1][n - 1]). The robot can only move either down or
                    right at any point in time.
                  </p>
                  <p>
                    An obstacle and space are marked as 1 or 0 respectively in
                    grid. A path that the robot takes cannot include any square
                    that is an obstacle.
                  </p>
                  <p>
                    Return the number of possible unique paths that the robot
                    can take to reach the bottom-right corner.
                  </p>
                  <p>
                    The testcases are generated so that the answer will be less
                    than or equal to 2 * 109.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-lg font-semibold  ">Example 1:</p>
                  <img src="/robot1.jpg" alt="" className="my-6" />
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    {codeString}
                  </SyntaxHighlighter>
                </div>
                <div className="mt-8">
                  <p className="text-lg font-semibold  mb-4">Constraints:</p>
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    m == obstacleGrid.length
                  </SyntaxHighlighter>
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    n == obstacleGrid[i].length
                  </SyntaxHighlighter>{" "}
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    {"1 <= m, n <= 100"}
                  </SyntaxHighlighter>
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    obstacleGrid[i][j] is 0 or 1.
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
            <div className="text-heading flex-1 lg:h-[89vh] lg:overflow-y-scroll  z-10 hide-scrollbar">
              <div className="px-4 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  pb-2">
                <div className="mb-4">
                  <select
                    className="select select-bordered w-full max-w-xs bg-gray-100/10"
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                    value={language}
                  >
                    <option className="bg-[#0B060D]" value="c++">
                      C++
                    </option>
                    <option className="bg-[#0B060D]" value="c">
                      C
                    </option>
                    <option className="bg-[#0B060D]" value="python">
                      Python
                    </option>
                    <option className="bg-[#0B060D]" value="javascript">
                      Javascript
                    </option>
                  </select>
                </div>
                <div className="pt-4 bg-[#1e1e1e]">
                  <Editor
                    language={language}
                    theme="vs-dark"
                    defaultValue=""
                    height="49vh"
                  />
                </div>
              </div>
              <div className="px-4 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  mt-3">
                <div className="flex  gap-8 border-b border-gray-300/10">
                  <a
                    className={` text-xl font-semibold pb-2 cursor-pointer border-b  ${
                      testCaseTab.testcase
                        ? "border-white text-heading"
                        : "text-paragraph border-gray-300/0"
                    }`}
                    onClick={() => changeTestCaseTab("testcase")}
                  >
                    Testcase
                  </a>
                  <a
                    className={` text-xl font-semibold pb-2 cursor-pointer  border-b  ${
                      testCaseTab.result
                        ? "border-white text-heading"
                        : "text-paragraph border-gray-300/0"
                    }`}
                    onClick={() => changeTestCaseTab("result")}
                  >
                    Result
                  </a>
                </div>

                <div className="my-3 flex gap-6">
                  {testCases.map((item, index) => (
                    <div
                      className="px-4 py-2 bg-gray-300/10 rounded-lg hover:bg-gray-300/20 cursor-pointer"
                      key={Math.random() * 1000}
                      onClick={() => {
                        setActiveTestCase(index);
                      }}
                    >
                      <p className="text-lg ">Case {index + 1}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-">
                  <p>head =</p>
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    {testCases[activeTestCase]}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
