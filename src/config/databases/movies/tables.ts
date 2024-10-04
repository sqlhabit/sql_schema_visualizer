import { TableConfig } from "../../../Visualizer/types";

import actorsTable from "./tables/actors.json";
import actorsMoviesTable from "./tables/actors_movies.json";
import directorsTable from "./tables/directors.json";
import genresTable from "./tables/genres.json";
import genresMoviesTable from "./tables/genres_movies.json";
import moviesTable from "./tables/movies.json";
import ratingsTable from "./tables/ratings.json";

const tables: TableConfig[] = [
  actorsTable,
  actorsMoviesTable,
  directorsTable,
  genresTable,
  genresMoviesTable,
  moviesTable,
  ratingsTable
];

export default tables;
