import React, { ReactNode } from "react";

type Props = { icon: JSX.Element; date: string; label: string,isHighlighted?:boolean };

const TimelineItem = ({ icon, date, label, isHighlighted }: Props) => {
  return (
    <div className={`bg-white/[.06] rounded-lg p-4  flex items-center text-xl ${isHighlighted ? " border border-[#FDAF22]" : ""}`}>
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold text-sm md:text-base">{date}</p>
      </div>
    </div>
  );
};
export default TimelineItem;
