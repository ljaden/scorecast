import type { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";
import TeamsLayout from "@/components/Layouts/TeamsLayout";

import { getTeams } from "@/utils/api/api";

// components
import TeamsGrid from "@/components/Teams/TeamsGrid";

export const getStaticProps = async () => {
  const teamsData = await getTeams();

  return {
    props: {
      teamsData,
    },
    revalidate: 120,
  };
};
const TeamsPage: NextPageWithLayout = ({ teamsData }) => {
  const teams = teamsData["teams"].sort((a, b) => {
    return a.TeamCity.localeCompare(b.TeamCity);
  });

  return (
    <>
      <TeamsGrid teams={teams} />
    </>
  );
};

TeamsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashLayout>
      <TeamsLayout>{page}</TeamsLayout>
    </DashLayout>
  );
};

export default TeamsPage;
