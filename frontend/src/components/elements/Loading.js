import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
