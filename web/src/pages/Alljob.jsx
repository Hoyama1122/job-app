import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AlljobContext = createContext();
const Alljob = () => {
  const { data } = useLoaderData();
  return (
    <AlljobContext.Provider value={{ data }}>
      <SearchContainer />
      <JobContainer />
    </AlljobContext.Provider>
  );
};
export const useAlljobContext = () => useContext(AlljobContext);
export default Alljob;
