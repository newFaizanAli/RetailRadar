import React, { useCallback, useState } from "react";
import Button from "../components/elements/Button";
import InputField from "../components/elements/InputField";
import { useHandleFetch } from "../components/lib/custom_hooks/useHandleFetch ";
import { useNavigate } from "react-router-dom";
import Loading from "../components/elements/Loading";

const HuntingPage = () => {
  const { handleFetch, isLoading } = useHandleFetch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState({
    productName: "",
    platformName: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return alert("Please select an image first.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const result = await handleFetch("POST", `/predict/`, formData, true);
    console.log(result);
    console.log("Prediction Result:", result);
  };

  const fetchProduct = useCallback(async () => {
    if (!searchQuery.productName || !searchQuery.platformName) {
      return alert("Please enter both product name and platform.");
    }

    const formattedProductName = searchQuery.productName
      .trim()
      .replace(/\s+/g, "+");
    const formattedPlatform = searchQuery.platformName.trim().toLowerCase();

    const result = await handleFetch(
      "POST",
      `/product-hunting/${formattedProductName}/${formattedPlatform}`
    );

    if (result) {
      navigate("/hunting/products", {
        state: { products: result?.products, searchQuery },
      });
    }
  }, [handleFetch, searchQuery, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Product Hunting
        </h2>

        {/* 🔍 Image Upload Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Upload Product Image
            </label>
            <InputField
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              
            />
          </div>
          <Button
            className="w-full md:w-48 bg-indigo-700 text-white hover:bg-indigo-800 transition"
            innerText="Predict Product"
            onClick={handleUpload}
          />
        </div>

        {/* 🔍 Text-based Hunting Section */}
        <label className="block text-md font-medium mb-1 text-gray-700">
          Scrap your Product
        </label>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <InputField
            name="productName"
            className="w-full"
            placeholder="Product Name"
            value={searchQuery.productName}
            onChange={(e) =>
              setSearchQuery({
                ...searchQuery,
                [e.target.name]: e.target.value,
              })
            }
          />
          <select
            value={searchQuery.platformName}
            name="platformName"
            onChange={(e) =>
              setSearchQuery({
                ...searchQuery,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-4 py-3 border rounded-md text-gray-700"
          >
            <option value="">Select Platform</option>
            <option value="daraz">Daraz</option>
            <option value="amazon">Amazon</option>
            <option value="olx">OLX</option>
          </select>
        </div>

        <div className="flex gap-2 justify-center">
          {!isLoading ? (
            <Button
              className="w-full md:w-48 bg-indigo-700 text-white hover:bg-indigo-800 transition"
              innerText="Hunt Product"
              onClick={fetchProduct}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default HuntingPage;
