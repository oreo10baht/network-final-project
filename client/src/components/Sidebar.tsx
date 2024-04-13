import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  return (
    <div className="overflow-auto no-scrollbar h-screen w-16 fixed bg-gray-900 top-0 left-0">
      <div className="  flex flex-col text-white  ">
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <Divider></Divider>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
        <SidebarIcon text="hbsdc"></SidebarIcon>
 
      </div>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
