import type { Scheduledata, ScheduleGameType } from "@/utils/types/index";

// rtk context
import type { RootState } from "@/RtkGlobals/store";
import { useSelector, useDispatch } from "react-redux";
import { nextDate, prevDate } from "@/RtkGlobals/features/date/dateSlice";

// components
import Game from "../Game/Game";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

type Props = {
  data: Scheduledata | undefined;
  displayStats: (data: ScheduleGameType) => void;
};

const Scorebar = ({ data: schedule, displayStats }: Props) => {
  const rtkDate = useSelector((state: RootState) => state.date);
  const rtkDispatch = useDispatch();

  return (
    <>
      <div className="flex gap-3 justify-between items-center border-b border-gray-300 py-4 px-2 mb-4 bg-white shadow-2xl">
        <AiOutlineCaretLeft
          className="cursor-pointer"
          onClick={() => {
            rtkDispatch(prevDate());
          }}
        />
        <p>{rtkDate.date}</p>
        <AiOutlineCaretRight
          className="cursor-pointer"
          onClick={() => {
            rtkDispatch(nextDate());
          }}
        />
      </div>
      <ul className="flex justify-center gap-4 flex-wrap">
        {schedule ? (
          schedule?.games.map((game) => (
            <li
              key={game.gameId}
              className="w-48 my-3 pr-4 pl-4 pb-4 pt-1 hover:bg-red-300 whitespace-nowrap inline-block bg-white shadow-2xl"
              onClick={() => displayStats(game)}
            >
              <Game {...game} />
            </li>
          ))
        ) : (
          <span className="py-5">No Games</span>
        )}
      </ul>
    </>
  );
};

export default Scorebar;
