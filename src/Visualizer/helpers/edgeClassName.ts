export const edgeClassName = (edgeConfig: any, targetPosition?: string) => {
  let className = edgeConfig.relation === "hasOne" ? "has-one-edge" : "has-many-edge";

  if(edgeConfig.targetPosition) {
    if(edgeConfig.targetPosition === "right") {
      className += "-reversed";
    }
  } else if(targetPosition === "right") {
    className += "-reversed";
  }

  return className;
};
