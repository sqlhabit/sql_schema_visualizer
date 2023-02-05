export type DatabasePopupProps = {
  headline: string;
  subheadline?: string;
}

export type PopupProps = {
  onClose: Function;
}

export type DatabaseMenuPopupProps = DatabasePopupProps & PopupProps;
