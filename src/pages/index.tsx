import { useState } from "react";
import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "./_app";
import type { Scheduledata, ScheduleGameType } from "@/utils/types";

// rtk context
import type { RootState } from "@/RtkGlobals/store";
import { useSelector } from "react-redux";

import Scorebar from "@/components/Scorebar/Scorebar";
import Scoreboard from "@/components/Scoreboard/Scoreboard";
import DashLayout from "@/components/Layouts/DashLayout";

import { getSchedule } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

type AppProps = {
  schedule: Scheduledata;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const date = context.query;
  const data = await getSchedule(typeof date === "string" ? date : "");

  return {
    props: {
      schedule: data ?? null,
    },
  };
};

const HomePage: NextPageWithLayout<AppProps> = ({ schedule }) => {
  const rtkDate = useSelector((state: RootState) => state.date);
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

  const { data } = useQuery<Scheduledata>({
    queryKey: ["schedule", rtkDate.dateFormatted],
    queryFn: () => axiosFetcher(`/api/schedule/${rtkDate.dateFormatted}`),
    initialData: schedule,
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

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default HomePage;
