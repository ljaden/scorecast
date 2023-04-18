import type { Standings } from "@/pages/standings/index";
import Chart from "./Chart";

type Props = {
  standings: Standings[];
};

const Overall = ({ standings }: Props) => {
  return (
    <div className="w-full text-center p-5 my-5 bg-white shadow-2xl">
      <Chart data={standings} />
    </div>
  );
};

export default Overall;
