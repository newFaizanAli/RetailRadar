import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleFetch } from "../lib/custom_hooks/useHandleFetch ";

// import PropTypes from "prop-types";

import {
  deleteById,
  fireToast,
  handleQuerySearch,
  pageData,
} from "../lib/functions";

import Pagenator from "./Paginator";
import CustomTable from "./Table";
import MainWrapper from "../../pages/other/MainWrapper";

// /**

//  * @param {Array} data
//  * @param {Function} renderCard
//  * @param {Function} [onCardClick]
//  * @param {string} [emptyMessage]
//  * @param {Function} [handleDelete]
//  * @param {string} [updateUrl]
//  * @param {string} [handleApproved]
//  */

const Index = ({
  title,
  apiEndpoint,
  searchKey,
  columns,
  editRoute,
  deleteRoute,
  approvedRoute,
  //   handleDelete,
}) => {
  const { handleFetch } = useHandleFetch();

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await handleFetch("GET", apiEndpoint);
      setLoading(false);
      const dataKey = Object.keys(result)[0];

      if (!dataKey) throw new Error("Unexpected API response format");
      setData(result[dataKey]);
      setFilteredData(result[dataKey]);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  const handleDelete = async (ID) => {
    const confirmDelete = window.confirm(
      `Are you sure for delete this ${title?.toLowerCase()}`
    );
    if (confirmDelete) {
      const resp = await handleFetch("DELETE", `${deleteRoute}/${ID}`);
      if (resp.ID && resp.success) {
        const filterData = deleteById(filteredData, resp.ID);
        setFilteredData(filterData);
      }
    }
  };

  const handleApproved = async (item) => {
    const result = await handleFetch("POST", approvedRoute, { ...item }, false);

    if (result?.success) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
      handleQuerySearch(data, searchQuery, setFilteredData, searchKey);
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData || []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainWrapper className="flex flex-col items-center justify-center">
      {isLoading ? (
        <>Loading ..</>
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
          <CustomTable
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-meta-4">
                {columns.map((col, index) => (
                  <th key={index} className="p-3 text-left">
                    {col.label}
                  </th>
                ))}
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="dark:bg-meta-4">
                  {columns.map((col, index) => (
                    <td key={index} className="p-3">
                      {col.render
                        ? col.render(item[col.key.split(".")[0]])
                        : item[col.key] || "N/A"}
                    </td>
                  ))}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {editRoute && (
                        <button
                          type="button"
                          className="bg-indigo-500 text-white px-4 py-2 rounded-md  hover:bg-indigo-600 font-semibold shadow-md shadow-indigo-400 transition duration-300"
                          onClick={() => navigate(editRoute, { state: item })}
                        >
                          Edit
                        </button>
                      )}
                      {deleteRoute && (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold shadow-md shadow-red-400 transition duration-300"
                          onClick={() => handleDelete(item?._id)}
                        >
                          Delete
                        </button>
                      )}
                      {!item?.approved && approvedRoute && (
                        <>
                          <button
                            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 font-semibold shadow-md transition duration-300"
                            onClick={() => handleApproved(item)}
                          >
                            Approved
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>

          <Pagenator
            filteredData={filteredData}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </MainWrapper>
  );
};

export default Index;
