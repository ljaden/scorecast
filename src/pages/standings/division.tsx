import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { Standings } from "@/pages/standings/index";

import DashLayout from "@/components/Layouts/DashLayout";
import StandingsLayout from "@/components/Layouts/StandingsLayout";

import Division from "@/components/Standings/Division";

import { getStandingsByDiv } from "@/utils/api/api";

type AppProps = {
  standings: {
    name: string;
    children: ChildrenProp[];
  }[];
};

type ChildrenProp = {
  abbreviation: string;
  name: string;
  standings: Standings[];
};

export const getStaticProps = async () => {
  const standings = await getStandingsByDiv();

  return {
    props: {
      standings,
    },
    revalidate: 120,
  };
};

const DivisionPage: NextPageWithLayout<AppProps> = ({ standings }) => {
  return (
    <>
      {standings.map((standing) => (
        <Division key={standing.name} standings={standing} />
      ))}
    </>
  );
};

DivisionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashLayout>
      <StandingsLayout>{page}</StandingsLayout>
    </DashLayout>
  );
};
export default DivisionPage;
