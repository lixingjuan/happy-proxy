const getUpperStr = (val) =>
  val.toLocaleUpperCase().split(" ").slice(0, 5).join("_");

const demo = (arr) => {
  const enRes = arr.reduce(
    // eslint-disable-next-line no-return-assign
    (tol, [zhStr, enStr]) =>
      // eslint-disable-next-line no-param-reassign
      (tol += `"${getUpperStr(enStr)}": "${enStr}",
  `),
    ""
  );
  const zhRes = arr.reduce(
    // eslint-disable-next-line no-return-assign
    (tol, [zhStr, enStr]) =>
      // eslint-disable-next-line no-param-reassign
      (tol += `"${getUpperStr(enStr)}": "${zhStr}",
  `),
    ""
  );

  console.log(`
  ${enRes}

  ${zhRes}
  `);
};

const needTranslateArr = [
  ["查看更多该阶段行业", "Check more industries under this phase"],
];
demo(needTranslateArr);
