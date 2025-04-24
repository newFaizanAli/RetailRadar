import React, { useState } from "react";
import MainWrapper from "../../pages/other/MainWrapper";
import useGeneratePDF from "../lib/custom_hooks/useGeneratePDF";
import { DATAPERPAGE } from "../lib/const";
import Pagenator from "./Paginator";

const CustomReport = ({
  title,
  topBar,
  children,
  filteredData,
  reportName,
}) => {
  const { generatePDF } = useGeneratePDF();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastData = currentPage * DATAPERPAGE;
  const indexOfFirstData = indexOfLastData - DATAPERPAGE;
  const currentData = filteredData?.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainWrapper className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-8 rounded-lg bg-white shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {title || "N/A"} Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topBar}
            <button
              className="bg-blue-500 font-medium  text-white rounded"
              onClick={() => generatePDF(currentData, reportName)}
            >
              Report PDF
            </button>
          </div>
        </div>
        {/* {children} */}
        {typeof children === "function" ? children(currentData) : null}
        <Pagenator
          dataPerPage={DATAPERPAGE}
          filteredData={filteredData}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </MainWrapper>
  );
};

export default CustomReport;
