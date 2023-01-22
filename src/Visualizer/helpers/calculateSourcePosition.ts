export const calculateSourcePosition = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number
) => {
  if(sourceNodeX > (targetNodeX + targetNodeWidth)) {
    return "left";
  } else if (sourceNodeX > targetNodeX && sourceNodeX < (targetNodeX + targetNodeWidth)) {
    return "right";
  } else if ((sourceNodeX + sourceNodeWidth) > targetNodeX) {
    return "left";
  } else {
    return "right";
  }
};
