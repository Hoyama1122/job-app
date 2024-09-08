import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const data = await customFetch.get("/user/admin/app-stats");
    return data.data;
  } catch (error) {
    toast.error("You are not an admin");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { userCount, jobCount } = useLoaderData();
  return (
    <>
      <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3">
        <StatItem
          title="current users"
          count={userCount}
          color="#e9b949"
          bcg="#fcefc7"
          icon={<FaSuitcaseRolling size={35} />}
        />
        <StatItem
          title="total jobs"
          count={jobCount}
          color="#647acb"
          bcg="#e0e8f9"
          icon={<FaCalendarCheck size={35} />}
        />
      </div>
    </>
  );
};

export default Admin;
