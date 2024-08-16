import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";

const Login = () => {
  return (
    <>
      <div className="grid min-h-screen items-center">
        <form className="w-[90vw] max-w-[400px] bg-[#fff] rounded-[0.25rem] shadow-custom-2 py-8 mx-auto my-12 px-10 border-t-[5px] border-primary-500">
          <Logo />
          <h4 className="text-center m-0  leading-none capitalize tracking-[1px]  mb-6 text-xl font-500 mt-3">
            Login
          </h4>
          <FormRow type="email" name="email" defaultValue="Alex@gmail.com" />
          <FormRow type="password" name="password" defaultValue="111111" />
          <button
            type="submit"
            className="mt-4 cursor-pointer text-white bg-primary-500 border border-transparent rounded tracking-[1px] py-1.5 px-3 capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 w-full hover:bg-primary-700 hover:shadow-custom-3"
          >
            Sumbit
          </button>
          <button
            type="submit"
            className="mt-4 cursor-pointer text-white bg-primary-500 border border-transparent rounded tracking-[1px] py-1.5 px-3 capitalize inline-block shadow-custom-1 transition ease-in-out duration-300 w-full hover:bg-primary-700 hover:shadow-custom-3"
          >
            explore the app
          </button>
          <p className="m-0 text-center mt-4 font-500">
            Not a member?
            <Link to="/register" className="text-primary-500 ml-1  tracking-[1px]">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
