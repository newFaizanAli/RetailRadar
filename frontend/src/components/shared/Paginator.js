import { DATAPERPAGE } from "../lib/const";

const Pagenator = ({ filteredData, paginate, currentPage }) => {
  if (!filteredData || filteredData?.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="flex justify-center mt-6">
      <nav>
        <ul className="flex space-x-2">
          {Array.from({
            length: Math.ceil(filteredData?.length / DATAPERPAGE),
          }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagenator;
