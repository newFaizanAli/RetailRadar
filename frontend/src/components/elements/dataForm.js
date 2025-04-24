import React from "react";
import Button from "./Button";


const DataForm = ({ formik, children }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
         {children}
      <div className="mt-3">
        <Button innerText={"Submit"} className={"w-full py-3 bg-gray-700"} />
      </div>
    </form>
  );
};

export default DataForm;
