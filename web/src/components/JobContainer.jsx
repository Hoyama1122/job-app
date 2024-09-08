import { useAlljobContext } from "../pages/Alljob";
import Job from "./Job";

const JobContainer = () => {
  const { data } = useAlljobContext();

  // Add error handling for `data` or `jobs` being undefined or null
  if (!data || !data.jobs || data.jobs.length === 0) {
    return <div className="mt-16 text-center text-2xl">No jobs to display...</div>;
  }

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
        {data.jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobContainer;
