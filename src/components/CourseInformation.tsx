import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface CourseInformationProps {
  batchNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

const getBatchContent = (batchNumber: number) => {
  if (batchNumber === 2) {
    return {
      title: "Batch 2 - কম্পিটিটিভ প্রোগ্রামিং ২.০",
      content: [
        {
          text: "প্রথমত আমাদের ফেসবুক প্রাইভেট গ্রুপ ও Discord Server এ জয়েন হওয়ার জন্য তোমার ফোনে পাঠানো ACCESS CODE টি Copy করে বাকি ইনফরমেশন দিয়ে রিকোয়েস্ট দাও। ২৪ ঘন্টার মধ্যে অ্যাপ্রুভ করা হবে।",
        },
        {
          text: "যুক্ত হয়ে যাও আমাদের ফেইসবুক প্রাইভেট গ্রুপে",
          link: "https://www.facebook.com/groups/codervai.cp.batch02",
        },
        {
          text: "যুক্ত হয়ে যাও আমাদের Discord Server এ",
          link: "https://discord.gg/u3m7PAnfeq",
        },
        {
          text: "আমাদের ওরিয়েন্টেশন ক্লাস হবে 10 April রাত ৯.৩০ এ ফেসবুক সিক্রেট গ্রুপে এবং ওয়েবসাইটেও।",
        },
        {
          text: "ওয়েবসাইট থেকে লাইভ ক্লাস গুলো দেখার জন্য তোমার প্রোফাইলে লাইভ ক্লাস মেন্যুতে যেতে হবে।",
        },
      ],
    };
  }

  // Default to batch 3
  return {
    title: "Batch 3 - কম্পিটিটিভ প্রোগ্রামিং ৩.০ টার্বোচার্জড",
    content: [
      {
        text: "প্রথমত আমাদের ফেসবুক প্রাইভেট গ্রুপ ও Discord Server এ জয়েন হওয়ার জন্য তোমার ফোনে পাঠানো ACCESS CODE টি Copy করে বাকি ইনফরমেশন দিয়ে রিকোয়েস্ট দাও। ২৪ ঘন্টার মধ্যে অ্যাপ্রুভ করা হবে।",
      },
      {
        text: "যুক্ত হয়ে যাও আমাদের ফেইসবুক প্রাইভেট গ্রুপে",
        link: "https://www.facebook.com/groups/codervai.cp.batch03",
      },
      {
        text: "যুক্ত হয়ে যাও আমাদের Discord Server এ",
        link: "https://discord.gg/u3m7PAnfeq",
      },
      {
        text: "আমাদের ওরিয়েন্টেশন ক্লাস হবে 10 April রাত ৯.৩০ এ ফেসবুক সিক্রেট গ্রুপে এবং ওয়েবসাইটেও।",
      },
      {
        text: "ওয়েবসাইট থেকে লাইভ ক্লাস গুলো দেখার জন্য তোমার প্রোফাইলে লাইভ ক্লাস মেন্যুতে যেতে হবে।",
      },
      {
        text: "কোর্স শুরু হওয়ার আগে C এবং C++ সম্পর্কে তোমরা এখান থেকে জেনে নিতে পারো। আগে থেকেই প্রিপেয়ার হয়ে গেলে!",
      },
      {
        text: "Learn C from w3schools and C++ from w3schools",
        cLinks: {
          c: "https://www.w3schools.com/c/",
          cpp: "https://www.w3schools.com/cpp/",
        },
      },
      {
        text: "কোর্স সম্পর্কে তোমার যাবতীয় যত জিজ্ঞাসা প্রশ্ন সব আমাদের ফেসবুক গ্রুপে পোস্ট করতে পারো বা ওয়েবসাইট সাপোর্ট মেন্যুতে গিয়ে টিকেট বানিয়ে আমাদের থেকে জেনে নিতে পারো।",
      },
    ],
  };
};

const CourseInformation = ({
  batchNumber,
  isOpen,
  onClose,
}: CourseInformationProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const batchContent = getBatchContent(batchNumber);

  return (
    <>
      <div className="w-full bg-gray-400/20 dark:bg-gray-300/10 backdrop-blur-lg py-4 px-6">
        <div className="max-w-[90%] lg:max-w-[90%] mx-auto flex justify-between items-center">
          <button
            onClick={() => setShowDialog(true)}
            className="text-heading dark:text-darkHeading hover:text-purple dark:hover:text-purple transition-colors"
          >
            কোর্সের গুরুত্বপূর্ণ ইনফরমেশন দেখে নাও
          </button>
        </div>
      </div>

      <Transition appear show={showDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99999]"
          onClose={() => setShowDialog(false)}
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900 dark:text-white mb-4"
                  >
                    অভিনন্দন!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {batchContent.title}
                    </p>
                    <p className="text-heading dark:text-darkHeading text-lg my-3 font-semibold">
                      এখন তোমার কি করনীয়
                    </p>
                    <div className="space-y-4">
                      {batchContent.content.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <div className="relative">
                            <div className="px-2 py-2 rounded-full bg-[#B153E0]/[.14] inline-block">
                              <p className="px-4 py-1 rounded-full bg-[#B153E0]/[.32] font-bold text-xl inline-block">
                                {index + 1}
                              </p>
                            </div>
                          </div>
                          <p className="text-heading dark:text-darkHeading text-sm">
                            {item.link ? (
                              <>
                                {item.text}{" "}
                                <a
                                  className="text-heading dark:text-darkHeading font-bold underline"
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.text.includes("ফেইসবুক")
                                    ? "ফেইসবুক প্রাইভেট গ্রুপে"
                                    : "Discord Server এ"}
                                </a>
                              </>
                            ) : item.cLinks ? (
                              <>
                                Learn C from{" "}
                                <a
                                  className="text-heading dark:text-darkHeading font-bold underline"
                                  href={item.cLinks.c}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  w3schools
                                </a>{" "}
                                and C++ from{" "}
                                <a
                                  className="text-heading dark:text-darkHeading font-bold underline"
                                  href={item.cLinks.cpp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  w3schools
                                </a>
                              </>
                            ) : (
                              item.text
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple px-6 py-3 text-base font-medium text-white hover:bg-purple/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                      onClick={() => setShowDialog(false)}
                    >
                      ফিরে যাও
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CourseInformation;
