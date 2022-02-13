"use strict";

const e = React.createElement;

const LikeButton = () => {
  console.log({ React });
  console.log({ antd });
  const [visible, setVisible] = React.useState(false);
  const [addMockParams, setAddMockParams] = useState({});

  const handleClick = () => {
    setVisible((pre) => !pre);
  };

  const onUrlChange = (val) => {
    console.log({ val });
    const url = val.target.value;
    setAddMockParams((pre) => ({ ...pre, url }));
  };

  const onBodyChange = (val) => {
    console.log({ val });
    const mockBody = val.target.value;
    setAddMockParams((pre) => ({ ...pre, mockBody }));
  };

  const handleOk = () => {
    fetch(apiQueryPathMap, {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        const { status, statusText } = res;
        if (status === 500) {
          throw new Error(`${(status, statusText)}`);
        }
        handleUpdate();
        antd.messages.success("删除成功");
      })
      .catch((err) => {
        antd.messages.error(`删除失败:${err.messages}`);
      });
  };

  return (
    <div>
      <antd.Button onClick={handleClick}>
        打开弹窗让用户输入内容，增加mock数据
      </antd.Button>

      <antd.Modal visible={visible} title="Add one mock item" onOk={handleOk}>
        <div>
          <antd.Input placeholder="请输入接口" onChange={onUrlChange} />
          <antd.Input.TextArea
            onChange={onBodyChange}
            placeholder="请输入mock参数"
            style={{ marginTop: "24px" }}
          />
        </div>
      </antd.Modal>
    </div>
  );
};

const domContainer = document.querySelector("#add_button_container");
ReactDOM.render(e(LikeButton), domContainer);
