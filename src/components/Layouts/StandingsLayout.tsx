import React from "react";

import { useRouter } from "next/router";

// components

type LayoutProps = {
  children: React.ReactNode;
};

const StandingsLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between p-4 bg-white shadow-2xl">
        <span className="font-extrabold text-2xl">Standings</span>
        <div className="flex flex-col items-center">
          <label
            htmlFor="groupby"
            className="text-sm font-medium text-gray-400"
          >
            Group By
          </label>
          <select
            name="groupby"
            id=""
            onChange={(e) =>
              router.push(`/standings/${e.target.value}`, undefined, {
                shallow: true,
              })
            }
            // value={value}
            className="p-1"
          >
            <option value="">Conference</option>
            <option value="overall">Overall</option>
            <option value="div">Division</option>
          </select>
        </div>
      </div>

      {children}
    </>
  );
};

export default StandingsLayout;
