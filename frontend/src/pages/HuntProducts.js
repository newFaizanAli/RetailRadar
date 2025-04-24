import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { useHandleFetch } from "../components/lib/custom_hooks/useHandleFetch ";
import { cleanProducts, extractRating } from "../components/lib/functions";

const HuntProducts = () => {
  const { handleFetch } = useHandleFetch();
  const navigate = useNavigate();
  const location = useLocation();
  const productsData = location?.state?.products;
  const searchInfo = location?.state?.searchQuery;

  const analyzeDta = async () => {
    const sorted = cleanProducts(productsData)
      .map((p) => ({
        ...p,
        ratingValue: extractRating(p.rating),
        priceValue: parseFloat(p.price.replace(/[^\d.]/g, "")) || 0,
      }))
      .sort((a, b) => {
        if (b.ratingValue !== a.ratingValue)
          return b.ratingValue - a.ratingValue;
        return a.priceValue - b.priceValue;
      });

    const keyword = searchInfo?.productName;
    const matched = sorted.filter((p) =>
      p.name.toLowerCase().includes(keyword?.toLowerCase())
    );
    const top12 = matched.slice(0, 2);

    const result = await handleFetch("POST", `/analyze-products`, {
      products: top12,
    });
    // if (result?.success) {
    //   navigate("/hunting/products/recomand", {
    //     state: { generated_text: result?.data},
    //   });
    // }
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 m-4">
      <div className="flex my-3 mx-2 justify-between">
        <div>
          <h3 className="text-lg ">
            <b>Product</b> : {searchInfo?.productName}
          </h3>
          <h3 className="text-lg">
            <b>Platform</b> : {searchInfo?.platformName}
          </h3>
        </div>
        <div>
          <Button
            className={"bg-green-500 px-3"}
            innerText={"Analyze Data"}
            onClick={() => analyzeDta()}
          />
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Sales</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {productsData?.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-3">{idx + 1}</td>
              <td className="px-6 py-3 truncate max-w-xs">{item?.name}</td>
              <td className="px-6 py-3">{item?.price}</td>
              <td className="px-6 py-3">{item?.salesInfo}</td>
              <td className="px-6 py-3">{item?.rating}</td>
              <td className="px-6 py-3">
                <Link
                  to={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HuntProducts;
