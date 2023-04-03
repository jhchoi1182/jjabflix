export interface IBackdropProps {
  animate?: { opacity: number };
  exit?: { opacity: number };
  onClick(): void;
}

export interface IForm {
  keyword: string;
}
