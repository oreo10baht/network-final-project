const HomeNavBar = () => {
    return ( 
    <div className="flex flex-row w-full h-14 bg-gray-700 justify-around items-center border-b-gray-950">
        <div className="text-white rounded-lg px-2 py-1 hover:bg-gray-500 ">
            Online
        </div>
        <div className="text-white rounded-lg px-2 py-1 hover:bg-gray-500 ">
            All
        </div>
        <div className="text-white rounded-lg px-2 py-1 hover:bg-gray-500 ">
            Pending
        </div>

    </div> );
}
 
export default HomeNavBar;