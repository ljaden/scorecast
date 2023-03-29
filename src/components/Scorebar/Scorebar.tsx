import type { Scheduledata, ScheduleGameType } from "@/utils/types/index";

// rtk context
import type { RootState } from "@/RtkGlobals/store";
import { useSelector, useDispatch } from "react-redux";
import { nextDate, prevDate } from "@/RtkGlobals/features/date/dateSlice";

// components
import Game from "../Game/Game";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

import { getDailyGames } from "./utils/helpers";

type Props = {
  data: Scheduledata[];
  displayStats: (data: ScheduleGameType) => void;
};

const Scorebar = ({ data, displayStats }: Props) => {
  const rtkDate = useSelector((state: RootState) => state.date);
  const rtkDispatch = useDispatch();
  const schedule = getDailyGames(data, rtkDate.dateFormatted);

  return (
    <>
      <div className="flex gap-3 justify-between items-center border-b border-gray-300 py-4">
        <AiOutlineCaretLeft
          className="cursor-pointer"
          onClick={() => rtkDispatch(prevDate())}
        />
        <p>{rtkDate.date}</p>
        <AiOutlineCaretRight
          className="cursor-pointer"
          onClick={() => rtkDispatch(nextDate())}
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
