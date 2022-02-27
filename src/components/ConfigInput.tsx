import { useState, useEffect } from "react";
import { Input, message } from "antd";

const defaultCookieDomain = ".datayes-stg.com";

const ConfigInput = () => {
  const [cookieDomain, setCookieDomain] = useState(defaultCookieDomain);

  const onCookieDomainChange = (e: any) => {
    const value = e.target.value;
    setCookieDomain(value);

    chrome.runtime.sendMessage(
      {
        action: "Update_Happy_Cookie_Domain",
        value: e.target.value,
      },
      (response) => {
        if (response.message === "success") {
          message.success(response.message);
        }
      }
    );
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
