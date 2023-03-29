import React from "react";

// components
import Navbar from "@/components/Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const DashLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="flex flex-col md:flex-row gap-4 p-4">
        <aside className="w-full md:w-1/5">
          {" "}
          <Navbar />
        </aside>
        <section className="w-full md:w-4/5">{children}</section>
      </main>
    </>
  );
};

export default DashLayout;
