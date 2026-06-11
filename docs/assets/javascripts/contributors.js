(function () {
  function renderContributors(root) {
    if (root.dataset.loaded === "true") {
      return;
    }

    var repo = root.dataset.repo;
    var limit = Number(root.dataset.limit || 24);
    var list = root.querySelector(".vis-contributor-list");
    var allLabel = root.dataset.allLabel || list?.textContent?.trim() || "View all";

    if (!repo || !list) {
      return;
    }

    root.dataset.loaded = "true";
    list.setAttribute("aria-busy", "true");

    fetch("https://api.github.com/repos/" + repo + "/contributors?per_page=" + limit)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("GitHub contributors request failed");
        }
        return response.json();
      })
      .then(function (contributors) {
        list.textContent = "";

        contributors.slice(0, limit).forEach(function (contributor) {
          var link = document.createElement("a");
          link.className = "vis-contributor";
          link.href = contributor.html_url;
          link.target = "_blank";
          link.rel = "noopener";
          link.title = contributor.login + " (" + contributor.contributions + " commits)";
          link.setAttribute("aria-label", link.title);

          var image = document.createElement("img");
          image.src = contributor.avatar_url + "&s=96";
          image.alt = "";
          image.loading = "lazy";
          image.decoding = "async";

          link.appendChild(image);
          list.appendChild(link);
        });

        var all = document.createElement("a");
        all.className = "vis-contributor-link";
        all.href = "https://github.com/" + repo + "/graphs/contributors";
        all.target = "_blank";
        all.rel = "noopener";
        all.textContent = allLabel;
        list.appendChild(all);
      })
      .catch(function () {
        list.classList.add("vis-contributor-list--fallback");
      })
      .finally(function () {
        list.removeAttribute("aria-busy");
      });
  }

  function initContributors() {
    document.querySelectorAll("[data-github-contributors]").forEach(renderContributors);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initContributors);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContributors);
  } else {
    initContributors();
  }
})();
