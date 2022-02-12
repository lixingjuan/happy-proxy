(function () {
  const tabButtonList = document.querySelector("#tab-wrapper .tab-list");
  const tabContentList = document.querySelector("#tab-wrapper .tab-pane-list");

  /** 更新 active tab */
  const updateActiveTab = (beClickIndex) => {
    if (typeof beClickIndex !== "number" && !isNaN(beClickIndex)) {
      return;
    }

    [...tabButtonList.children].forEach((element, index) => {
      if (index === beClickIndex) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });

    [...tabContentList.children].forEach((element, index) => {
      if (index === beClickIndex) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  tabButtonList.addEventListener("click", (e) => {
    const beClickIndex = Number(e.target.dataset.index);
    chrome.storage.sync.set({ activeIndex: beClickIndex });
    updateActiveTab(beClickIndex);
  });

  chrome.storage.sync.get("activeIndex", (res) => {
    updateActiveTab(res.activeIndex ?? 0);
  });
})();
