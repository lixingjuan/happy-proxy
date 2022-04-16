import { useState } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { DeleteFilled } from "@ant-design/icons";
import { deleteAllApi } from "../../service";

const DeleteAllButton = () => {
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    deleteAllApi()
      .then(() => {
        toast.success("删除成功");
      })
      .catch((err) => {
        toast.error("删除失败", err.message);
      });
  };

  return (
    <>
      <DeleteFilled className="color-red font-22 cursor-pointer" />
      {/* <Button onClick={() => setVisible((pre) => !pre)} size="small" danger>
        Delete All
      </Button> */}

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
