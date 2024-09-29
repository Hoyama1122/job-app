import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAlljobContext } from "../pages/Alljob";
import { useLocation, useNavigate } from "react-router-dom";

const PageBtnContainer = () => {
  const {
    data: { numberOfPages, currentPage },
  } = useAlljobContext();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = (pageNumber) => {
    const isActive = pageNumber === currentPage;
    const activeClass = isActive
      ? "bg-primary-500 text-white"
      : "bg-gray-300 text-gray-700 hover:bg-gray-400";
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${activeClass}`}
        aria-label={`Go to page ${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="h-24 mt-8 flex items-center justify-center gap-6">
      {/* Previous Button */}
      <button
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numberOfPages;
          handlePageChange(prevPage);
        }}
        className={`cursor-pointer flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all ease-in-out ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Go to previous page"
        disabled={currentPage === 1}
      >
        <HiChevronDoubleLeft className="mr-2" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-3">
        {Array.from({ length: numberOfPages }, (_, index) =>
          addPageButton(index + 1)
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numberOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        className={`flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all ease-in-out ${
          currentPage === numberOfPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Go to next page"
        disabled={currentPage === numberOfPages}
      >
        Next
        <HiChevronDoubleRight className="ml-2" />
      </button>
    </div>
  );
};

export default PageBtnContainer;
