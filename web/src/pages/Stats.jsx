import { useLoaderData } from "react-router-dom";
import { ChartContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const res = await customFetch.get("/jobs/stats");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
