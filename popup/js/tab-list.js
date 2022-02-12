(function () {
  const tabButtonList = document.querySelector("#tab-wrapper .tab-list");
  const tabContentList = document.querySelector("#tab-wrapper .tab-pane-list");

  tabButtonList.addEventListener("click", (e) => {
    const beClickIndex = e.target.dataset.index;
    if (!beClickIndex) {
      return;
    }

    [...tabButtonList.children].forEach((element, index) => {
      if (String(index) === beClickIndex) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });

    [...tabContentList.children].forEach((element, index) => {
      if (String(index) === beClickIndex) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  });
})();
