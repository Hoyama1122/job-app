import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useAlljobContext } from "../pages/Alljob";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import ReactLoading from "react-loading"; // Import react-loading

const JobContainer = () => {
  const { data, setPage, page } = useAlljobContext();
  const [loading, setLoading] = useState(true); // Add loading state

  // useEffect to handle initial load and when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading after 500ms
    }, 500);

    return () => clearTimeout(timer);
  }, [data, page]); // Re-run effect on `data` or `page` changes

  // Function to handle page change with loading
  const handlePageChange = (newPage) => {
    setLoading(true); // Show loading spinner when page changes
    setPage(newPage); // Set the new page
  };

  // Show the loading spinner while `loading` is true
  if (loading || !data) {
    return (
      <div className="flex justify-center items-center mt-16">
        <ReactLoading type="spin" color="#3498db" height={50} width={50} />
      </div>
    );  
  }

  const { jobs, totalJobs, numberOfPages } = data;

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="mt-16 text-center text-2xl">No jobs to display...</div>
    );
  }

  return (
    <div className="mt-16">
      <h1 className="text-start text-2xl mb-4 font-bold flex items-center">
        <span className="text-primary-500 text-3xl flex items-center ml-2">
          {totalJobs}
          <FaCheck className="mr-2 ml-2" aria-hidden="true" />
        </span>
        Job Found
      </h1>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numberOfPages > 0 && (
        <PageBtnContainer
          currentPage={page}
          totalPages={numberOfPages}
          onPageChange={handlePageChange} // Pass page change handler
        />
      )}
    </div>
  );
};

export default JobContainer;
