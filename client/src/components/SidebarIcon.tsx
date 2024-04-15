"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";
const SidebarIcon = ({
  text,
  pathOnClicked,
  iconSrc,
  children,
}: {
  text: string;
  pathOnClicked: string;
  iconSrc?: string;
  children?: ReactNode;
}) => {
  const router = useRouter();

  return (
    <div className="sidebar-icon " onClick={() => router.push(pathOnClicked)}>
      {children ? (
        children
      ) : (
        <>
          {iconSrc ? (
            <div className="size-5 rounded-full ">
              <Image src={iconSrc} fill={true} alt="icon"></Image>
            </div>
          ) : (
            text.slice(0,2)
          )}
        </>
      )}
    </div>
  );
};

export default SidebarIcon;
