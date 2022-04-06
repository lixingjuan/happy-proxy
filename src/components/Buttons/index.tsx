import styled from "styled-components";
import { useEffect, useState } from "react";
import { Space, Modal, message } from "antd";

import Icon from "../Icon";
import Filters from "../Filters";
import DeleteAll from "./DeleteAll";
import AddRecord from "./AddRecord";
import ModalContent from "./ModalContent";
import NetworkStatus from "./NetworkStatus";
import SwitchButton from "./SwitchButton";
import { TopMenuType, FilterType } from "src/types";

const StyledButton = styled.div`
  height: 30px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-right: 12px;
`;

const defaultDomain = ".datayes-stg.com";

const getDefaultCookieDomain = () => {
  const local = localStorage.getItem("cookieDomain");
  return local || defaultDomain;
};

interface Props {
  updateFilter: (val: FilterType) => void;
  activeTab: TopMenuType;
  updateList: () => void;
  isLoading: boolean;
  locaIsRunning: boolean;
}

const Buttons = ({ updateFilter, activeTab, updateList, isLoading, locaIsRunning }: Props) => {
  const [visible, setVisible] = useState(false);

  const [cookieDomain, setCookieDomain] = useState<string>(getDefaultCookieDomain());

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

  /** 通知background 更新 happyCookieDomain */
  const updateHappyCookieDomain = (domain: string) => {
    if (!chrome?.runtime?.sendMessage) {
      return;
    }

    updateHappyCookie(domain);

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

  /** 更新本地 */
  const updateLocal = (domain: string) => localStorage.setItem("cookieDomain", domain);

  /** 成功回调函数 */
  const onSuccess = (domain: string) => {
    setCookieDomain(domain);
    updateLocal(domain);
    updateHappyCookieDomain(domain);
    setVisible(false);
  };

  useEffect(() => {
    onSuccess(cookieDomain);
  }, []);

  return (
    <>
      <StyledButton>
        <NetworkStatus
          isLoading={isLoading}
          updateList={updateList}
          locaIsRunning={locaIsRunning}
        />
        <AddRecord onUpdate={updateList} />
        <SwitchButton key="SwitchButton" />
        <Icon
          href="icon-setting"
          className="font-24 cursor-pointer"
          onClick={() => setVisible(true)}
        />
        {activeTab === "本地数据" && <Filters updateFilter={updateFilter} />}
        <DeleteAll />
      </StyledButton>

      <Modal
        visible={visible}
        footer={null}
        width={600}
        title={
          <Space size={4} align="center">
            <span className="margin-right-4">修改proxy配置</span>
            <svg className="icon" aria-hidden="true" style={{ fontSize: "20px" }}>
              <use xlinkHref="#icon-taiyang"></use>
            </svg>
          </Space>
        }
        onCancel={() => setVisible(false)}
      >
        <ModalContent
          value={cookieDomain}
          onSuccess={onSuccess}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
};

export default Buttons;
