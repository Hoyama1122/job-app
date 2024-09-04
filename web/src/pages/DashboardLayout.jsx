import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { Bigsidebar, Navbar, SmallsideBar } from "../components";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const DashBoardConText = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navgigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const logoutUser = async () => {
    navgigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logout successful");
  };

  return (
    <DashBoardConText.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleShowSidebar,
        logoutUser,
      }}
    >
      <section>
        <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr] dark:bg-[#3f3f3f] dark:text-[#f0f0f0] min-h-screen">
          <SmallsideBar />
          <Bigsidebar />
          <div>
            <Navbar />
            <div className="w-[90vw] mx-auto py-8 md:w-[90%] min-h-screen">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </section>
    </DashBoardConText.Provider>
  );
};

export const useDashBoardContext = () => useContext(DashBoardConText);
export default DashboardLayout;
