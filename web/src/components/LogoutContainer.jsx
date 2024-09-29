import { useState } from "react";
import { useDashBoardContext } from "../pages/DashboardLayout";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const LogoutContainer = () => {
  const [showLogout, setshowLogout] = useState(false);
  const { user, logoutUser } = useDashBoardContext();

  return (
    <div className="relative">
      <button
        onClick={() => setshowLogout(!showLogout)}
        className="cursor-pointer text-white text-[17px] bg-primary-500 border-transparent border rounded-md tracking-[1px] py-2 px-3 shadow-custom-1 transition-all duration-300 ease-in-out capitalize inline-block flex items-center justify-center"
        style={{ gap: "0 0.5rem" }}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full shadow-md"
          />
        ) : (
          <FaUserCircle size={24} />
        )}

        {user?.name}
        <FaCaretDown size={20} />
      </button>

      <div
        className={`absolute top-12 left-0 w-full mt-2 bg-primary-500 text-white text-center rounded-md shadow-lg transition-all duration-300 ease-in-out ${
          showLogout ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          onClick={logoutUser}
          className="py-2 px-3 flex  items-center font-600 justify-center bg-transparent border-transparent tracking-[1px] capitalize cursor-pointer w-full h-full"
        >
          Logout
          <div className="ml-1.5">
            <IoMdExit size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LogoutContainer;
