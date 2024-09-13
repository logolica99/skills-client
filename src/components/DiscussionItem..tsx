import { BACKEND_URL } from "@/api.config";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

export default function DiscussionItem({ discussion }: Props) {
  const [active, setActive] = useState(false);
  const [replyCount, setReplyCount] = useState(parseInt(discussion.subdiscussion_count));
  const [reply, setReply] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState<Array<any>>([]);
  const downIcon = (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
    </svg>
  );
  const upIcon = (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
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
        console.log

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
    }  else {
      setReplyIcon(downIcon);
    }
  }, [active]);

  return (
    <div className="my-8" key={discussion.id}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white font-semibold">{discussion.name}</p>
        </div>
        <p className="text-sm">{formatTime(discussion.timestamp)}</p>
      </div>
      <div className="flex">
        <p className="grow p-2 px-3 mt-2 rounded bg-gray-300/5 text-white border border-gray-300/30 rounded-tl-none">
          {discussion.content}
        </p>
      </div>
      {reply && (
        <div className="py-1 rounded ml-6 mt-2">
          <textarea
            className="w-full px-2 py-2 rounded resize-none bg-gray-200/20 bg-none outline-none focus:ring ring-gray-300/80 text-white"
            placeholder="Add a reply..."
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                postSubdiscussion(discussion.id);
              }}
              className="font-bold px-4 py-1 bg-[#532e62] focus:ring ring-gray-300/80 hover:bg-opacity-70 rounded"
            >
              Reply
            </button>
            <button
              onClick={() => {
                setReply(false);
              }}
              className="font-bold px-4 py-1 bg-[#532e62] focus:ring ring-gray-300/80 hover:bg-opacity-70 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`flex ${reply ? "" : "flex-row-reverse"} justify-between gap-2 mt-2 mb-3`}>
        {!reply && (
          <button
            onClick={() => {
              fetchSubdiscussions();
              setReply(true);
            }}
            className="font-bold px-4 py-1 bg-[#532e62] hover:opacity-75 ease-in-out duration-150 focus:ring ring-gray-300/80  rounded font-semibold text-white"
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
          }} className="flex items-center gap-1 text-[#b153e0] hover:opacity-75 ease-in-out duration-150">
            {replyIcon}
            {replyCount} Replies
          </button>
        )}
      </div>

      {active && (
        <div>
          {comments.map(
            (subdiscussion: any) => (
              <div className="ml-6" key={Math.random()}>
                <div className="my-2">
                  <div className="flex justify-between items-center">
                    <p className="text-white font-semibold text-sm">
                      {subdiscussion.user_name} |{" "}
                      <span
                        className={`${subdiscussion.type == 1 || subdiscussion.type == 2 ? "text-yellow" : "text-purple"}`}
                      >
                        {" "}
                        {subdiscussion.type == 1 ||
                          subdiscussion.type == 2
                          ? "Teacher"
                          : "Student"}
                      </span>
                    </p>
                    <p className="text-sm">
                      {formatTime(subdiscussion.created_at)}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="grow p-2 px-3 mt-1 rounded bg-gray-300/5 text-white border border-gray-300/30 rounded-tl-none">
                      {subdiscussion.content}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-[#b153e0] hover:opacity-75 ease-in-out duration-150"
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
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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