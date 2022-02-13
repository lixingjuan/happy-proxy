(function () {
  /** button-list */
  const buttonWrapper = document.getElementById("button-wrapper");

  /*
   * @desc 更新数据button
   */

  /** update data */
  function handleUpdate() {
    fetch(apiQueryPathMap, {
      method: "get",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        antd.message.success("查询成功！");

        const ul = document.createElement("ul");

        let ulInnerHTML = `
      <li>
        <span class="center">接口</span>
        <span class="center">本地地址</span></span>
      </li>
    `;

        const dataArr = Object.entries(data);

        if (dataArr.length) {
          dataArr.forEach(([key, value]) => {
            const liItem = `
            <li>
              <span>
                ${key}
                <button value="${key}">copy</button>
              </span>
              <span>
                ${value}
                <button value="${value}">copy</button>
              </span>
            </li>
          `;
            ulInnerHTML += liItem;
          });
        } else {
          ulInnerHTML += `<h1 style="text-align:center; line-height: 200px;">No Data</h1>`;
        }

        ul.innerHTML = ulInnerHTML;

        ul.addEventListener("click", (e) => {
          if (e.target.tagName.toLocaleLowerCase() !== "button") {
            return;
          }
          writeTextToClipboard(e.target.value);
        });

        pathMapContainer.innerHTML = null;
        pathMapContainer.appendChild(ul);
      })
      .catch((err) => {
        antd.messages.error(`查询失败:${err.messages}, 请检查本地服务是否启动`);
      });
  }

  /** append update button */
  const button = document.createElement("button");
  const style = [
    "z-index: 1000",
    "opacity: 0.5",
    "cursor: pointer",
    "padding: 2px 8px",
    "font-size: 14px",
  ].join(";");
  button.innerText = "update";
  button.style = style;
  button.addEventListener("click", handleUpdate);

  buttonWrapper.appendChild(button);

  // 页面加载完成刷新一次
  handleUpdate();

  window.handleUpdate = handleUpdate;
})();
