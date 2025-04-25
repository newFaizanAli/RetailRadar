import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { useHandleFetch } from "../components/lib/custom_hooks/useHandleFetch ";
import { cleanProducts, extractRating } from "../components/lib/functions";
import InputField from "../components/elements/InputField";
import Loading from "../components/elements/Loading";

const HuntProducts = () => {
  const { handleFetch, isLoading } = useHandleFetch();
  const [huggingfaceKey, setHuggingfaceKey] = useState();
  const [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const productsData = location?.state?.products;
  const searchInfo = location?.state?.searchQuery;

  const analyzeDta = async () => {
    setErrorMessage("");
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

    const resp = await handleFetch("POST", `/analyze-products`, {
      products: top12,
      huggingfaceKey,
      analyseWay: huggingfaceKey ? "huggingface" : "pipeline",
    });

    if (resp?.error) {
      setErrorMessage(resp?.error);
    }

    if (resp?.success) {
      navigate("/hunting/products/recomand", {
        state: { generated_text: resp?.data },
      });
    }
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
        <div className="flex flex-wrap gap-2">
          <div>
            <InputField
              name={"huggingface_key"}
              type="text"
              placeholder={"huggingface api key"}
              value={huggingfaceKey}
              onChange={(e) => setHuggingfaceKey(e.target.value)}
            />
          </div>
          {!isLoading ? (
            <div>
              <Button
                className={"bg-green-500 px-3"}
                innerText={"Analyze Data"}
                onClick={() => analyzeDta()}
              />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      {ErrorMessage && (
        <p className="text-md text-gray-900 py-3 px-2">
          <b className="text-red-500">Error</b> : {ErrorMessage}
        </p>
      )}
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Sales</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Location</th>
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
              <td className="px-6 py-3">{item?.location}</td>
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
