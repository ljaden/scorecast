import { useState } from "react";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";
import Standings from "@/components/Standings/Standings";
import Conference from "@/components/Standings/Conference";

import { getStandingsByConf } from "@/utils/api/api";

type AppProps = {
  standings: {
    abbreviation: string;
    name: string;
    standings: Standings[];
  }[];
};

export type Standings = {
  team: {
    id: string;
    abbrev: string;
    displayName: string;
    shortDisplayName: string;
    logo: string;
    uid: string;
    recordSummary: string;
    standingSummary: string;
    location: string;
    links: string;
  };
  stats: {
    opp_ppg: string;
    ppg: string;
    diff: string;
    gb: string;
    losses: string;
    rank: string;
    streak: string;
    pct: string;
    wins: string;
    record: string;
    home_record: string;
    away_record: string;
    div_record: string;
    conf_record: string;
    l10: string;
  };
};

export const getServerSideProps = async () => {
  const standings = await getStandingsByConf();
  return {
    props: {
      standings,
    },
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  const [conf, setConf] = useState<"east" | "west">("east");
  console.log(standings);

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
            // onChange={(e) => setStandingOptions(e.target.value)}
            className="p-1"
          >
            <option value="Conference">Conference</option>
            <option value="Overall">Overall</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center m-2 gap-2 pt-4 pb-1">
        <button
          className={`${conf === "east" ? `bg-black text-white` : "text-gray-800"
            }  font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setConf("east")}
        >
          East
        </button>
        <button
          className={`${conf === "west" ? `bg-black text-white` : "text-gray-800"
            } font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setConf("west")}
        >
          West
        </button>
      </div>

      {conf === "east" && (
        <Conference
          standings={standings[0].standings}
          conference={standings[0].abbreviation}
        />
      )}
      {conf === "west" && (
        <Conference
          standings={standings[1].standings}
          conference={standings[1].abbreviation}
        />
      )}

      {/* {standingsOptions === "Overall" && ( */}
      {/*   <Standings standings={standings.standings} /> */}
      {/* )} */}
      {/* {standingsOptions === "Conference" && ( */}
      {/*   <Conference standings={ewStandings} /> */}
      {/* )} */}
    </>
  );
};

StandingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};
export default StandingsPage;
