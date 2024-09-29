import { useState } from "react";
import Main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Thai from "../assets/images/thailand.png";
import Eng from "../assets/images/usa_18285.png";

const Landing = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (text) => {
    setSelectedLanguage(text);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="w-full max-w-[1120px] mx-auto h-[6rem] flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        <Logo />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none text-gray-700"
          >
            <img
              src={selectedLanguage === "English" ? Eng : Thai}
              className="w-6"
              alt="Selected Language"
            />
            <span className="font-medium">{selectedLanguage}</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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

      {/* Hero Section */}
      <div className="w-[90vw] max-w-[1120px] mx-auto grid items-center mt-[-2rem] min-h-[calc(100vh-6rem)] gap-12 md:grid-cols-2">
        {/* Text Section */}
        <div>
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl m-0 capitalize tracking-wide text-gray-800">
            Manage Your <span className="text-primary-500">Job</span> with Ease
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-[40em] mt-6 text-lg">
            Take control of your career with our cutting-edge Job Tracking App.
            Seamlessly manage your job applications, interviews, and follow-ups
            all in one place. Stay organized and ahead of the competition with
            real-time updates, personalized reminders, and insightful analytics.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/register"
              className="py-3 px-5 bg-primary-500 text-white rounded-md border border-transparent tracking-[1px]  capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 hover:bg-primary-700 hover:shadow-custom-3"            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="py-3 px-5 bg-primary-500 text-white rounded-md border border-transparent tracking-[1px]  capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 hover:bg-primary-700 hover:shadow-custom-3"            >
              Login / Demo Users
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src={Main}
            alt="Job Tracking Main"
            className="w-full h-auto animate-fade-in"
          />
        </div>
      </div>

      {/* Background Gradient */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 2s ease-in-out;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Landing;
