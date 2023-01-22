export const calculateTargetPosition = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number
) => {
  if(sourceNodeX > (targetNodeX + targetNodeWidth)) {
    return "right";
  } else if (sourceNodeX > targetNodeX && sourceNodeX < (targetNodeX + targetNodeWidth)) {
    return "right";
  } else if ((sourceNodeX + sourceNodeWidth) > targetNodeX) {
    return "left";
  } else {
    return "left";
  }
};
