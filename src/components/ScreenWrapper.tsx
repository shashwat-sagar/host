import React from "react";
import { Heading } from "./Heading";
// import { vectorBg1 } from "@/assets/images";

const ScreenWrapper = ({
  title = "Title",
  children,
  showTitle = true,
  className = "",
  icon,
}: {
  title?: string;
  children: React.ReactNode;
  showTitle?: boolean;
  className?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      {showTitle && title.length > 0 && <Heading title={title} icon={icon} />}
      <div
        className={`relative p-6 min-h-[50vh]  ${className} bg-white/80 dark:bg-gray-800/50`}
      >
        <div className="absolute inset-0 " style={{}}></div>
        <div className="relative">{children}</div>
      </div>
    </>
  );
};

export default ScreenWrapper;
