import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashBoardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashBoardContext();

  return (
    <div
      onClick={toggleDarkTheme}
      className="bg-transparent border-transparent w-14 h-8 grid place-items-center cursor-pointer"
    >
      {isDarkTheme ? (
        <BsFillSunFill className="text-xl dark:text-[#f0f0f0]" size={20} />
      ) : (
        <BsFillMoonFill className="text-xl text-gray-700" size={20} />
      )}
    </div>
  );
};

export default ThemeToggle;
