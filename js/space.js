(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("space-stars");
  const meteorHost = document.getElementById("space-meteors");

  if (meteorHost && !reduced) {
    const count = 16;
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement("span");
      el.className = "space-meteor";
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
      el.style.animationDuration = `${(2.4 + Math.random() * 6).toFixed(2)}s`;
      meteorHost.appendChild(el);
    }
  }

  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const stars = [];
  const mouse = { x: 0.5, y: 0.5 };
  let width = 0;
  let height = 0;
  let raf = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const seed = () => {
    stars.length = 0;
    const quantity = Math.min(140, Math.floor((width * height) / 14000));
    for (let i = 0; i < quantity; i += 1) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.7 + 0.25,
        vx: (Math.random() - 0.5) * 0.00025,
        vy: (Math.random() - 0.5) * 0.00025
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      if (!reduced) {
        star.x += star.vx + (mouse.x - 0.5) * 0.00015;
        star.y += star.vy + (mouse.y - 0.5) * 0.00015;
        if (star.x < 0) star.x = 1;
        if (star.x > 1) star.x = 0;
        if (star.y < 0) star.y = 1;
        if (star.y > 1) star.y = 0;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(244, 247, 255, ${star.a})`;
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduced) raf = window.requestAnimationFrame(draw);
  };

  resize();
  seed();
  draw();

  window.addEventListener("resize", () => {
    resize();
    seed();
    if (reduced) draw();
  });

  window.addEventListener("pointermove", (event) => {
    mouse.x = event.clientX / Math.max(width, 1);
    mouse.y = event.clientY / Math.max(height, 1);
  }, { passive: true });

  if (reduced && raf) window.cancelAnimationFrame(raf);
})();
