import { type MethodType, type RecordItemType } from "src/service";
export { MethodArr } from "src/service";

export type TopMenuType = "编辑器" | "本地数据" | "Morning" | "国际化";

/** 趋势 */
export type TrendType = "ascend" | "descend" | undefined;
export enum TrendTypeEnum {
  "ascend" = "ascend",
  "descend" = "descend",
}

/** 请求方式 */
export { MethodType, RecordItemType };

/** filter */
export interface FilterType {
  timeTrend?: TrendType;
  methods?: MethodType[];
  searchKey?: string;
}

export type UpdateFilterFn = (val: FilterType) => void;
