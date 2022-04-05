import { useState } from "react";
import { Space, Modal } from "antd";
import ModalContent from "./ModalContent";
import NetworkStatus from "./NetworkStatus";
import SwitchButton from "./SwitchButton";
import AddRecord from "./AddRecord";
import DeleteAll from "./DeleteAll";
import Filters from "../Filters";
import Icon from "../Icon";
import { TopMenuType, FilterType } from "src/types";
import styled from "styled-components";

const StyledButton = styled.div`
  height: 30px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-right: 12px;
`;

interface Props {
  updateFilter: (val: FilterType) => void;
  activeTab: TopMenuType;
  updateList: () => void;
  isLoading: boolean;
  locaIsRunning: boolean;
}

const Buttons = ({ updateFilter, activeTab, updateList, isLoading, locaIsRunning }: Props) => {
  const [visible, setVisible] = useState(false);

  const buttons = () => {
    return (
      <StyledButton>
        <NetworkStatus isLoading={isLoading} updateList={updateList} locaIsRunning={locaIsRunning} />
        <AddRecord onUpdate={updateList} />
        <SwitchButton key="SwitchButton" />
        <Icon href="icon-setting" className="font-24 cursor-pointer" onClick={() => setVisible(true)} />
        {activeTab === "本地数据" && <Filters updateFilter={updateFilter} />}
        <DeleteAll />
      </StyledButton>
    );
  };

  return (
    <>
      {buttons()}

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
        <ModalContent onClose={() => setVisible(false)} />
      </Modal>
    </>
  );
};

export default Buttons;
