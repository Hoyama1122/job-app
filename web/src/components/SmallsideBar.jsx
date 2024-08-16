import { FaTimes } from "react-icons/fa";
import { useDashBoardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";

import NavLinks from "./NavLink";
import { Link } from "react-router-dom";

const SmallsideBar = () => {
  const { showSidebar, toggleShowSidebar } = useDashBoardContext();

  return (
    <>
      <aside className="lg:hidden ">
        <div
          className={`fixed inset-0 flex justify-center items-center transition-all duration-300 ease-in-out  ${
            showSidebar
              ? "z-[99] opacity-[1] visible bg-[rgba(0,0,0,0.7)]"
              : "z-[-1] opacity-0 invisible"
          }`}
        >
          <div className="bg-white dark:bg-grey-700  w-[90vw] h-[95vh] rounded-lg py-8 px-6 relative flex flex-col items-center shadow-lg">
            <button
              className="absolute top-4 right-4 bg-transparent border-transparent text-3xl text-red-500 hover:text-red-700 transition-all duration-300"
              type="button"
              onClick={toggleShowSidebar}
            >
              <FaTimes />
            </button>
            <Link onClick={toggleShowSidebar} to="/dashboard/add-job">
              <header className="w-full mb-8 flex justify-center cursor-pointer">
                <Logo />
              </header>
            </Link>
            <NavLinks />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SmallsideBar;
