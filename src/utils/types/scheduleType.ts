export type Scheduledata = {
  gameDate: string;
  games: ScheduleGameType[];
};

export type ScheduleGameType = {
  gameId: string;
  gameCode: string;
  gameStatus: number;
  gameStatusText: string;
  gameSequence: number;
  gameDateEst: string;
  gameTimeEst: string; //"1900-01-01T19:00:00Z",
  gameDateTimeEst: string; //"2023-02-27T19:00:00Z";
  gameDateUTC: string; // "2023-02-27T05:00:00Z";
  gameTimeUTC: string; //"1900-01-02T00:00:00Z";
  gameDateTimeUTC: string; //"2023-02-28T00:00:00Z";
  awayTeamTime: string; //"2023-02-27T19:00:00Z";
  homeTeamTime: string; //"2023-02-27T19:00:00Z";
  day: string; //"Mon";
  monthNum: number; //2;
  weekNumber: number; // 20;
  weekName: string; //"Week 20";
  ifNecessary: boolean; //false;
  seriesGameNumber: string; //"";
  seriesText: string; //"";
  arenaName: string; //"Spectrum Center";
  arenaState: string; // "NC";
  arenaCity: string; // "Charlotte";
  postponedStatus: string; //"A";
  branchLink: string; //"https://app.link.nba.com/n2i8FLuzCsb";
  gameSubtype: string; //"";
  broadcasters: {
    nationalTvBroadcasters: Broadcaster;
  };
  homeTeam: Team;
  awayTeam: Team;
};

export type Team = {
  teamId: number; //1610612766;
  teamName: string; //"Hornets";
  teamCity: string; //"Charlotte";
  teamTricode: string; //"CHA";
  teamSlug: string; //"hornets";
  wins: number; //19;
  losses: number; //43;
  score: number; //0;
  seed: number; //0;
};

type Broadcaster = {
  broadcasterScope: string;
  broadcasterMedia: string;
  broadcasterId: number;
  broadcasterDisplay: string;
  broadcasterAbbreviation: string;
  tapeDelayComments: string;
  broadcasterVideoLink: string;
  regionId: number;
}[];
