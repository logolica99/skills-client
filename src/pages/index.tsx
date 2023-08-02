import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const HindSiliguri = localFont({
  src: [
    {
      path: "Fonts/Hind_Siliguri/HindSiliguri-Bold.ttf",
      weight: "700",
    },
    {
      path: "Fonts/Hind_Siliguri/HindSiliguri-Light.ttf",
      weight: "300",
    },
    {
      path: "Fonts/Hind_Siliguri/HindSiliguri-Regular.ttf",
      weight: "400",
    },
    {
      path: "Fonts/Hind_Siliguri/HindSiliguri-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "Fonts/Hind_Siliguri/HindSiliguri-Medium.ttf",
      weight: "500",
    },
  ],
  variable: "--font-HindSiliguri",
});

export default function Home() {
  return (
    <main className={`  ${HindSiliguri.variable} font-hind`}>
      <div className="bg-[#0B060D] min-h-[100vh] p-10 ">
        <div className="flex gap-20 flex-wrap justify-center">
         

          <div
            className="rounded-xl max-w-[400px] text-center"
            style={{
              background:
                "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
            }}
          >
            <div
              className=" rounded-xl px-6 py-8 pb-20 mx-[1px] bg-[#0B060D]/80 relative top-[1px]"
              style={{}}
            >
              <div className="">
                <p className="text-heading text-center text-xl">
                  ক্যারিয়ার গঠন
                </p>
                <p className="text-paragraph mt-8">
                  CP তোমাকে শক্তপোক্ত একটা রেজুমে গড়তে সাহায্য করে যা ভবিষ্যতের
                  ড্রিম কোম্পানি ডাক পেতে এগিয়ে রাখবে লাখো ক্যান্ডিডেট থেকে যারা
                  CP করে নাই
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl max-w-[400px] text-center"
            style={{
              background:
                "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
            }}
          >
            <div
              className=" rounded-xl px-6 py-8 pb-20 mx-[1px] bg-[#0B060D]/80 relative top-[1px]"
              style={{}}
            >
              <div className="">
                <p className="text-heading text-center text-xl">
                  ক্যারিয়ার গঠন
                </p>
                <p className="text-paragraph mt-8">
                  CP তোমাকে শক্তপোক্ত একটা রেজুমে গড়তে সাহায্য করে যা ভবিষ্যতের
                  ড্রিম কোম্পানি ডাক পেতে এগিয়ে রাখবে লাখো ক্যান্ডিডেট থেকে যারা
                  CP করে নাই
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl max-w-[400px] text-center"
            style={{
              background:
                "linear-gradient(rgba(202, 101, 253, 0.44) 0%, rgba(177, 83, 224, 0) 100%)",
            }}
          >
            <div
              className=" rounded-xl px-6 py-8 pb-20 mx-[1px] bg-[#0B060D]/80 relative top-[1px]"
              style={{}}
            >
              <div className="">
                <p className="text-heading text-center text-xl">
                  ক্যারিয়ার গঠন
                </p>
                <p className="text-paragraph mt-8">
                  CP তোমাকে শক্তপোক্ত একটা রেজুমে গড়তে সাহায্য করে যা ভবিষ্যতের
                  ড্রিম কোম্পানি ডাক পেতে এগিয়ে রাখবে লাখো ক্যান্ডিডেট থেকে যারা
                  CP করে নাই
                </p>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </main>
  );
}
