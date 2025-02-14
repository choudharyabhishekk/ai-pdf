import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-10 h-10 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-xl font-semibold text-blue-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
