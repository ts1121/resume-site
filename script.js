document.addEventListener("DOMContentLoaded", function () {
  const observed = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        const text = entry.target.getAttribute('data-text');

        if (text) {
          entry.target.textContent = ''; // Clear static fallback
          new Typed(entry.target, {
            strings: [text],
            typeSpeed: 50,
            showCursor: true,
            cursorChar: '|',
            loop: false
          });
          observed.add(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.typed').forEach((el, index) => {
    const text = el.getAttribute('data-text');

    // Immediately animate the first one
    if (index === 0 && text) {
      el.textContent = '';
      new Typed(el, {
        strings: [text],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '|',
        loop: false
      });
      observed.add(el);
    } else {
      observer.observe(el);
    }
  });
});

