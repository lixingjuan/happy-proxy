import { message } from "antd";

/** 将指定文本写入用户剪切板 */
export const writeTextToClipboard = (text: string) => {
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
