import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashBoardContext } from "../pages/DashboardLayout";
const NavLinks = () => {
  const { toggleShowSidebar, user } = useDashBoardContext();
  return (
    <nav className="flex flex-col w-full">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 font-600 capitalize transition-all duration-300 ease-in-out rounded-md text-lg ${
                isActive
                  ? "bg-primary-500 text-white dark:text-[#f0f0f0]"
                  : "dark:text-[#f0f0f0]  hover:bg-gray-700 dark:hover:bg-grey-900 hover:text-primary-500"
              }`
            }
            onClick={toggleShowSidebar}
          >
            <span className="text-2xl mr-4">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavLinks;
