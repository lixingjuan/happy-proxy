import { message } from 'antd';

/** 将指定文本写入用户剪切板 */
export const writeTextToClipboard = (text: string) => {
  if (!text) {
    message.error('文本为空！');
    return;
  }

  if (navigator?.clipboard) {
    navigator?.clipboard
      ?.writeText(text)
      .then(() => message.success('copy successfully!'))
      .catch((error) => message.error(`copy failed! ${error.message}`));
    return;
  }

  try {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);

    message.success('copy successfully!');
  } catch (error: any) {
    message.error(`copy failed! ${error.message}`);
  }
};

/**
 * @desc 关键字高亮
 * @param {string} text
 * @param {string} keyword 搜索词
 * @param {boolean} allHighlight 是否全部高亮，默认false
 */
export const highlightString = (text: string, keyword = '', allHighlight = false): string => {
  if (text && keyword) {
    const reg = new RegExp(`${keyword}`.replace(/([()[{*+.$^\\|?])/g, '\\$1'), 'g');
    const result = allHighlight
      ? text.replace(reg, `<em class="highlight">${keyword}</em>`)
      : text.replaceAll(reg, `<em class="highlight">${keyword}</em>`);
    return result;
  }
  return text;
};
