import links from "../utils/links";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useDashBoardContext } from "../pages/DashboardLayout";
const NavLinksBig = ({ isBigSideber }) => {
  const { toggleShowSidebar, user } = useDashBoardContext();
  return (
    <nav className="pt-8 flex flex-col dark:text-white">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            onClick={isBigSideber ? null : toggleShowSidebar}
            key={text}
            className={({ isActive }) =>
              `flex items-center text-grey-500 py-4 pl-[2.5rem] font-600 text-lg capitalize transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-primary-500 pl-[3rem] "
                  : "hover:pl-[3rem] hover:text-primary-500 dark:text-[#f0f0f0] dark:hover:text-primary-500 text-grey-800"
              }`
            }
          >
            <span className="icon text-[1.5rem] mr-4 grid place-items-center">
              {icon}
            </span>
            {text}
          </NavLink>
        );
      })}
    </nav>
  );
};

NavLinksBig.propTypes = {
  isBigSideber: PropTypes.bool,
};
export default NavLinksBig;
