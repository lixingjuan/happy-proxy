/* catch抛出错误走到哪里 */

const demo = () => {
  return new Promise((resolve, reject) => {
    throw new Error("22");
  }).catch((err) => {
    console.log(err.message);
    /* throw Error(err.message); */
    return Promise.reject(err.message);
  });
};

demo().then(
  () => {
    console.log("succeeded");
  },
  (err) => {
    console.log("err");
  }
);
