import { GetServerSideProps } from "next";

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

// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps = async () => {
  const standings = await getStandings();

  return {
    props: {
      standings,
    },
    revalidate: 60,
  };
};

const StandingsPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  return (
    <>
      <Overall standings={standings[0].standings} />
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
