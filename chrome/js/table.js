const apiQueryPatMap = "http://127.0.0.1:4000/happy-service";
const pathMapContainer = document.getElementById("path-map-container");

/** 将指定文本写入用户剪切板 */
const writeTextToClipboard = (text, successCallback, errorCallback) => {
  if (!text) {
    alert("文本为空！");
    return;
  }

  if (navigator?.clipboard) {
    // clipboard api 复制
    navigator?.clipboard
      ?.writeText(text)
      .then(() => alert("复制成功！"))
      .catch((err) => alert("复制失败！"));
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

    alert("复制成功！");
  } catch (error) {
    alert("复制失败！");
  }
};

// fetch(apiQueryPatMap)
fetch(apiQueryPatMap, {
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
    const ul = document.createElement("ul");

    let ulInnerHTML = `
      <li>
        <span class="center">接口</span>
        <span class="center">本地地址</span></span>
      </li>
    `;

    Object.entries(data).forEach(([key, value]) => {
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

    ul.innerHTML = ulInnerHTML;

    ul.addEventListener("click", (e) => {
      if (e.target.tagName.toLocaleLowerCase() !== "button") {
        return;
      }
      writeTextToClipboard(e.target.value);
    });

    pathMapContainer.appendChild(ul);
  })
  .catch((err) => {
    pathMapContainer.innerHTML = "<h2> 请求出错</h2>";
  });
