import { BACKEND_URL } from "@/api.config";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGraduationCap, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { CodeBlock, atomOneDark } from "react-code-blocks";

type Props = {
  discussion: any
}

function formatTime(timestamp: any) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${hours}:${minutes}, ${day} ${month}`;
}

// Function to detect and process code blocks in content
const formatContent = (content: string) => {
  // Check if the content appears to be code
  if (
    content.includes('#include') || 
    content.includes('using namespace') || 
    content.includes('int main()') ||
    content.includes('public class') ||
    content.includes('def ') ||
    content.includes('function ') ||
    content.includes('import ') && (
      content.includes('{') && content.includes('}') ||
      content.includes('print') ||
      content.match(/\w+\s*\(\s*\)/)
    )
  ) {
    // Determine language based on content
    let language = "text"; // default
    if (content.includes('#include') || content.includes('using namespace std')) {
      language = "cpp";
    } else if (content.includes('public class') || content.includes('System.out.println')) {
      language = "java";
    } else if (content.includes('def ') || content.includes('print(')) {
      language = "python";
    } else if (content.includes('function') || content.includes('const') || content.includes('let')) {
      language = "javascript";
    }
    
    return (
      <CodeBlock
        text={content}
        language={language}
        theme={atomOneDark}
        showLineNumbers
        customStyle={{
          borderRadius: "5px",
          margin: "0",
          width: "100%"
        }}
      />
    );
  }
  
  // Return normal text if not code
  return content;
};

export default function DiscussionItem({ discussion }: Props) {
  const [active, setActive] = useState(false);
  const [replyCount, setReplyCount] = useState(parseInt(discussion.subdiscussion_count));
  const [reply, setReply] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState<Array<any>>([]);
  const downIcon = (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
    </svg>
  );
  const upIcon = (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
    </svg>
  );
  const [replyIcon, setReplyIcon] = useState(downIcon);

  const fetchSubdiscussions = () => {
    const token = localStorage.getItem("token");

    axios
      .get(BACKEND_URL + `/user/subDiscussion/list/${discussion.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => {});
  };

  const postSubdiscussion = (id: any) => {
    const token = localStorage.getItem("token");
    if (replyText.length > 0) {
      axios
        .post(
          BACKEND_URL + "/user/subDiscussion/create/" + id,
          {
            content: replyText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          fetchSubdiscussions();
          setReply(false);
          setReplyText("");
          setReplyCount(replyCount + 1);
          toast.success("Your comment was added!");
        })
        .catch((err) => {});
    }
  };

  const deleteSubdiscussion = (comment: any) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`${BACKEND_URL}/user/subDiscussion/delete/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("You comment was deleted successfully!");
        
        let temp = Array.from(comments);
        temp.splice(comments.indexOf(comment), 1);

        setComments(temp);
        setReplyCount(replyCount - 1);
      })
      .catch((err) => {
        toast.error("You comment deletion failed!");
      });
  };

  useEffect(() => {
    if(active) {
      setReplyIcon(upIcon);
      fetchSubdiscussions();
    } else {
      setReplyIcon(downIcon);
    }
  }, [active]);

  // Get user type label
  const getUserTypeLabel = (type: number) => {
    if (type === 1 || type === 2) return "Teacher";
    return "Student";
  };

  // Get user type color class
  const getUserTypeColorClass = (type: number) => {
    if (type === 1 || type === 2) return "text-yellow-400";
    return "text-purple-400";
  };

  return (
    <div className="my-8 bg-gray-800/20 rounded-lg p-4 backdrop-blur-sm border border-gray-600/20 hover:border-gray-500/30 transition-all" key={discussion.id}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-white font-bold">
            {discussion.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white font-semibold">{discussion.name}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className={getUserTypeColorClass(discussion.user_type)}>
                {getUserTypeLabel(discussion.user_type)}
              </span>
              {discussion.user_profile?.currentInstitution && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <FaGraduationCap className="text-gray-400" />
                    <span>{discussion.user_profile.currentInstitution}</span>
                  </div>
                </>
              )}
              {discussion.user_profile?.districtName && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{discussion.user_profile.districtName}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">{formatTime(discussion.timestamp)}</p>
      </div>
      <div className="flex">
        <div className="grow p-3 rounded-lg bg-gray-700/20 border border-gray-600/30">
          {formatContent(discussion.content)}
        </div>
      </div>
      {reply && (
        <div className="py-3 rounded ml-6 mt-4">
          <textarea
            className="w-full px-3 py-3 rounded-lg resize-none bg-gray-700/30 outline-none focus:ring ring-purple-500/50 text-white"
            placeholder="Add a reply..."
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                postSubdiscussion(discussion.id);
              }}
              className="font-bold px-4 py-2 bg-[#532e62] focus:ring ring-purple-400/50 hover:bg-opacity-80 rounded-lg transition-all"
            >
              Reply
            </button>
            <button
              onClick={() => {
                setReply(false);
              }}
              className="font-bold px-4 py-2 bg-gray-700/50 focus:ring ring-gray-400/50 hover:bg-opacity-70 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`flex ${reply ? "" : "flex-row-reverse"} justify-between gap-2 mt-4 mb-1`}>
        {!reply && (
          <button
            onClick={() => {
              fetchSubdiscussions();
              setReply(true);
            }}
            className="font-semibold px-4 py-2 bg-[#532e62] hover:bg-opacity-80 ease-in-out duration-150 focus:ring ring-purple-400/50 rounded-lg text-white transition-all"
          >
            Reply
          </button>
        )}
        {replyCount > 0 && (
          <button onClick={() => {
            if(active) {
              setActive(false);
            } else {
              setActive(true);
            }
          }} className="flex items-center gap-1 text-[#b153e0] hover:text-[#9541bd] ease-in-out duration-150">
            {replyIcon}
            {replyCount} Replies
          </button>
        )}
      </div>

      {active && (
        <div className="mt-4 border-t border-gray-700/30 pt-4 space-y-4">
          {comments.map(
            (subdiscussion: any) => (
              <div className="ml-6 bg-gray-800/20 rounded-lg p-3 backdrop-blur-sm border border-gray-600/20" key={Math.random()}>
                <div className="my-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                        {subdiscussion.user_name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {subdiscussion.user_name}
                        </p>
                        <span className={`text-xs ${getUserTypeColorClass(subdiscussion.type)}`}>
                          {getUserTypeLabel(subdiscussion.type)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatTime(subdiscussion.created_at)}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="grow p-2 px-3 mt-1 rounded-lg bg-gray-700/20 border border-gray-600/30">
                      {formatContent(subdiscussion.content)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    className="text-[#b153e0] hover:text-[#9541bd] ease-in-out duration-150 text-sm"
                    onClick={() => {
                      deleteSubdiscussion(subdiscussion);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
      {showDeleteDialog && (
        <Transition appear show={showDeleteDialog} as={Fragment}>
          <Dialog
            as="div"
            className="relative "
            style={{ zIndex: 99999 }}
            onClose={() => {
              // setCoursePurchaseSuccessfull(false);
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
                  <Dialog.Panel className="md:w-[50vw] lg:w-[40vw] text-darkHeading transform overflow-hidden  rounded-2xl bg-gray-900/70 backdrop-blur-3xl border border-gray-300/30  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="div"
                      className="text-lg font-medium leading-6 p-2 "
                    >
                      <div className="flex justify-end">
                        <button
                          className="hover:bg-gray-300/20 p-2 mr-2 rounded"
                          onClick={() => setShowDeleteDialog(false)}
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1.25L1 13.25M1 1.25L13 13.25"
                              stroke="#FBEEEC"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </Dialog.Title>

                    <div className="border-b border-t border-gray-300/20 py-3 px-6">
                      <div className="flex flex-col items-center ">
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          className="text-4xl text-orange-300"
                        />
                        <p className="text-xl font-bold text-darkHeading mt-1">
                          Warning!
                        </p>
                        <p className="text-darkHeading text-center mt-1 ">
                          Do you want to delete your comment?
                        </p>
                      </div>
                    </div>
                    <div className="p-6 flex gap-4">
                      <button
                        onClick={() => setShowDeleteDialog(false)}
                        className={`bg-gray-300/30 hover:opacity-60 ease-in-out duration-150  text-darkHeading py-3 w-full  rounded-xl font-bold`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // deleteDiscussion();
                        }}
                        className={`bg-red-600 hover:bg-opacity-50 ease-in-out duration-150  text-darkHeading py-3 w-full  rounded-xl font-bold`}
                      >
                        Delete
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}