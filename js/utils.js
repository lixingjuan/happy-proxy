const successIcon = `<svg style="color: #52c41a;padding-right: 4px;" viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>`;
const errorIcon = `<svg style="color: #d9363e;padding-right: 4px;" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>`;

// message 弹窗提示
const messageTip = (text, icon) => {
  const message = document.createElement("div");
  message.innerHTML = `${icon}${text}`;

  const style = [
    "position: fixed",
    "top: 20px",
    "height: 40px",
    "border: 1px solid rgb(204, 204, 204)",
    "background: rgb(255, 255, 255)",
    "left: 50%",
    "transform: translate(-50%)",
    "padding: 2px 12px",
    "display: flex",
    "align-items: center",
    "border-radius: 8px",
  ];

  message.style = style.join(";");
  document.body.appendChild(message);
  let timer = setTimeout(() => {
    document.body.removeChild(message);
  }, 3000);
  timer = null;
};

const message = {
  success: (text) => messageTip(text, successIcon),
  error: (text) => messageTip(text, errorIcon),
};

/** 将指定文本写入用户剪切板 */
const writeTextToClipboard = (text) => {
  if (!text) {
    message.error("文本为空！");
    return;
  }

  if (navigator?.clipboard) {
    // clipboard api 复制
    navigator?.clipboard
      ?.writeText(text)
      .then(() => message.success("复制成功！"))
      .catch((err) => message.error("复制失败！"));
    return;
  }

  try {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);

    message.success("复制成功！");
  } catch (error) {
    message.error("复制失败！");
  }
};

window.message = message;
