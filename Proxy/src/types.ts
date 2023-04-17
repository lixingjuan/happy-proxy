export const tabsArr = ['代理配置', '本地数据', '国际化'] as const;

export type TopMenuType = typeof tabsArr[number];

export interface LocalProxyItem {
  beProxyUrl: string;
  targetUrl: string;
  target: string;
  open: boolean;
  tags: string[];
}

export interface ProxyItem {
  /** 被代理的url */
  beProxyUrl: string;
  /** 目标地址 */
  targetUrl: string;
  /** tags */
  tags: string[];
  /** 代理状态，true表示需要被代理 */
  open: boolean;
  /** 响应体 */
  responseBody: Object;
}
