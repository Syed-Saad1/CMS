import React from "react";

function HomeScreen() {
  return (
    <div className="h-screen w-screen bg-blue-900">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold text-white">Home</h1>
        <p className="text-xl text-white font-semibold mt-4">
          {" "}
          this is a HomePage Under the Working
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
