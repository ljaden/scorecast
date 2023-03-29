import { useState } from "react";
import { GetStaticProps } from "next";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import type { Scheduledata, ScheduleGameType } from "@/utils/types";

import Scorebar from "@/components/Scorebar/Scorebar";
import Scoreboard from "@/components/Scoreboard/Scoreboard";
import DashLayout from "@/components/Layouts/DashLayout";

import { getFullSchedule } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

type AppProps = {
  schedule: Scheduledata[];
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getFullSchedule();
  return {
    props: {
      schedule: data,
    },
  };
};

const DashboardPage: NextPageWithLayout<AppProps> = ({ schedule }) => {
  const [showGameStats, setShowGameStats] = useState<boolean>(false);
  const [singleGameStats, setSingleGameStats] =
    useState<ScheduleGameType | null>(null);

  const displayStats = (data: ScheduleGameType) => {
    setShowGameStats(true);
    setSingleGameStats(data);
  };

  const returnHome = () => {
    setShowGameStats(false);
    setSingleGameStats(null);
  };

  const { data } = useQuery<Scheduledata[]>({
    queryKey: ["schedule"],
    queryFn: () => axiosFetcher("/api/schedule"),
    initialData: schedule,
    staleTime: 60000,
  });

  return (
    <>
      {!showGameStats && <Scorebar data={data} displayStats={displayStats} />}
      {showGameStats && singleGameStats && (
        <Scoreboard {...singleGameStats} returnHome={returnHome} />
      )}
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default DashboardPage;
