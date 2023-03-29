export type StandingsType = {
  season: string;
  standings: TeamStandings[];
};

export type TeamStandings = {
  TeamID: number;
  TeamCity: string;
  TeamName: string;
  TeamSlug: string;
  Conference: string;
  ConferenceRecord: string;
  PlayoffRank: number;
  Division: string;
  DivisionRank: number;
  WINS: number;
  LOSSES: number;
  WinPCT: number;
  HOME: string;
  ROAD: string;
  L10: string;
  Last10Home: string;
  Last10Road: string;
  CurrentStreak: number;
  strCurrentStreak: string;
};
