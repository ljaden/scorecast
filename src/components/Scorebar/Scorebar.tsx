import type { Scheduledata, ScheduleGameType } from "@/utils/types/index";

import { useDate } from "@/context/dateContext";

// components
import Game from "../Game/Game";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

import { getDailyGames } from "./utils/helpers";

type Props = {
  data: Scheduledata[];
  displayStats: (data: ScheduleGameType) => void;
};

const Scorebar = ({ data, displayStats }: Props) => {
  const { date, dateFormatted, dispatch } = useDate();
  const schedule = getDailyGames(data, dateFormatted);

  return (
    <>
      <div className="flex gap-3 justify-between items-center border-b border-gray-300 py-4">
        <AiOutlineCaretLeft
          className="cursor-pointer"
          onClick={() => dispatch({ type: "previous_date" })}
        />
        <p>{date}</p>
        <AiOutlineCaretRight
          className="cursor-pointer"
          onClick={() => dispatch({ type: "next_date" })}
        />
      </div>
      <ul className="flex justify-center gap-4 flex-wrap">
        {schedule?.games.map((game) => (
          <li
            key={game.gameId}
            className="w-48 border border-black my-1 pr-4 pl-4 pb-4 pt-1 hover:bg-red-300 whitespace-nowrap inline-block"
            onClick={() => displayStats(game)}
          >
            <Game {...game} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Scorebar;
