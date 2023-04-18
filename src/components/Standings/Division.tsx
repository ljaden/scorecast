import type { Standings } from "@/pages/standings/index";
import Chart from "./Chart";

type Props = {
  standings: {
    name: string;
    children: {
      abbreviation: string;
      name: string;
      standings: Standings[];
    }[];
  };
};

const Overall = ({ standings }: Props) => {
  return (
    <div className="w-full text-center p-5 my-5 bg-white shadow-2xl">
      {standings.children.map((division) => (
        <div key={division.name} className="mb-5">
          <Chart data={division.standings} division={division.name} />
        </div>
      ))}
    </div>
  );
};

export default Overall;
