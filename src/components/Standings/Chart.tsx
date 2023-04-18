import Image from "next/image";
import type { Standings } from "@/pages/standings/index";

type AppProps = {
  data: Standings[];
  conference?: string;
  division?: string;
};
const Chart = ({ data, conference, division }: AppProps) => {
  return (
    <table className="w-full text-sm table-fixed">
      <thead className="border-b border-black">
        <tr className="font-bold">
          <th className="capitalize text-gray-400">
            {division ?? conference ?? "Teams"}
          </th>
          <th className="">W</th>
          <th className="">L</th>
          <th className="">PCT %</th>
          <th className="">GB</th>
          <th className="">STRK</th>
          <th className="">L10</th>
          <th className="hidden lg:table-cell">Home</th>
          <th className="hidden lg:table-cell">Away</th>
          <th className="hidden lg:table-cell">Div</th>
          <th className="hidden lg:table-cell">Conf</th>
          <th className="hidden lg:table-cell">PPG</th>
          <th className="hidden lg:table-cell">OPPG</th>
          <th className="hidden lg:table-cell">+/-</th>
        </tr>
      </thead>
      <tbody>
        {data.map((team: Standings, index: number) => (
          <tr
            key={team.team.abbrev}
            className={`border-b ${conference && team.stats.rank === "6"
                ? "border-dashed border-black"
                : conference && team.stats.rank === "10"
                  ? "border-red-400"
                  : ""
              }`}
          >
            <td className="flex gap-2 items-center py-2">
              <span className="text-xs text-gray-400">{index + 1}</span>

              <Image
                src={team.team.logo}
                alt={`${team.team.abbrev}_logo`}
                height={20}
                width={20}
              ></Image>

              <span className="text-md font-semibold">{team.team.abbrev}</span>
            </td>
            <td>{team.stats.wins}</td>
            <td>{team.stats.losses}</td>
            <td>{team.stats.pct}</td>
            <td>{team.stats.gb}</td>
            <td
              className={`${team.stats.streak.startsWith("W")
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {team.stats.streak}
            </td>
            <td>{team.stats.l10}</td>

            <td className="hidden lg:table-cell">{team.stats.home_record}</td>
            <td className="hidden lg:table-cell">{team.stats.away_record}</td>
            <td className="hidden lg:table-cell">{team.stats.div_record}</td>
            <td className="hidden lg:table-cell">{team.stats.conf_record}</td>
            <td className="hidden lg:table-cell">{team.stats.opp_ppg}</td>
            <td className="hidden lg:table-cell">{team.stats.ppg}</td>
            <td
              className={`hidden lg:table-cell 
              ${team.stats.diff.startsWith("+")
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {team.stats.diff}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Chart;

{
  /*   <tr */
}
{
  /*     key={team.team.abbrev} */
}
{
  /*     className={`border-b ${team.stats.rank === "6" */
}
{
  /*         ? "border-dashed border-black" */
}
{
  /*         : team.stats.rank === "10" */
}
{
  /*           ? "border-red-400" */
}
{
  /*           : "" */
}
{
  /*       }`} */
}
{
  /*   > */
}
{
  /*     <td className="flex gap-2 items-center py-2"> */
}
{
  /*       <span className="text-xs text-gray-400">{team.stats.rank}</span> */
}
{
  /*       <Image */
}
{
  /*         src={team.team.logo} */
}
{
  /*         alt={`${team.team.abbrev}_logo`} */
}
{
  /*         height={20} */
}
{
  /*         width={20} */
}
{
  /*       ></Image> */
}
{
  /**/
}
{
  /*       <span className="text-md font-semibold"> */
}
{
  /*         {team.team.abbrev} */
}
{
  /*       </span> */
}
{
  /*     </td> */
}
{
  /*     <td>{team.stats.wins}</td> */
}
{
  /*     <td>{team.stats.losses}</td> */
}
{
  /*     <td>{team.stats.pct}</td> */
}
{
  /*     <td>{team.stats.gb}</td> */
}
{
  /*     <td */
}
{
  /*       className={`${team.stats.streak.startsWith("W") */
}
{
  /*           ? "text-green-600" */
}
{
  /*           : "text-red-600" */
}
{
  /*         }`} */
}
{
  /*     > */
}
{
  /*       {team.stats.streak} */
}
{
  /*     </td> */
}
{
  /*     <td>{team.stats.l10}</td> */
}
{
  /**/
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.home_record}</td> */
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.away_record}</td> */
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.div_record}</td> */
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.conf_record}</td> */
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.opp_ppg}</td> */
}
{
  /*     <td className="hidden lg:table-cell">{team.stats.ppg}</td> */
}
{
  /*     <td */
}
{
  /*       className={`hidden lg:table-cell  */
}
{
  /*       ${team.stats.diff.startsWith("+") */
}
{
  /*           ? "text-green-600" */
}
{
  /*           : "text-red-600" */
}
{
  /*         } */
}
{
  /*                         `} */
}
{
  /*     > */
}
{
  /*       {team.stats.diff} */
}
{
  /*     </td> */
}
{
  /*   </tr> */
}
{
  /* ))} */
}
{
  /* </Chart> */
}
