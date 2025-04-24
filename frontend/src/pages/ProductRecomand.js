import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const extractRecommendation = (rawText) => {
  if (!rawText) return "";

  // Check for both variations, with and without space after "Based"
  const start = rawText.indexOf("- Based on the analysis of similar market products");

  return start !== -1 ? rawText.slice(start).trim() : rawText;
};


const ProductRecomand = () => {
  const location = useLocation();
  const stateData = location?.state;
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {


    if (stateData?.generated_text) {
      const cleanText = extractRecommendation(stateData.generated_text[0]?.generated_text);
      setRecommendation(cleanText);
    }
  }, [stateData]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Product Recommendation
      </h2>
      {recommendation ? (
        <pre className="whitespace-pre-wrap text-gray-700 text-base font-mono">
          {recommendation}
        </pre>
      ) : (
        <p className="text-gray-500">No recommendation data available.</p>
      )}
    </div>
  );
};

export default ProductRecomand;
