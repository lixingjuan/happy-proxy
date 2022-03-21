export interface RecordItemType {
  hash: string;
  url: string;
  filePath: string;
  tags: string[];
  createTime: string;
  method?: Method;
}

export enum Method {
  Delete = "DELETE",
  Get = "GET",
  Post = "POST",
  Put = "PUT",
}

export type TopMenuType = "编辑器" | "本地数据" | "Morning" | "国际化";
