import { CloseIconProps } from "../types";

export function CloseIcon(props: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 50 50"
      className={props.className}
      onClick={() => { props.onClick && props.onClick() }}
    >
      <path d="M7.719 6.281L6.28 7.72 23.563 25 6.28 42.281 7.72 43.72 25 26.437 42.281 43.72l1.438-1.438L26.437 25 43.72 7.719 42.28 6.28 25 23.563z"></path>
    </svg>
  );
};
