import { useMemo, useState } from "react";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { StandingsType, TeamStandings } from "@/utils/types";

import DashLayout from "@/components/Layouts/DashLayout";
import Standings from "@/components/Standings/Standings";
import Conference from "@/components/Standings/Conference";

import { getStandingsByConf } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

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
      <div className="flex justify-between p-4">
        <span className="font-extrabold text-2xl">Standings</span>
        <select
          name=""
          id=""
        // onChange={(e) => setStandingsOptions(e.target.value)}
        >
          <option value="Overall">Overall</option>
          <option value="Conference">Conference</option>
        </select>
      </div>
      {conf === "east" && <Conference standings={standings[0].standings} />}
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
