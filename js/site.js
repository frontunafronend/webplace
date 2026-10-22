(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counter = document.getElementById("counter");
  const tabs = [...document.querySelectorAll(".rail a")];
  const sections = tabs
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  const setCurrent = (id) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    if (counter && sec.dataset.title) counter.textContent = sec.dataset.title;
    tabs.forEach((tab) => {
      const on = tab.getAttribute("href") === `#${id}`;
      tab.setAttribute("aria-current", on ? "true" : "false");
      if (on && tab.parentElement.scrollWidth > tab.parentElement.clientWidth) {
        tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
      }
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
