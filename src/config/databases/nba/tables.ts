import { TableConfig } from "../../../Visualizer/types";

import gamesTable from "./tables/games.json";
import playerGameStatsTable from "./tables/player_game_stats.json";
import playersTable from "./tables/players.json";
import teamGameStatsTable from "./tables/team_game_stats.json";
import teamsTable from "./tables/teams.json";

const tables: TableConfig[] = [
  gamesTable,
  playerGameStatsTable,
  playersTable,
  teamGameStatsTable,
  teamsTable
];

export default tables;
