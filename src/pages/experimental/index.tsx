import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useState, useCallback, useEffect } from "react";
import { useTeamAndPlayersInfo } from "@/utils/experimental/customHooks/useTeamAndPlayersInfo";
import { usePlayerStats } from "@/utils/experimental/customHooks/usePlayerStats";
import { useGameStats } from "@/utils/experimental/customHooks/useGameStats";
import {
  PLAYERS_CONSTANT,
  GAMES_CONSTANT,
} from "@/utils/experimental/constants/propConstants";
import {
  findAvgStats,
  findAvgStatsForGames,
  dateString,
} from "@/utils/experimental/helpers/helperFunctions";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

// mui
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

// components
import { PlayersAutoComplete } from "@/components/Experimental/PlayersAutoComplete";
import { GamesAutoComplete } from "@/components/Experimental/GamesAutoComplete";
import { PlayersGrid } from "@/components/Experimental/PlayersGrid";
import { GamesGrid } from "@/components/Experimental/GamesGrid";
import { PlayerAverageStatsForm } from "@/components/Experimental/PlayerAverageStatsForm";
import { TeamAverageStatsForm } from "@/components/Experimental/TeamAverageStatsForm";

// Layout
import DashLayout from "@/components/Layouts/DashLayout";

import moment, { Moment } from "moment";

const ExperimentalPage: NextPageWithLayout = () => {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [selectedTeam, setSelectedTeam] = useState({});
  const [opposingTeamForPlayers, setOpposingTeamForPlayers] = useState({});
  const [opposingTeamForGames, setOpposingTeamForGames] = useState({});

  const [startDate, setStartDate] = useState<Moment | null>(
    moment().subtract(1, "days")
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    moment().subtract(1, "days")
  );
  const [dates, setDates] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<any>(null);

  const [actualNumGames, setActualGames] = useState(0);
  const [numGames, setNumGames] = useState(0);

  const [gamesOrPlayersFlag, setGamesOrPlayersFlag] = useState("players");

  const resetPlayerStates = useCallback(() => {
    setSelectedPlayer({});
    setOpposingTeamForPlayers({});
    setNumGames(0);
    setActualGames(0);
  }, []);

  const resetGameStates = useCallback(() => {
    setSelectedTeam({});
    setOpposingTeamForGames({});
    setNumGames(0);
    setActualGames(0);
  }, []);

  useEffect(() => {
    if (gamesOrPlayersFlag === "players") resetPlayerStates();
    else if (gamesOrPlayersFlag === "games") resetGameStates();
  }, [gamesOrPlayersFlag]);

  const [playerInfo, teamInfo] = useTeamAndPlayersInfo();

  const [
    playerStats,
    setPlayerStats,
    isFetchingPlayerStats,
    isErrorPlayerStats,
  ] = usePlayerStats(
    gamesOrPlayersFlag,
    selectedPlayer,
    opposingTeamForPlayers,
    dates
  );

  const [gameStats, setGameStats, isFetchingGameStats, isErrorGameStats] =
    useGameStats(gamesOrPlayersFlag, selectedTeam, opposingTeamForGames, dates);

  function applyDates() {
    setDates([dateString(startDate), dateString(endDate)]);
  }

  function resetDates() {
    setDates([]);
  }
  return (
    <>
      <div className="body-content">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ "& > *": { m: 1, pr: 2 } }}
        >
          <Button
            onClick={() => setGamesOrPlayersFlag("players")}
            className={`${gamesOrPlayersFlag === "players" ? "bg-[#0d86ae]" : "bg-[#b6b6b6]"
              }`}
          >
            Player Stats
          </Button>
          <Button
            onClick={() => setGamesOrPlayersFlag("games")}
            className={`${gamesOrPlayersFlag === "games" ? "bg-[#0d86ae]" : "bg-[#b6b6b6]"
              }`}
          >
            Game Stats
          </Button>
        </ButtonGroup>
        {gamesOrPlayersFlag === PLAYERS_CONSTANT ? (
          <PlayersAutoComplete
            playerInfo={playerInfo}
            setSelectedPlayer={setSelectedPlayer}
            resetPlayerStates={resetPlayerStates}
          />
        ) : (
          <GamesAutoComplete
            teamInfo={teamInfo}
            setSelectedTeam={setSelectedTeam}
            label="NBA Games"
            resetGameStates={resetGameStates}
          />
        )}

        <div id="calendar-group">
          <DateRangePicker
            startDate={startDate}
            startDateId="start_date_id"
            endDate={endDate}
            endDateId="end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(fi) => setFocusedInput(fi)}
            isOutsideRange={(day) => day.isAfter(moment().subtract(1, "day"))}
          />

          <div className="flex flex-row">
            <Button type="submit" onClick={applyDates}>
              Apply Dates
            </Button>
            <Button type="submit" onClick={resetDates}>
              Reset Dates
            </Button>
          </div>
        </div>

        {Object.keys(selectedTeam).length > 0 &&
          gamesOrPlayersFlag === GAMES_CONSTANT && (
            <div className="filter-card">
              <TeamAverageStatsForm
                actualNumGames={actualNumGames}
                findAvgStatsForGames={() =>
                  findAvgStatsForGames(
                    gameStats,
                    numGames,
                    setActualGames,
                    setGameStats,
                    selectedTeam
                  )
                }
                numGames={numGames}
                setNumGames={setNumGames}
              />
              <GamesAutoComplete
                teamInfo={teamInfo}
                setSelectedTeam={setOpposingTeamForGames}
                label="Opposing Team"
                resetGameStates={undefined}
              />
            </div>
          )}
        <div className="player-props-table">
          {gamesOrPlayersFlag === PLAYERS_CONSTANT ? (
            <PlayersGrid
              playerStats={playerStats}
              isFetchingPlayerStats={isFetchingPlayerStats}
              isError={isErrorPlayerStats}
            />
          ) : (
            <GamesGrid
              gameStats={gameStats}
              isFetchingGameStats={isFetchingGameStats}
              isError={isErrorGameStats}
            />
          )}
        </div>
      </div>
    </>
  );
};

ExperimentalPage.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};
export default ExperimentalPage;
