import React from "react";
import { Heading } from "./Heading";
// import { vectorBg1 } from "@/assets/images";
import { useThemeStore } from "../store/useThemeStore";

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
  const { themeMode } = useThemeStore();
  return (
    <>
      {showTitle && title.length > 0 && <Heading title={title} icon={icon} />}
      <div
        className={`relative p-10 min-h-[60vh]  ${className} ${themeMode === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}
      >
        <div className="absolute inset-0 " style={{}}></div>
        <div className="relative">{children}</div>
      </div>
    </>
  );
};

export default ScreenWrapper;
