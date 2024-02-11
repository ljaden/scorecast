import React from "react";

// components

type LayoutProps = {
  children: React.ReactNode;
};

const TeamsLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex justify-between p-4 mb-5 bg-white shadow-2xl">
        <span className="text-2xl font-extrabold">Teams</span>
      </div>

      {children}
    </>
  );
};

export default TeamsLayout;
