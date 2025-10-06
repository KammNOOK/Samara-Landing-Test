  const container = document.querySelector('.carousel-container');
  const track = document.getElementById('carousel');
  const captionEl = document.getElementById('caption');
  const items = Array.from(track.querySelectorAll('.item'));
  let index = 0;

  function setActive(i) {
    items.forEach((it, n) => it.classList.toggle('active', n === i));
    captionEl.textContent = items[i].querySelector('img').alt;
  }

  // Center the slide at items[i] so neighbors peek on both sides
  function centerSlide(i) {
    const slide = items[i];

    // distance from the track's left edge to the slide center
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;

    // where the container's visual center is
    const containerCenter = container.clientWidth / 2;

    // we want slideCenter to line up with containerCenter
    const targetTranslateX = -(slideCenter - containerCenter);

    // apply transform
    track.style.transform = `translateX(${targetTranslateX}px)`;
  }

  function update() {
    centerSlide(index);
    setActive(index);
  }

  // click areas
  document.querySelector('.click-left').addEventListener('click', () => {
    index = (index > 0) ? index - 1 : items.length - 1;
    update();
  });

  document.querySelector('.click-right').addEventListener('click', () => {
    index = (index < items.length - 1) ? index + 1 : 0;
    update();
  });

  // keep centered on resize (e.g., when rotating phone)
  window.addEventListener('resize', () => {
    // read current transform and re-center without animation glitch
    const prev = track.style.transition;
    track.style.transition = 'none';
    update();
    // force reflow then restore transition
    requestAnimationFrame(() => {
      track.style.transition = prev || 'transform 500ms ease';
    });
  });

  // initial state
  update();