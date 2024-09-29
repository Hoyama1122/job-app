import {
  Link,
  Form,
  redirect,
  useNavigation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
    errors.email = "Email address is invalid";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 3) {
    errors.password = "Password must be at least 3 characters";
  }

  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((error) => toast.error(error));
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || "Something went wrong";
    toast.error(errorMessage);
    return { msg: errorMessage };
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const loginDeme = async () => {
    const data = {
      email: "test@gmail.com",
      password: "fork1122gg",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  return (
    <>
      <div className="grid min-h-screen items-center">
        <Form
          method="post"
          className="w-[90vw] max-w-[400px] bg-[#fff] rounded-[0.25rem] shadow-custom-2 py-8 mx-auto my-12 px-10 border-t-[5px] border-primary-500"
        >
          <Logo />
          <h4 className="text-center m-0 leading-none capitalize tracking-[1px] mb-6 text-xl font-500 mt-3">
            Login
          </h4>

          <FormRow type="email" name="email" defaultValue="Alex@gmail.com" />
          <FormRow type="password" name="password" defaultValue="11111111" />
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-4 cursor-pointer text-white bg-primary-500 border border-transparent rounded tracking-[1px] py-1.5 px-3 capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 w-full hover:bg-primary-700 hover:shadow-custom-3"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          <button
            onClick={loginDeme}
            type="button"
            className="mt-4 cursor-pointer text-white bg-primary-500 border border-transparent rounded tracking-[1px] py-1.5 px-3 capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 w-full hover:bg-primary-700 hover:shadow-custom-3"
          >
            Explore the App
          </button>
          <p className="m-0 text-center mt-4 font-500">
            Not a member?
            <Link
              to="/register"
              className="text-primary-500 ml-1 tracking-[1px]"
            >
              {" "}
              Register
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
