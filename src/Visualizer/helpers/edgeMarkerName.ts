export const edgeMarkerName = (edgeConfig: any, targetPosition?: string) => {
  let markerName = edgeConfig.relation === "hasOne" ? "hasOne" : "hasMany";

  if(edgeConfig.targetPosition) {
    if(edgeConfig.targetPosition === "right") {
      markerName += "Reversed";
    }
  } else if(targetPosition === "right") {
    markerName += "Reversed";
  }

  return markerName;
};
