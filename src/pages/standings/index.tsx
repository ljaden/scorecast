import { useMemo, useState } from "react";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { StandingsType, TeamStandings } from "@/utils/types";

import DashLayout from "@/components/Layouts/DashLayout";
import Standings from "@/components/Standings/Standings";
import Conference from "@/components/Standings/Conference";

import { getStandings } from "@/utils/api/api";

type AppProps = {
  standings: StandingsType;
};

export const getStaticProps = async () => {
  const data = await getStandings();
  return {
    props: {
      standings: data,
    },
    revalidate: 60,
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  const [filterSettings, setFilterSettings] = useState<string>("Overall");

  const ewStandings = useMemo(() => standingsEastWest(standings), [standings]);

  return (
    <>
      <div className="flex justify-between p-4">
        <span className="font-extrabold text-2xl">Standings</span>
        <select
          name=""
          id=""
          onChange={(e) => setFilterSettings(e.target.value)}
        >
          <option value="Overall">Overall</option>
          <option value="Conference">Conference</option>
        </select>
      </div>
      {filterSettings === "Overall" && (
        <Standings standings={standings.standings} />
      )}
      {ewStandings && filterSettings === "Conference" && (
        <Conference standings={ewStandings} />
      )}
    </>
  );
};

const standingsEastWest = (standings: StandingsType) => {
  const eastWest: { east: TeamStandings[]; west: TeamStandings[] } = {
    east: [],
    west: [],
  };

  standings.standings.forEach((team) => {
    team.Conference === "East"
      ? eastWest["east"].push(team)
      : eastWest["west"].push(team);
  });

  return eastWest;
};

StandingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};
export default StandingsPage;
