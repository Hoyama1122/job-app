import { FormRow, FormRowSelect } from "../components";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_Type } from "../../../api/utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FaSave } from "react-icons/fa";

// Loader function to fetch the job data
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request , params}) => {
  const formData = await request.formData();
  const job = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, job);
    toast.success("Job Updated");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className="w-full rounded-md bg-[#3F3F3F] pt-12 px-8 pb-16 shadow-lg">
        <Form className="m-0 shadow-none p-0 max-w-full w-full" method="post">
          {/* Responsive Grid: 1 column on small screens, 2 columns on medium and up */}
          <div className="grid gap-6 sm:grid-cols-2">
            <h4 className="text-white mb-4 text-3xl font-600 tracking-[1px] sm:col-span-2">
              Edit Job
            </h4>
            {/* Form Row for Job Position */}
            <FormRow
              type="text"
              name="position"
              labelText="Job Position"
              defaultValue={job?.position}
            />
            <FormRow
              type="text"
              name="company"
              labelText="Company"
              defaultValue={job?.company}
            />
            <FormRow
              type="text"
              name="salary"
              labelText="Salary"
              defaultValue={job?.salary}
            />
            <FormRow
              type="text"
              name="jobLocation"
              labelText="Job Location"
              defaultValue={job?.jobLocation}
            />

            <FormRowSelect
              name="jobStatus"
              labelText="Job Status"
              list={Object.values(JOB_STATUS)}
              defaultValue={JOB_STATUS.PENDING}
            />
            <FormRowSelect
              name="jobType"
              labelText="Job Type"
              list={Object.values(JOB_Type)}
              defaultValue={JOB_Type.FULL_TIME}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white text-lg mt-5 bg-primary-500 hover:bg-primary-700 flex items-center justify-center rounded-md py-2 px-4 transition-all duration-300 ease-in-out shadow-md w-40"
          >
            <FaSave className="mr-2" size={20} />
            {isSubmitting ? "Submitting..." : "Edit Job"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default EditJob;
