import { useState, useEffect } from "react";
import Chart from "./Chart";

import type { Standings } from "@/pages/standings/index";

type Props = {
  standings: {
    abbreviation: string;
    name: string;
    standings: Standings[];
  }[];
};

const Standings = ({ standings }: Props) => {
  const [conference, setConf] = useState<"east" | "west">("east");
  const [data, setData] = useState(standings[0]);

  useEffect(() => {
    setData(() => (conference === "east" ? standings[0] : standings[1]));
  }, [conference]);

  return (
    <>
      <div className="flex justify-center m-2 gap-2 pt-4 pb-1">
        <button
          className={`${conference === "east" ? `bg-black text-white` : "text-gray-800"
            }  font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setConf("east")}
        >
          East
        </button>
        <button
          className={`${conference === "west" ? `bg-black text-white` : "text-gray-800"
            } font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setConf("west")}
        >
          West
        </button>
      </div>
      <div className="w-full text-center p-5 bg-white shadow-2xl">
        <Chart data={data.standings} conference={conference} />
      </div>
    </>
  );
};

export default Standings;
