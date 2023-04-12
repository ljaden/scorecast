import { useState } from "react";

import type { Standings } from "@/pages/standings/index";
import TeamLogo from "../TeamLogo/TeamLogo";

type Props = {
  standings: Standings[];
};

const Standings = ({ standings }: Props) => {
  return (
    <>
      <div className="flex justify-center m-2 gap-2">
        {/* <button */}
        {/*   className={`${displayEast ? `bg-black text-white` : "text-gray-800" */}
        {/*     }  font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`} */}
        {/*   onClick={() => setDisplayEast(true)} */}
        {/* > */}
        {/*   East */}
        {/* </button> */}
        {/* <button */}
        {/*   className={`${!displayEast ? `bg-black text-white` : "text-gray-800" */}
        {/*     } font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`} */}
        {/*   onClick={() => setDisplayEast(false)} */}
        {/* > */}
        {/*   West */}
        {/* </button> */}
      </div>
      <div className="w-full text-center">
        <div className="overflow-hidden">
          <table className="table-fixed w-full">
            <thead className="border-b">
              <tr className="font-bold">
                <th className="capitalize text-gray-500">
                  {true ? "east" : "west"}
                </th>
                <th className="">OPP PPG</th>
                <th className="">PPG</th>
                <th className="">Diff</th>
                <th className="">GB</th>
                <th className="">Lost</th>
                <th className="">Standings#</th>
                <th className="">STRK</th>
                <th className="">PCT</th>
                <th className="">Wins</th>
                <th className="">Record</th>
                <th className="">Home Record</th>
                <th className="">Away Record</th>
                <th className="">Div Record</th>
                <th className="">Conf Record</th>
                <th className="">L10</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.team.abbrev} className="py-2 border-b">
                  <span className="font-bold">{team.team.abbrev}</span>
                  <td>{team.stats.opp_ppg}</td>
                  <td>{team.stats.ppg}</td>
                  <td>{team.stats.diff}</td>
                  <td>{team.stats.gb}</td>
                  <td>{team.stats.losses}</td>
                  <td>{team.stats.rank}</td>
                  <td>{team.stats.streak}</td>
                  <td>{team.stats.pct}</td>
                  <td>{team.stats.wins}</td>
                  <td>{team.stats.record}</td>
                  <td>{team.stats.home_record}</td>
                  <td>{team.stats.away_record}</td>
                  <td>{team.stats.div_record}</td>
                  <td>{team.stats.conf_record}</td>
                  <td>{team.stats.l10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Standings;
