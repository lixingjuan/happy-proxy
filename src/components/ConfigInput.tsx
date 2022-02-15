import { useState, useEffect } from "react";
import { Input } from "antd";

const defaultCookieDomain = ".datayes-stg.com";

const ConfigInput = () => {
  const [cookieDomain, setCookieDomain] = useState(defaultCookieDomain);

  const onCookieDomainChange = (e: any) => {
    const value = e.target.value;
    setCookieDomain(value);

    if (chrome?.storage?.sync?.set) {
      chrome.storage.sync.set({
        happyCookieDomain: value,
      });

      /** 监听本地happyCookieDomain对应的cookie变化 */
      let happyCookieDomain = "";

      chrome.storage.sync.get("happyCookieDomain", (res) => {
        happyCookieDomain = res.happyCookieDomain;
      });

      /** 监听所有 cookie 的变化 */
      chrome.cookies.onChanged.addListener((res) => {
        console.log(res);
        const { cookie } = res;
        const { domain, name, value, httpOnly } = cookie;

        if (domain !== happyCookieDomain) {
          return;
        }

        if (!httpOnly) {
          return;
        }

        const newHappyCookie = `${name}=${value}`;
        console.log({ newHappyCookie });

        chrome.storage.sync.set({
          happyCookie: newHappyCookie,
        });
      });
    }
  };

  useEffect(() => {
    if (chrome?.storage?.sync?.get) {
      chrome.storage.sync.get("happyCookieDomain", (res) => {
        const localDomain = res.happyCookieDomain || defaultCookieDomain;
        onCookieDomainChange({
          target: {
            value: localDomain,
          },
        });
      });
    }
  }, []);

  return (
    <Input
      size="small"
      value={cookieDomain}
      onChange={onCookieDomainChange}
      placeholder="请输入http-only的cookie Domain"
    />
  );
};

export default ConfigInput;
