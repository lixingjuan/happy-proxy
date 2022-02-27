import { useState, useEffect, useCallback } from "react";
import { Input, message } from "antd";

const defaultCookieDomain = ".datayes-stg.com";

const ConfigInput = () => {
  const [cookieDomain, setCookieDomain] = useState(defaultCookieDomain);

  /** cookie domain change */
  const onCookieDomainChange = (e: any) => {
    const value = e.target.value;
    setCookieDomain(value);
  };

  /** 通知background 更新happyCookieDomain */
  const updateBackgroundHappyCookieDomain = useCallback(() => {
    if (!chrome?.runtime?.sendMessage) {
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "Update_Happy_Cookie_Domain",
        value: cookieDomain,
      },
      (response) => {
        if (response.message === "success") {
          message.success(response.message);
        }
      }
    );
  }, [cookieDomain]);

  /** 通知background 更新happyCookie */
  const updateBackgroundHappyCookie = useCallback(() => {
    if (!chrome?.cookies?.getAll) {
      return;
    }

    chrome.cookies.getAll({ domain: cookieDomain }, (res) => {
      const httpOnlyItems = res.find(
        (it) => it.httpOnly && it.domain === cookieDomain
      );

      if (httpOnlyItems) {
        const { name, value } = httpOnlyItems;
        const happyCookie = `${name}=${value}`;

        chrome.runtime.sendMessage(
          {
            action: "Update_Happy_Cookie",
            value: happyCookie,
          },
          (response) => {
            if (response.message === "success") {
              console.log("Update_Happy_Cookie 更新成功", happyCookie);
            }
          }
        );
      }
    });
  }, [cookieDomain]);

  useEffect(() => {
    updateBackgroundHappyCookieDomain();
    updateBackgroundHappyCookie();
  }, [
    cookieDomain,
    updateBackgroundHappyCookie,
    updateBackgroundHappyCookieDomain,
  ]);

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
