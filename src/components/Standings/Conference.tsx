import { useState } from "react";

import type { Standings } from "@/pages/standings/index";
import Image from "next/image";

type Props = {
  standings: Standings[];
  conference: string;
};

const Standings = ({ standings, conference }: Props) => {
  return (
    <>
      <div className="w-full text-center p-5 bg-white shadow-2xl">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="font-bold">
              <th className="capitalize text-gray-400">{conference}</th>
              <th className="">Wins</th>
              <th className="">Lost</th>
              <th className="">PCT %</th>
              <th className="">GB</th>
              <th className="">STRK</th>
              <th className="">L10</th>
              <th className="hidden lg:table-cell">Home</th>
              <th className="hidden lg:table-cell">Away</th>
              <th className="hidden lg:table-cell">Div</th>
              <th className="hidden lg:table-cell">Conf</th>
              <th className="hidden lg:table-cell">PPG</th>
              <th className="hidden lg:table-cell">OPP PPG</th>
              <th className="hidden lg:table-cell">+/-</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr
                key={team.team.abbrev}
                className={`border-b ${team.stats.rank === "6"
                    ? "border-dashed border-black"
                    : team.stats.rank === "10"
                      ? "border-red-400"
                      : ""
                  }`}
              >
                <td className="flex gap-2 items-center py-2">
                  <span className="text-xs text-gray-400">
                    {team.stats.rank}
                  </span>
                  <Image
                    src={team.team.logo}
                    alt={`${team.team.abbrev}_logo`}
                    height={20}
                    width={20}
                  ></Image>

                  <span className="text-md font-semibold">
                    {team.team.abbrev}
                  </span>
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

                <td className="hidden lg:table-cell">
                  {team.stats.home_record}
                </td>
                <td className="hidden lg:table-cell">
                  {team.stats.away_record}
                </td>
                <td className="hidden lg:table-cell">
                  {team.stats.div_record}
                </td>
                <td className="hidden lg:table-cell">
                  {team.stats.conf_record}
                </td>
                <td className="hidden lg:table-cell">{team.stats.opp_ppg}</td>
                <td className="hidden lg:table-cell">{team.stats.ppg}</td>
                <td
                  className={`hidden lg:table-cell 
${team.stats.diff.startsWith("+") ? "text-green-600" : "text-red-600"}
                  `}
                >
                  {team.stats.diff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Standings;
