import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  return (
    <div className="h-screen w-16 fixed bg-gray-900 top-0 left-0  flex flex-col text-white ">
      <SidebarIcon text="hbsdc"></SidebarIcon>
      <SidebarIcon text="hbsdc"></SidebarIcon>
      <SidebarIcon text="hbsdc"></SidebarIcon>
    </div>
  );
};

export default Sidebar;
