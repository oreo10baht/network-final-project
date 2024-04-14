"use client";
import { useRouter } from "next/navigation";
const SidebarIcon = ({
  text,
  pathOnClicked,
}: {
  text: string;
  pathOnClicked: string;
}) => {
  const router = useRouter();

  return <div className="sidebar-icon" onClick={()=>router.push(pathOnClicked)}>{text}</div>;
};

export default SidebarIcon;
