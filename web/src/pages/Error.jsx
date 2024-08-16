import { Link, useRouteError } from "react-router-dom";
import Errorimg from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className="min-h-screen text-center flex flex-col items-center justify-center">
        <img
          src={Errorimg}
          className="w-[90vw] max-w-[600px] block mb-8 mt-[-3rem]"
          alt="Error"
        />
        <h3 className="text-3xl mb-2">Oh!! page not found</h3>
        <p className="leading-6 mt-2 mb-4 text-gray-500">
          we can&apos;t seem to find the page you are looking for
        </p>
        <Link to="/dashboard" className="text-primary-500 capitalize text-3xl">
          Back home
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen text-center flex items-center justify-center">
        <h1 className="text-4xl">something went wrong.</h1>
        <br />
        <Link to="/dashboard" className="text-3xl text-primary-500">
          Back Home
        </Link>
      </div>
    </>
  );
};

export default Error;
