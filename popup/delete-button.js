/**
 * @desc 删除全部button
 * */

(function () {
  /** button-list */
  const buttonWrapper = document.getElementById("button-wrapper");

  /** delete all lacal cache data */
  function handleDeleteAll() {
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
        console.log(res);
        const { status, statusText } = res;
        if (status === 500) {
          throw new Error(`${(status, statusText)}`);
        }
        handleUpdate();
        messages.success("删除成功");
      })
      .catch((err) => {
        messages.error(`删除失败:${err.messages}`);
      });
  }

  /** append delete button */
  const button = document.createElement("button");
  const style = [
    "z-index: 1000",
    "opacity: 0.5",
    "cursor: pointer",
    "padding: 2px 8px",
    "font-size: 14px",
  ].join(";");
  button.innerText = "delete all";
  button.style = style;
  button.addEventListener("click", handleDeleteAll);

  buttonWrapper.appendChild(button);
})();
