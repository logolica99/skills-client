import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "@/Contexts/UserContext";

type Props = {};

export default function LoadingScreen({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);

  const cancelButtonRef = useRef(null);
  return (
    <div>
      {" "}
      <Transition.Root show={user.loading} as={Fragment}>
        <Dialog
          as="div"
          className="relative "
          style={{
            zIndex: 100,
          }}
          initialFocus={cancelButtonRef}
          onClose={() => {}}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center sm:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  flex justify-center items-center  bg-[#0B060D] bg-opacity-50 backdrop-blur-lg text-left shadow-xl transition-all   w-[100vw] h-[100vh]">
                  <div className=" bg-opacity-50 backdrop-blur-lg rounded-lg  flex justify-center items-center p-16 lg:p-40  w-[100vw] h-[100vh]">
                    <img
                      src="/logo.jpg"
                      alt=""
                      className="w-20 md:w-40 animated-image"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
