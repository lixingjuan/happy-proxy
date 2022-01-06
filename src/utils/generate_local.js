/**
 * @desc 生成项目国际化中英文配置json
 */
const getUpperStr = (val) =>
  val.toLocaleUpperCase().split(" ").slice(0, 5).join("_");

const demo = (arr) => {
  const enRes = arr.reduce(
    (tol, [zhStr, enStr]) =>
      (tol += `"${getUpperStr(enStr)}": "${enStr}",
  `),
    ""
  );
  const zhRes = arr.reduce(
    (tol, [zhStr, enStr]) =>
      (tol += `"${getUpperStr(enStr)}": "${zhStr}",
  `),
    ""
  );

  console.log(`
  ${enRes}

  ${zhRes}
  `);
};

/**
 * @desc 使用说明书
 * const needTranslateArr = [
 *  ["中文描述", "English description"],
 * ];
 */
const needTranslateArr = [
  ["", ""],
  ["", ""],
  ["", ""],
];

demo(needTranslateArr);
