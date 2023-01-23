// An SVG z-index hack to move selected edge on top of other edges.
export const moveSVGInFront = (element?: Element | null) => {
  if(!element) {
    return;
  }

  const svg = element.closest("svg");
  svg?.appendChild(element);
}
