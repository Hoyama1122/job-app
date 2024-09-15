import PropTypes from "prop-types";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaLocationArrow,
  FaMoneyBill,
} from "react-icons/fa";
import { Form, Link } from "react-router-dom";
import Jobinfo from "./Jobinfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  salary,
  jobType,
  jobLocation,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  // Define classes based on jobStatus
  const statusClass = {
    Pending: "bg-[#fef3c7] text-[#f59e0b]",
    Interview: "bg-[#e0e8f9] text-[#647acb]",
    Declined: "bg-[#ffeeee] text-[#d66a6a]",
  };

  const statusStyle = statusClass[jobStatus] || "";

  return (
    <div className="bg-[#3F3F3F] rounded-md grid grid-cols-1 shadow-custom-2">
      <header className="py-4 px-[1.5rem] border-b border-gray-100 items-center grid grid-cols-[auto_1fr]">
        {/* Icon or Placeholder */}
        <div className="w-[60px] h-[60px] grid place-items-center bg-primary-500 rounded-md text-[1.5rem] font-bold uppercase text-white mr-8">
          {position.charAt(0)} {/* Placeholder for the first letter */}
        </div>
        <div>
          <h1 className="mb-2 text-2xl text-white">{position}</h1>
          <p className="m-0 capitalize tracking-[1px] text-gray-400 text-lg">
            {company}
          </p>
        </div>
      </header>
      <div className="p-4">
        <div className="grid mt-4 mb-6 grid-cols-1 gap-y-6 items-center sm:grid-cols-2">
          <Jobinfo icon={<FaLocationArrow />} text={jobLocation} />
          <Jobinfo
            icon={<FaMoneyBill />}
            text={salary ? Number(salary).toLocaleString() : "N/A"}
          />
          <Jobinfo icon={<FaCalendarAlt />} text={date} />
          <Jobinfo icon={<FaBriefcase />} text={jobType} />

          <div
            className={`rounded-md capitalize tracking-[1px] text-center w-[100px] h-[30px] grid place-items-center ${statusStyle}`}
          >
            {jobStatus}
          </div>
        </div>
        {/* Footer for buttons */}
        <footer className="flex mt-4 space-x-4 items-center">
          <Link
            to={`../edit-job/${_id}`}
            aria-label="Edit Job"
            className="cursor-pointer text-white text-[17px] bg-primary-500 border-transparent border rounded-md tracking-[1px] py-2 px-3 shadow-custom-1 transition-all duration-300 ease-in-out capitalize hover:bg-primary-600"
          >
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button
              type="submit"
              className="cursor-pointer text-white text-[17px] bg-primary-500 border-transparent border rounded-md tracking-[1px] py-2 px-3 shadow-custom-1 transition-all duration-300 ease-in-out capitalize hover:bg-primary-600"
            >
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </div>
  );
};

// Add PropTypes for validation
Job.propTypes = {
  _id: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  salary: PropTypes.number,
  jobType: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  jobStatus: PropTypes.string.isRequired,
};

export default Job;
