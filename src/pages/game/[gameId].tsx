import { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import type { GameType } from "@/utils/types";

import { useRouter } from "next/router";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

import DashLayout from "@/components/Layouts/DashLayout";

const GamePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { d, gameId } = router.query;

  const { data, isLoading, isError } = useQuery<GameType>({
    queryKey: ["gameStats", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>ERROR</div>;

  console.log(data);

  return (
    <>
      <div>{gameId}</div>
    </>
  );
};

GamePage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};
export default GamePage;
