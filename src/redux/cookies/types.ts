export type ValueItem = {
  min: number;
  max: number;
};
export type DroppedCookie = {
  position: number;
  value: any;
};

export interface CookiesSliceState {
  sortedMode: string;
  countItems: number;
  defaultCountItems: number;
  currentMode: ValueItem;
  values: any[];
  dropped: DroppedCookie[];
  modes: object;
}
