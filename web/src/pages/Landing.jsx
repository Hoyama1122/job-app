import { useState } from "react";
import Main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Thai from "../assets/images/thailand.png";
import Eng from "../assets/images/usa_18285.png";

const Landing = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Toggle change boolean !flase = ture
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // selectLanguage onClick={() => selectLanguage("English")}
  const selectLanguage = (text) => {
    setSelectedLanguage(text);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="w-full max-w-[1120px] mx-auto h-[6rem] flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        <Logo />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={selectedLanguage === "English" ? Eng : Thai}
              className="w-6"
              alt="Selected Language"
            />
            <span>{selectedLanguage}</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-lg z-10 ">
              <ul>
                <li
                  onClick={() => selectLanguage("English")}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={Eng} className="w-6 mr-2" alt="English" />
                  <span>English</span>
                </li>
                <li
                  onClick={() => selectLanguage("ไทย")}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={Thai} className="w-6 mr-2" alt="Thai" />
                  <span>ไทย</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <div className="w-[90vw] max-w-[1120px] mx-auto grid items-center mt-[-3rem] min-h-[calc(100vh-6rem)] gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl m-0 capitalize tracking-[1px]">
            Job <span className="text-primary-500">Tracking</span> App
          </h1>
          <p className="text-grey-500 leading-relaxed mb-6 max-w-[35em] mt-5">
            Take control of your career with our cutting-edge Job Tracking App.
            Seamlessly manage your job applications, interviews, and follow-ups
            all in one place. Stay organized and ahead of the competition with
            real-time updates, personalized reminders, and insightful analytics.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              to="/register"
              className="py-3 px-5 bg-primary-500 text-white rounded-md border border-transparent tracking-[1px]  capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 hover:bg-primary-700 hover:shadow-custom-3"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="py-3 px-5 bg-primary-500 text-white rounded-md border border-transparent tracking-[1px]  capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 hover:bg-primary-700 hover:shadow-custom-3"
            >
              Login / Demo Users
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={Main} alt="Job Tracking Main" className="w-full h-auto" />
        </div>
      </div>
    </>
  );
};

export default Landing;
