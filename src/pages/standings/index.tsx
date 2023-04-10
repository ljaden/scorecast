import { useMemo, useState } from "react";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { StandingsType, TeamStandings } from "@/utils/types";

import DashLayout from "@/components/Layouts/DashLayout";
import Standings from "@/components/Standings/Standings";
import Conference from "@/components/Standings/Conference";

import { getStandings } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

type AppProps = {
  standings: StandingsType;
  ewStandings: {
    east: TeamStandings[];
    west: TeamStandings[];
  };
};

export const getServerSideProps = async () => {
  const standings = await getStandings();
  const ewStandings = standingsEastWest(standings);
  return {
    props: {
      standings,
      ewStandings,
    },
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({
  standings,
  ewStandings,
}) => {
  const [standingsOptions, setStandingsOptions] = useState<string>("Overall");
  // const { data } = useQuery<StandingsType>({
  //   queryKey: ["standings"],
  //   queryFn: () => axiosFetcher("/api/standings"),
  //   initialData: standings,
  //   onSuccess: (data) => console.log(data),
  // });

  return (
    <>
      <div className="flex justify-between p-4">
        <span className="font-extrabold text-2xl">Standings</span>
        <select
          name=""
          id=""
          onChange={(e) => setStandingsOptions(e.target.value)}
        >
          <option value="Overall">Overall</option>
          <option value="Conference">Conference</option>
        </select>
      </div>
      {standingsOptions === "Overall" && (
        <Standings standings={standings.standings} />
      )}
      {standingsOptions === "Conference" && (
        <Conference standings={ewStandings} />
      )}
    </>
  );
};

export const standingsEastWest = (standings: StandingsType) => {
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
