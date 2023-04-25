import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { Standings } from "@/pages/standings/index";

import DashLayout from "@/components/Layouts/DashLayout";
import StandingsLayout from "@/components/Layouts/StandingsLayout";

import Overall from "@/components/Standings/Overall";

import { getStandings } from "@/utils/api/api";

type AppProps = {
  standings: {
    abbreviation: string;
    name: string;
    standings: Standings[];
  }[];
};

export const getStaticProps = async () => {
  const standings = await getStandings();

  return {
    props: {
      standings,
    },
    revalidate: 120,
  };
};

const OverallPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  return (
    <>
      <Overall standings={standings[0].standings} />
    </>
  );
};

OverallPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashLayout>
      <StandingsLayout>{page}</StandingsLayout>
    </DashLayout>
  );
};
export default OverallPage;
