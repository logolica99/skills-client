import Nav from "@/components/Nav";
import { HindSiliguri } from "@/pages";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Editor from "@monaco-editor/react";
import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@/Contexts/UserContext";
import { BACKEND_URL } from "@/api.config";
import axios from "axios";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const testCases = ["[1,23,4]", "[33,35]"];

export default function CourseDetailsPage() {
  const codeString =
    "Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]] \nOutput: 2\nExplanation: There is one obstacle in the middle of the 3x3 grid above.\nThere are two ways to reach the bottom-right corner:\n1. Right -> Right -> Down -> Down\n2. Down -> Down -> Right -> Right";
  const router = useRouter();
  const [testCaseTab, setTestCaseTab] = useState({
    testcase: true,
    result: false,
  });

  const [resultData, setResultData] = useState<any>({
    title: "Run Or Submit the problem first",
    message: {},
  });

  const [problemTab, setProblemTab] = useState({
    problem: true,
    editorial: false,
  });

  const [user, setUser] = useContext<any>(UserContext);

  const changeTestCaseTab = (tabName: string) => {
    let temp: any = {
      testcase: false,
      result: false,
    };
    temp[tabName] = true;

    setTestCaseTab(temp);
  };
  const changeProblemTab = (tabName: string) => {
    let temp: any = {
      problem: false,
      editorial: false,
    };
    temp[tabName] = true;

    setProblemTab(temp);
  };

  const submitProgress = (module_id: any) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BACKEND_URL}/user/module/addProgress/${module_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const [code, setCode] = useState<any>({
    java: ` class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!"); 
        }
    }`,
    python: `print("hello World")`,
    cpp: `#include<bits/stdc++.h>
using namespace std; 
    
int main(){
    
    
}`,
  });

  const [language, setLanguage] = useState("cpp");

  const [activeTestCase, setActiveTestCase] = useState(0);
  const [problemData, setProblemData] = useState<any>({});

  const languageIds: any = {
    cpp: 76,
    python: 71,
    java: 91,
  };

  const fetchModule = () => {
    setUser({ ...user, loading: true });

    const token = localStorage.getItem("token");

    axios
      .get(BACKEND_URL + "/user/module/get/" + router.query.problemId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser({ ...user, loading: false });
        setProblemData(res.data.data[0]);
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    fetchModule();
  }, [router.query.problemId]);

  return (
    <ProtectedRoute>
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
                      result="effect1_foregroundBlur_748_4329"
                    />
                  </filter>
                </defs>
              </svg>

              <div className="text-heading flex-1 lg:h-[89vh] lg:overflow-y-scroll  z-10 customScrollbar">
                <div className="px-4 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  ">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {problemData.title}
                    </h2>
                    {/* <p className="text-lg font-semibold text-green-400 mt-2">
                    Medium
                  </p> */}
                  </div>

                  <div className="flex gap-6 mt-4 border-b border-gray-300/10">
                    <p
                      className={` text-xl font-semibold pb-2 cursor-pointer
                  ${
                    problemTab.problem
                      ? "border-b border-white text-heading"
                      : "text-paragraph/70"
                  }  
                     `}
                      onClick={() => {
                        changeProblemTab("problem");
                      }}
                    >
                      Problem
                    </p>
                    <p
                      className={` text-xl font-semibold pb-2 cursor-pointer
                    ${
                      problemTab.editorial
                        ? "border-b border-white text-heading"
                        : "text-paragraph/70"
                    }  
                       `}
                      onClick={() => {
                        changeProblemTab("editorial");
                      }}
                    >
                      Editorial
                    </p>
                  </div>
                  {problemTab.problem && (
                    <div>
                      <div
                        className="text-xl flex flex-col gap-8 mt-6"
                        dangerouslySetInnerHTML={{
                          __html: problemData?.data?.body,
                        }}
                      ></div>

                      <div className="mt-8">
                        <p className="text-2xl font-semibold mb-2 ">Input</p>
                        <div
                          className="text-xl"
                          dangerouslySetInnerHTML={{
                            __html: problemData?.data?.input,
                          }}
                        ></div>

                        {/* <img src="/robot1.jpg" alt="" className="my-6" />
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    {codeString}
                  </SyntaxHighlighter> */}
                      </div>
                      <div className="mt-8">
                        <p className="text-2xl font-semibold mb-2 ">Output</p>
                        <div
                          className="text-xl"
                          dangerouslySetInnerHTML={{
                            __html: problemData?.data?.output,
                          }}
                        ></div>
                      </div>
                      <div className="mt-8">
                        <p className="text-2xl font-semibold mb-2 ">Example</p>
                        <p className="text-lg font-semibold mb-2 ">Input</p>
                        <div
                          className="text-xl bg-[#282A36] p-4"
                          dangerouslySetInnerHTML={{
                            __html: problemData?.data?.inputSample,
                          }}
                        ></div>
                        <p className="text-lg font-semibold my-4 ">Output</p>
                        <div
                          className="text-xl bg-[#282A36] p-4"
                          dangerouslySetInnerHTML={{
                            __html: problemData?.data?.outputSample,
                          }}
                        ></div>
                      </div>
                      <div className="mt-8">
                        <p className="text-2xl font-semibold mb-2 ">Notes</p>
                        <div
                          className="text-xl"
                          dangerouslySetInnerHTML={{
                            __html: problemData?.data?.notes,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {problemTab.editorial && (
                    <div>
                      <div
                        className="text-xl flex flex-col gap-8 mt-6"
                        dangerouslySetInnerHTML={{
                          __html: problemData?.data?.editorial,
                        }}
                      ></div>
                    </div>
                  )}

                  {/* <div className="mt-8">
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
                </div> */}
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
                      <option className="bg-[#0B060D]" value="cpp">
                        C++
                      </option>

                      <option className="bg-[#0B060D]" value="python">
                        Python
                      </option>
                      <option className="bg-[#0B060D]" value="java">
                        Java
                      </option>
                    </select>
                  </div>
                  <div className="pt-4 bg-[#1e1e1e]">
                    <Editor
                      language={language}
                      value={code[language]}
                      onChange={(e) => setCode({ ...code, [language]: e })}
                      theme="vs-dark"
                      defaultValue=""
                      height="49vh"
                    />
                  </div>
                </div>
                <div className="px-4 py-6 text-heading bg-gray-100/5 backdrop-blur-xl rounded-xl  mt-3">
                  <div className="flex  gap-8 border-b border-gray-300/10">
                    {/* <a
                    className={` text-xl font-semibold pb-2 cursor-pointer border-b  ${
                      testCaseTab.testcase
                        ? "border-white text-heading"
                        : "text-paragraph border-gray-300/0"
                    }`}
                    onClick={() => changeTestCaseTab("testcase")}
                  >
                    Testcase
                  </a> */}
                    <a
                      className={` text-xl font-semibold pb-2 cursor-pointer  border-b  
                 border-white text-heading
                       `}
                      // onClick={() => changeTestCaseTab("result")}
                    >
                      Result
                    </a>
                  </div>

                  <div className="my-3 ">
                    {/* {testCases.map((item, index) => (
                    <div
                      className="px-4 py-2 bg-gray-300/10 rounded-lg hover:bg-gray-300/20 cursor-pointer"
                      key={Math.random() * 1000}
                      onClick={() => {
                        setActiveTestCase(index);
                      }}
                    >
                      <p className="text-lg ">Case {index + 1}</p>
                    </div>
                  ))} */}

                    <p
                      className={` ${
                        resultData.title === "Run Or Submit the problem first"
                          ? "text-gray-400"
                          : resultData.title === "Accepted"
                          ? "text-green-400 font-semibold text-2xl"
                          : "text-red-600 font-semibold text-2xl"
                      }`}
                    >
                      {resultData.title}
                    </p>

                    {resultData.message?.yourOutput && (
                      <div>
                        <p>Input:</p>
                        <p>{resultData.message?.input}</p>
                      </div>
                    )}
                    {resultData.message?.yourOutput && (
                      <div>
                        <p>Expected:</p>
                        <p>{resultData.message?.expectedOutput}</p>
                      </div>
                    )}
                    {resultData.message?.expectedOutput && (
                      <div>
                        <p> Output</p>
                        <p>{resultData.message?.yourOutput}</p>
                      </div>
                    )}

                    <p className="text-gray-400">
                      {resultData.message?.compilerMessage &&
                        resultData.message?.compilerMessage}
                    </p>
                  </div>
                  {/* <div className="mt-">
                  <p>head =</p>
                  <SyntaxHighlighter language="markdown" style={dracula}>
                    {testCases[activeTestCase]}
                  </SyntaxHighlighter>
                </div> */}

                  <div className="flex gap-4 justify-between items-center">
                    <Link
                      href="/course/12"
                      className="py-2 mt-5 px-6 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white text-lg "
                    >
                      Return to Module Page
                    </Link>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setUser({ ...user, loading: true });
                          const token = localStorage.getItem("token");
                          axios
                            .post(
                              BACKEND_URL +
                                "/user/module/compile/" +
                                router.query.problemId,
                              {
                                body: {
                                  language_id: languageIds[language],
                                  test: true,
                                  code: code[language],
                                },
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((res) => {
                              setResultData({
                                ...resultData,
                                title: res.data.data.status,
                                message: res.data.data.message,
                              });
                              setUser({ ...user, loading: false });
                            })
                            .catch((err) => {
                              setUser({ ...user, loading: false });
                            });
                        }}
                        className="py-2  flex gap-2 items-center mt-5 px-6 bg-green-700 hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white text-lg "
                      >
                        <svg
                          width={16}
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
                              d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                              fill="#fff"
                            ></path>{" "}
                          </g>
                        </svg>{" "}
                        Run
                      </button>
                      <button
                        onClick={() => {
                          setUser({ ...user, loading: true });
                          const token = localStorage.getItem("token");
                          axios
                            .post(
                              BACKEND_URL +
                                "/user/module/compile/" +
                                router.query.problemId,
                              {
                                body: {
                                  language_id: languageIds[language],
                                  test: false,
                                  code: code[language],
                                },
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((res) => {
                              setResultData({
                                ...resultData,
                                title: res.data.data.status,
                                message: res.data.data.message,
                              });
                              if (res.data.data.status === "Accepted") {
                                submitProgress(problemData.id);
                              }
                              setUser({ ...user, loading: false });
                            })
                            .catch((err) => {
                              setUser({ ...user, loading: false });
                            });
                        }}
                        className="py-2 mt-5 px-6 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white text-lg "
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
