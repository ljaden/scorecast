import type { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";
import TeamsLayout from "@/components/Layouts/TeamsLayout";

import { getTeams, getTeamSchedule } from "@/utils/api/api";

// components
// import TeamsGrid from "@/components/Teams/TeamsGrid";

export const getStaticPaths = async () => {
  const teamsData = await getTeams();
  const paths = teamsData["teams"].map((team) => ({
    params: { teamSlug: team.TeamSlug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const teamsData = await getTeams();
  const teamID = teamsData["teams"].filter(
    (team) => team.TeamSlug === params.teamSlug
  )[0].TeamID;

  //
  const team = await getTeamSchedule(teamID);

  return {
    props: {
      team,
    },
  };
};

const TeamsPage: NextPageWithLayout = ({ team }) => {
  console.log(team);

  return (
    <>
      <div>team</div>
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
