export const tabsArr = ["代理配置", "本地数据", "国际化"] as const;

export type TopMenuType = typeof tabsArr[number]

