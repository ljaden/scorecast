import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";
import StandingsLayout from "@/components/Layouts/StandingsLayout";

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

export const getStaticProps = async () => {
  const standings = await getStandingsByConf();

  return {
    props: {
      standings,
    },
    revalidate: 120,
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  return (
    <>
      <Conference standings={standings} />
    </>
  );
};

StandingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashLayout>
      <StandingsLayout>{page}</StandingsLayout>
    </DashLayout>
  );
};
export default StandingsPage;
