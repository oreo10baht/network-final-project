import SidebarIcon from "./SidebarIcon";
import { PlusIcon, HomeIcon } from "@radix-ui/react-icons";

const Sidebar = () => {
  return (
    <div className="overflow-auto no-scrollbar h-screen w-16  bg-gray-900 top-0 left-0">
      <div className="  flex flex-col text-white  ">
        <SidebarIcon text="Home" pathOnClicked="/home/all">
          <HomeIcon className="size-6" />
        </SidebarIcon>
        <SidebarIcon text="+" pathOnClicked="/home/all">
          <PlusIcon className="size-6" />
        </SidebarIcon>
        <Divider></Divider>

        {/* <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon>
        <SidebarIcon text="GR"></SidebarIcon> */}
      </div>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
