(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counter = document.getElementById("scene-counter");
  const tabs = [...document.querySelectorAll(".binder a")];
  const scenes = [...document.querySelectorAll(".scene[data-scene]")];

  document.body.classList.add(reduced ? "is-reduced" : "is-ready");

  const setCurrent = (id) => {
    const scene = scenes.find((s) => s.id === id) || scenes[0];
    if (!scene) return;
    const n = scene.dataset.scene;
    const title = scene.dataset.title;
    if (counter) counter.textContent = `SCENE ${n}  ·  ${title}`;
    tabs.forEach((tab) => {
      tab.setAttribute("aria-current", tab.getAttribute("href") === `#${scene.id}` ? "true" : "false");
    });
  };

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

  if (reduced) return;

  const canvas = document.getElementById("grain");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  let running = true;
  canvas.width = 160;
  canvas.height = 160;

  const tick = () => {
    if (!running) return;
    const { width, height } = canvas;
    const image = ctx.createImageData(width, height);
    const data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 36;
    }
    ctx.putImageData(image, 0, 0);
    window.setTimeout(() => requestAnimationFrame(tick), 140);
  };

  const cover = document.getElementById("cover");
  const watch = new IntersectionObserver((entries) => {
    running = entries.some((e) => e.isIntersecting);
    if (running) tick();
  });
  if (cover) watch.observe(cover);
  else tick();

  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) tick();
  });
})();
