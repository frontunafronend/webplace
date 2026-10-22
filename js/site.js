(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counter = document.getElementById("counter");
  const tabs = [...document.querySelectorAll(".rail a")];
  const sections = tabs
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  const rail = document.querySelector(".rail");
  let currentId = null;

  // Keep the active tab visible in the horizontal mobile rail.
  // Only the rail scrolls sideways; never call scrollIntoView here, because it also
  // scrolls the page and cancels the user's touch/momentum scrolling on mobile.
  const revealTab = (tab) => {
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const r = rail.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    if (t.left >= r.left && t.right <= r.right) return;
    rail.scrollLeft += t.left - r.left - (r.width - t.width) / 2;
  };

  const setCurrent = (id) => {
    if (id === currentId) return;
    const sec = document.getElementById(id);
    if (!sec) return;
    currentId = id;
    if (counter && sec.dataset.title) counter.textContent = sec.dataset.title;
    tabs.forEach((tab) => {
      const on = tab.getAttribute("href") === `#${id}`;
      tab.setAttribute("aria-current", on ? "true" : "false");
      if (on) revealTab(tab);
    });
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((s) => io.observe(s));

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }

  const faq = document.querySelectorAll(".qa details");
  faq.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faq.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const toTop = document.getElementById("to-top");
  if (toTop) {
    const update = () => toTop.classList.toggle("is-on", window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      document.querySelector(".mark")?.focus({ preventScroll: true });
    });
  }
})();
