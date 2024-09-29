import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { AiFillRest } from "react-icons/ai";
import {
  JOB_Type,
  JOB_STATUS,
  JOB_SORT_BY,
} from "../../../api/utils/constants";
import { useAlljobContext } from "../pages/Alljob";

const SearchContainer = () => {
  const { searchValues } = useAlljobContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit();

  const debouncedSubmit = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
      onChange(form);
    };
  };

  return (
    <div className="rounded-lg w-full bg-[#3F3F3F] p-12 shadow-lg text-white">
      <Form className="m-0 p-0 max-w-full w-full">
        <h5 className="mb-8 text-3xl font-semibold tracking-wide text-gray-100">
          Search Form
        </h5>
        <div className="grid gap-6">
          <FormRow
            onChange={debouncedSubmit((form) => {
              submit(form);
            })}
            type="search"
            name="search"
            labelText="Search"
            defaultValue={search}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            list={["all", ...Object.values(JOB_Type)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            list={[...new Set(["newest", ...Object.values(JOB_SORT_BY)])]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
        <div className="flex gap-4 mt-6 justify-between">
          <Link
            to="/dashboard/all-jobs"
            className="py-2 px-5 bg-red-500 text-white rounded-md border border-transparent tracking-wider capitalize flex items-center gap-2 shadow-md transition ease-in-out duration-300 hover:bg-red-600 hover:shadow-lg"
          >
            <AiFillRest size={25} />
            Reset Search Values
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SearchContainer;
