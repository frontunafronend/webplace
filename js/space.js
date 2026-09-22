(() => {
  const canvas = document.getElementById("space-stars");
  if (!canvas || !canvas.getContext) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  const stars = [];
  let width = 0;
  let height = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const seed = () => {
    stars.length = 0;
    const quantity = Math.min(70, Math.floor((width * height) / 22000));
    for (let i = 0; i < quantity; i += 1) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 0.9 + 0.2,
        a: Math.random() * 0.35 + 0.12
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(230, 237, 244, ${star.a})`;
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  resize();
  seed();
  draw();

  window.addEventListener("resize", () => {
    resize();
    seed();
    draw();
  });

  void reduced;
})();
