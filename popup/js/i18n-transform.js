(function () {
  /** 最让截取单词数 */
  const keyMaxLength = 5;

  const getResultStr = (arr) => {
    let zhI18nResult = ``;
    let enI18nResult = ``;

    arr.forEach((it) => {
      const [zhStr, enStr] = it;

      const i18nKey = enStr
        .toLocaleUpperCase()
        .split(" ")
        .slice(0, keyMaxLength)
        .join("_");

      zhI18nResult = zhI18nResult + "\n" + `${i18nKey}: ${zhStr}`;
      enI18nResult = enI18nResult + "\n" + `${i18nKey}: ${enStr}`;
    });

    return zhI18nResult + "\n\n\n" + enI18nResult;
  };

  const i18TransformContainer = document.querySelector(
    "#i18-transform-container"
  );
  i18TransformContainer.style = [
    "display: grid",
    "width: calc(100vw - 24px)",
    "grid-template-columns: 1fr 1fr;",
  ].join(";");

  const sourceTextArea = document.querySelector(
    "#i18-transform-container > #source"
  );
  const resultTextArea = document.querySelector(
    "#i18-transform-container > #result"
  );

  const initData = `[
    // 输入json, 前中文，后英文
    ["中文描述", "English description"]
]`;

  const style = [
    "height: calc(100vh - 200px)",
    "margin: 12px",
    "border-color: #ccc",
    "border-radius: 4px",
    "padding: 4px",
    "color: #666",
  ].join(";");

  sourceTextArea.style = style;
  resultTextArea.style = style;
  sourceTextArea.value = initData;

  const updateResult = (arr) => {
    resultTextArea.value = getResultStr(arr);
  };

  updateResult(JSON.parse(window.stripJsonComments(initData)));

  sourceTextArea.addEventListener("change", (e) => {
    const excludesComments = window.stripJsonComments(e.target.value);

    const arr = JSON.parse(excludesComments);
    updateResult(arr);
  });
})();
