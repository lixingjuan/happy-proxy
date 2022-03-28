export interface RecordItemType {
  hash: string;
  url: string;
  filePath: string;
  tags: string[];
  createTime: string;
  method?: MethodType;
}

export type TopMenuType = "编辑器" | "本地数据" | "Morning" | "国际化";

/** 趋势 */
export type TrendType = "ascend" | "descend" | undefined;

/** 请求方式 */
export type MethodType = "GET" | "POST" | "DELETE" | "PUT";

/** filter */
export interface FilterType {
  timeTrend: TrendType;
  methods: MethodType[];
}

export type UpdateFilterFn = (val: FilterType) => void;
