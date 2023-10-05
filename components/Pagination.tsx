import { PaginationProps } from "@/utils/Types";
import React from "react";


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center my-4 gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} px-3 py-1 rounded-l`}
      >
        Previous
      </button>
      <span className="px-3 py-1 bg-blue-500">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} px-3 py-1 rounded-r`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
