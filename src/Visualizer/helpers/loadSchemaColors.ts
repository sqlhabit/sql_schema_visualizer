import { SchemaColors } from "../types/SchemaColors";
import schemaColors from "../../config/schemaColors.json";

export const loadSchemaColors = (): SchemaColors => {
  return (schemaColors as SchemaColors);
};
