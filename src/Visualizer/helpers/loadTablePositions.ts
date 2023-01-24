import { TablePositions } from "../types";
import tablePositions from "../../config/tablePositions.json";

export const loadTablePositions = (): TablePositions => {
  return tablePositions;
};
