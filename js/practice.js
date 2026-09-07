(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counter = document.getElementById("scene-counter");
  const tabs = [...document.querySelectorAll(".binder a")];
  const scenes = [...document.querySelectorAll(".scene[data-scene]")];
  const langBtn = document.getElementById("lang-toggle");
  const nav = document.querySelector(".binder");
  const dicts = window.WEBPLACE_I18N || { en: {}, he: {} };

  document.body.classList.add(reduced ? "is-reduced" : "is-ready");

  const storedLang = (() => {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "he" || q === "en") return q;
      const saved = localStorage.getItem("webplace-lang");
      if (saved === "he" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "en";
  })();

  let currentLang = "en";
  let currentSceneId = scenes[0] ? scenes[0].id : "cover";

  const applyLang = (lang) => {
    currentLang = lang === "he" ? "he" : "en";
    const dict = dicts[currentLang] || {};
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "he" ? "rtl" : "ltr";
    try {
      localStorage.setItem("webplace-lang", currentLang);
    } catch {
      /* ignore */
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-title-key]").forEach((el) => {
      const value = dict[el.dataset.titleKey];
      if (value != null) el.dataset.title = value;
    });
    if (dict["meta.title"]) document.title = dict["meta.title"];
    if (langBtn) {
      langBtn.textContent = dict["lang.switch"] || (currentLang === "he" ? "English" : "עברית");
      langBtn.setAttribute("aria-label", dict["lang.aria"] || "");
    }
    if (nav) {
      nav.setAttribute("aria-label", currentLang === "he" ? "חלקי העמוד" : "Page sections");
    }
    const subject = encodeURIComponent(dict["mail.subject"] || "Project inquiry — webplace.co.il");
    document.querySelectorAll("a[data-mail]").forEach((a) => {
      a.href = `mailto:amircabili@hotmail.com?subject=${subject}`;
    });
    setCurrent(currentSceneId);
  };

  const setCurrent = (id) => {
    const scene = scenes.find((s) => s.id === id) || scenes[0];
    if (!scene) return;
    currentSceneId = scene.id;
    const title = scene.dataset.title;
    if (counter) counter.textContent = title;
    tabs.forEach((tab) => {
      tab.setAttribute("aria-current", tab.getAttribute("href") === `#${scene.id}` ? "true" : "false");
    });
  };

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLang(currentLang === "he" ? "en" : "he");
    });
  }

  applyLang(storedLang);

  if ("IntersectionObserver" in window && scenes.length) {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] }
    );
    scenes.forEach((s) => io.observe(s));
  }

  const qa = document.querySelectorAll(".qa details");
  qa.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      qa.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
