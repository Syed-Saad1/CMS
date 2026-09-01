import React from "react";
import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className=" h-screen w-full overflow-hidden lg:grid lg:grid-cols-2 justify-center items-center rounded-xl">
      {" "}
      <div className="lg:flex hidden  bg-[url('/FormSide.png')] bg-cover  overflow-hidden  h-full bg-no-repeat  ">
        <div className="flex flex-col bg-linear-to-t from-white/70 to-transparent size-full justify-between px-14">
          {" "}
          <div className="mt-4">
            {" "}
            <Link to={"/"}>
              {" "}
              <img
                className="h-14! w-32  object-cover"
                src="/logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="w-full mb-10 ">
            <h1 className="text-4xl max-w-100! font-inter font-extrabold text-[#180289]">
              Empower Your Academic Journey
            </h1>
            <p className="max-w-112.5! text-md font-inter mt-5 text-gray-600">
              A modern and user-friendly dashboard for managing courses,
              students, instructors, enrollments, schedules, and academic
              performance in one centralized system.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
