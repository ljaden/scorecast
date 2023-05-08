import type { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";

const PlayersPage: NextPageWithLayout = ({ }) => {
  return (
    <div>
      <p>This page is currently unavailble at this moment</p>
    </div>
  );
};
PlayersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default PlayersPage;
