import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashBoardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import { Link } from "react-router-dom";
import { ThemeToggle } from ".";
const Navbar = () => {
  const { toggleShowSidebar } = useDashBoardContext();
  return (
    <>
      <nav className="h-24 dark:bg-[#333] flex dark:text-[#f0f0f0] items-center justify-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)] bg-white lg:sticky lg:top-0">
        <div className="flex w-[90vw] items-center justify-between lg:w-[90%]">
          <button
            onClick={toggleShowSidebar}
            className=" bg-transparent border-transparent text-xl text-primary-500 cursor-pointer flex items-center"
            type="button"
          >
            <FaAlignLeft size={23} />
          </button>
          <div>
            <Link to="/dashboard/add-job">
              <Logo className="flex items-center w-[100px] lg:hidden " />
              <h4 className="hidden lg:block text-3xl">Dashboard</h4>
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <LogoutContainer />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
