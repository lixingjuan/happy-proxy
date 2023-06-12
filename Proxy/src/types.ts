export const tabsArr = ['代理配置', '本地数据', '国际化'] as const;

export type TopMenuType = (typeof tabsArr)[number];

export interface LocalProxyItem {
  id: string;
  originalUrl: string;
  targetUrl: string;
  open: boolean;
  tags: string[];
}
