(function () {
  if (location.hostname !== "remyuu.github.io") {
    return;
  }

  var script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.dataset.websiteId = "5f732be3-1b81-48b6-bedd-beb414d3cf87";
  document.head.appendChild(script);
})();
