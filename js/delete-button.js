/*
 * @desc 删除全部button
 */

const buttonWrapper = document.querySelector(".button-wrapper");

/** delete all lacal cache data */
function handleDeleteAll() {
  fetch(apiQueryPatMap, {
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

      const ul = document.querySelector(".table-list");
      ul.innerHTML = "全部删除成功";
    })
    .catch((err) => {
      pathMapContainer.innerHTML = `<h2 style='padding-left: 20px'> Error: ${err.message}</h2>`;
    });
}

/** append delete button */
const button = document.createElement("button");
const style = [
  "position: fixed",
  "right: 100px",
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
