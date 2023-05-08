import type { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

import DashLayout from "@/components/Layouts/DashLayout";

const TeamsPage: NextPageWithLayout = ({ }) => {
  return (
    <div>
      <p>This page is currently unavailble at this moment</p>
    </div>
  );
};
TeamsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default TeamsPage;
