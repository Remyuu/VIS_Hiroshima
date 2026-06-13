(function () {
  var labels = {
    en: "External site, opens in a new tab",
    zh: "外部网站，将在新标签页打开",
    ja: "外部サイトを新しいタブで開きます",
  };

  function getTooltipLabel() {
    var language = document.documentElement.lang || "en";
    var locale = language.toLowerCase().split("-")[0];
    return labels[locale] || labels.en;
  }

  function isExternalHttpLink(link) {
    var href = link.getAttribute("href");

    if (!href || href.charAt(0) === "#") {
      return false;
    }

    try {
      var url = new URL(href, document.baseURI);
      return ["http:", "https:"].indexOf(url.protocol) !== -1 && url.origin !== window.location.origin;
    } catch (error) {
      return false;
    }
  }

  function appendRel(link, value) {
    var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);

    if (rel.indexOf(value) === -1) {
      rel.push(value);
    }

    link.setAttribute("rel", rel.join(" "));
  }

  function shouldShowIcon(link) {
    return Boolean(link.textContent.trim()) && !link.querySelector("img, svg");
  }

  function shouldSkipLink(link) {
    return Boolean(link.closest(".md-content__button"));
  }

  function enhanceExternalLinks() {
    var tooltip = getTooltipLabel();
    var containers = document.querySelectorAll(".md-content__inner");

    containers.forEach(function (container) {
      container.querySelectorAll("a[href]").forEach(function (link) {
        if (shouldSkipLink(link) || !isExternalHttpLink(link)) {
          return;
        }

        link.target = "_blank";
        appendRel(link, "noopener");
        appendRel(link, "noreferrer");

        if (!link.title) {
          link.title = tooltip;
        }

        if (shouldShowIcon(link)) {
          link.dataset.visExternalLink = "true";
        }
      });
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(enhanceExternalLinks);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceExternalLinks);
  } else {
    enhanceExternalLinks();
  }
})();
