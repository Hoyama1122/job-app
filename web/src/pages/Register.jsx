import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation;
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className="grid min-h-screen items-center">
        <Form
          method="post"
          className="w-[90vw] max-w-[400px] bg-[#fff] rounded-[0.25rem] shadow-custom-2 py-8 mx-auto my-12 px-10 border-t-[5px] border-primary-500"
        >
          <Logo />
          <h4 className="text-center m-0 leading-none capitalize tracking-[1px]  mb-6 text-xl font-500 mt-3">
            Register
          </h4>
          <FormRow type="text" name="name" defaultValue="Alex" />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue="Kob"
          />
          <FormRow type="text" name="location" defaultValue="Chonburi" />
          <FormRow type="email" name="email" defaultValue="Alex@gmail.com" />

          <div className="relative">
            <FormRow type="password" name="password" defaultValue="11111111" />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-4 cursor-pointer text-white bg-primary-500 border border-transparent rounded tracking-[1px] py-1.5 px-3 capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 w-full hover:bg-primary-700 hover:shadow-custom-3"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          <p className="m-0 text-center mt-4 font-500">
            Already a member?
            <Link to="/login" className="text-primary-500 ml-1  tracking-[1px]">
              {" "}
              Login
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Register;
