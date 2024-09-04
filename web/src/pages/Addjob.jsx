import { FormRow, FormRowSelect } from "../components";
import { Form, useNavigation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_Type } from "../../../api/utils/constants";
import customFetch from "../utils/customFetch";
import { FaSave } from "react-icons/fa";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const job = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", job);
    toast.success("Job Created");
    return null;
  } catch (error) {
    toast.error(error?.response?.data.msg);
    return error;
  }
};

const Addjob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="rounded-md w-full  bg-white dark:bg-[#3F3F3F] p-8 shadow-lg">
      <Form method="post" className="grid gap-6">
        <h4 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-white">
          Add Job
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormRow type="text" name="position" labelText="Position" />
          <FormRow type="text" name="company" labelText="Company" />
          <FormRow type="text" name="salary" labelText="Salary" />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="job Type"
            list={Object.values(JOB_Type)}
            defaultValue={JOB_Type.FULL_TIME}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white text-lg bg-primary-500 hover:bg-primary-700 flex  items-center justify-center rounded-md py-2 px-4 transition-all duration-300 ease-in-out shadow-md w-40"
        >
          <FaSave className="mr-2" size={20} />
          {isSubmitting ? "Submitting..." : "Add Job"}
        </button>
      </Form>
    </div>
  );
};

export default Addjob;
