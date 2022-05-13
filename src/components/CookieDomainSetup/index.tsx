import { useEffect, useState } from "react";
import { message, Input } from "antd";
import { defaultHappyCookieDomain } from "src/constants";

const getDefaultCookieDomain = () => {
  const local = localStorage.getItem("cookieDomain");
  return local || defaultHappyCookieDomain;
};

/** 更新本地，用于下次打开读取默认值 */
const updateLocal = (domain: string) => localStorage.setItem("cookieDomain", domain);

/** 通知background 更新 happyCookieDomain */
const updateHappyCookieDomain = (domain: string) => {
  if (!chrome?.runtime?.sendMessage) {
    return;
  }

  chrome.runtime.sendMessage(
    {
      action: "Update_Happy_Cookie_Domain",
      value: domain,
    },
    (response) => {
      if (response.message === "success") {
        message.success(response.message);
      }
    }
  );
};

/** 通知background 更新 happyCookie */
const updateHappyCookie = (cookieDomain: string) => {
  if (!chrome?.cookies?.getAll) {
    return;
  }

  chrome.cookies.getAll({ domain: cookieDomain }, (res) => {
    const theCookieArr = res.filter((it) => it.domain === cookieDomain);
    if (!Object.keys(theCookieArr).length) {
      return;
    }

    const happyCookie = theCookieArr.map((it) => `${it.name}=${it.value}`).join("; ");
    chrome.runtime.sendMessage(
      {
        action: "Update_Happy_Cookie",
        value: happyCookie,
      },
      (response) => {
        if (response.message === "success") {
          message.success("happy cookie 更新成功");
        }
      }
    );
  });
};

const SettingModal = () => {
  const [cookieDomain, setCookieDomain] = useState<string>(getDefaultCookieDomain());

  /** 成功回调函数 */
  const onSuccess = (domain: string) => {
    setCookieDomain(domain);
    updateLocal(domain);
    updateHappyCookie(domain);
    updateHappyCookieDomain(domain);
  };

  useEffect(() => {
    onSuccess(getDefaultCookieDomain());
  }, []);

  return (
    <Input
      value={cookieDomain}
      style={{ width: "200px" }}
      placeholder="请输入http-only的cookie-domain"
      onChange={(e) => onSuccess(e.target.value as string)}
    />
  );
};

export default SettingModal;
