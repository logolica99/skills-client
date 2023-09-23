import React, { Fragment, useContext, useState } from "react";

type Props = {};

import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "@/Contexts/UserContext";
import { Editor } from "@monaco-editor/react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "@/api.config";

export default function FloatingCompiler({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [language, setLanguage] = useState("cpp");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
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
  const languageIds: any = {
    cpp: 76,
    python: 71,
    java: 91,
  };

  const submitCompiler = () => {
    setButtonLoading(true);
    const token = localStorage.getItem("token");
    axios
      .post(
        BACKEND_URL + "/user/module/quick-compile",
        {
          languageId: languageIds[language],
          input: input,
          code: code[language],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.data.status.description === "Accepted") {
          setOutput(res.data.data.stdout);
        } else if (res.data.data.status.description === "Compilation Error") {
          setOutput("Compilation Error!");
        } else {
          setOutput("Runtime Error!");
        }
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
      });
  };

  return (
    <div>
      <Transition appear show={user.openCompiler} as={Fragment}>
        <Dialog
          as="div"
          className="relative "
          style={{ zIndex: 99999 }}
          onClose={() => {
            setUser({ ...user, openCompiler: false });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-[90vw]  text-darkHeading transform overflow-hidden rounded-2xl bg-[#0B060D]/60 dark:bg-[#0B060D]/30 bg-opacity-30  backdrop-blur-lg border border-gray-200/20 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg font-medium leading-6 "
                  >
                    <div></div>
                  </Dialog.Title>
                  <div className=" flex flex-col-reverse md:flex-row justify-between gap-8">
                    <div className="pt-4 bg-[#1e1e1e]  " style={{ flex: 3 }}>
                      <Editor
                        language={language}
                        value={code[language]}
                        onChange={(e) => setCode({ ...code, [language]: e })}
                        theme="vs-dark"
                        defaultValue=""
                        className="h-[30vh] md:h-[50vh]"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
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
                      <p className="mt-4">Input</p>
                      <textarea
                        className="w-full mt-2 px-3 py-3 rounded mb-2 resize-none bg-gray-200/20 outline-none focus:ring ring-gray-300/80 text-white"
                        placeholder="Input"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />

                      <div>
                        <p>Output</p>
                        <div className="w-full h-[80px] overflow-y-scroll md:h-[160px] mt-2 px-3 py-3 rounded mb-2 bg-gray-200/20  text-white">
                          {output}
                   

                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={submitCompiler}
                          className={`py-2  flex gap-2 items-center  px-6 ${
                            buttonLoading
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-700 cursor-pointer hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80"
                          }    rounded font-semibold text-white text-lg`}
                          disabled={buttonLoading}
                        >
                          {buttonLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
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
                            </svg>
                          )}{" "}
                          Run
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
