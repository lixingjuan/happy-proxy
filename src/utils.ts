import toast from "react-hot-toast";

/** 将指定文本写入用户剪切板 */
export const writeTextToClipboard = (text: string) => {
  if (!text) {
    toast.error("文本为空！");
    return;
  }

  if (navigator?.clipboard) {
    navigator?.clipboard
      ?.writeText(text)
      .then(() => toast.success("内容已复制到截切板"))
      .catch((err) => toast.error("复制失败！"));
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

    toast.success("内容已复制到截切板");
  } catch (error) {
    toast.error("复制失败！");
  }
};
