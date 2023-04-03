import { GetStaticProps } from "next";
import { useState } from "react";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { StandingsType } from "@/utils/types";

import DashLayout from "@/components/Layouts/DashLayout";
import Standings from "@/components/Standings/Standings";
import Conference from "@/components/Standings/Conference";

import { getStandings } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

type AppProps = {
  standings: StandingsType;
};

export const getServerSideProps = async () => {
  const data = await getStandings();
  return {
    props: {
      standings: data,
    },
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  const [filterSettings, setFilterSettings] = useState<string>("Overall");
  const { data } = useQuery<StandingsType>({
    queryKey: ["standings"],
    queryFn: () => axiosFetcher("/api/standings"),
    initialData: standings,
  });

  let filterStandings: any;

  switch (filterSettings) {
    case "Division":
      filterStandings = {
        alantic: data.standings.filter((team) => team.Division === "Alantic"),
        northwest: data.standings.filter(
          (team) => team.Division === "Northwest"
        ),
        southeast: data.standings.filter(
          (team) => team.Division === "Southeast"
        ),
        central: data.standings.filter((team) => team.Division === "Central"),
        pacific: data.standings.filter((team) => team.Division === "Pacific"),
        southwest: data.standings.filter(
          (team) => team.Division === "Southwest"
        ),
      };
      break;
    case "Conference":
      filterStandings = {
        west: data.standings.filter((team) => team.Conference === "West"),
        east: data.standings.filter((team) => team.Conference === "East"),
      };
      break;
  }

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
          <option value="Division" disabled>
            Division(WIP)
          </option>
        </select>
      </div>
      {filterSettings === "Overall" && <Standings standings={data.standings} />}
      {filterStandings && filterSettings === "Conference" && (
        <Conference standings={filterStandings} />
      )}
    </>
  );
};

StandingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};
export default StandingsPage;
