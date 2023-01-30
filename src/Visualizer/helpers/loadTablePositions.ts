import { TablePositions } from "../types";
import tablePositions from "../../config/databases/bindle/tablePositions.json";

export const loadTablePositions = (): TablePositions => {
  return tablePositions;
};
