import { Link } from "react-router-dom";
import { useDashBoardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinksBig from "./NavlinksBig";

const BigSidebar = () => {
  const { showSidebar } = useDashBoardContext();

  return (
    <>
      <aside className="hidden lg:block shadow-[1px_0px_0px_0px_rgba(0,0,0,0.1)] ">
        <div
          className={`bg-white dark:bg-[#333]  min-h-screen h-full w-[250px] ${
            showSidebar ? "ml-0" : "-ml-[250px]"
          } transition-[margin-left] duration-300 ease-in-out`}
        >
          <div className="sticky top-0">
            <header className="h-[6rem] flex items-center pl-[2.5rem] ">
              <Link to="/dashboard/add-job">
                <Logo className=" cursor-pointer" />
              </Link>
            </header>

            <NavLinksBig isBigSideber />
          </div>
        </div>
      </aside>
    </>
  );
};

export default BigSidebar;
