import { useState } from "react";
import { Button, message, Modal } from "antd";
import { deleteAllApi } from "../service";

const DeleteAllButton = () => {
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    deleteAllApi()
      .then(() => {
        message.success("删除成功");
      })
      .catch((err) => {
        message.error("删除失败", err.message);
      });
  };

  return (
    <>
      <Button onClick={() => setVisible((pre) => !pre)} size="small" danger>
        Delete All
      </Button>

      <Modal
        visible={visible}
        title="Delete All"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okButtonProps={{ danger: true }}
      >
        <div>确定删除本地全部数据么？ </div>
      </Modal>
    </>
  );
};

export default DeleteAllButton;
