import React from "react";

const Index = ({ children, searchQuery, setSearchQuery }) => {
  return (
    <div className="overflow-x-auto">
      <div className="my-2 text-lg w-96">
        <div className="">
       <input
            className="w-full rounded border border-stroke bg-gray py-2 pl-2 pr-8 text-black focus:border-primary focus-visible:outline-none"
            type="text"
            id="searchQuery"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

  
        </div>
      </div>

      <table className="min-w-full bg-white text-sm">{children}</table>
    </div>
  );
};

export default Index;
