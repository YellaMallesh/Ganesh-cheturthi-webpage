
  // --- Existing observer for .about-text ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // run only once
      }
    });
  }, { threshold: 0.2 }); // 20% visible before trigger

  document.querySelectorAll(".about-text").forEach(el => {
    observer.observe(el);
  });

  // --- New code for importance cards + text ---
const cards = document.querySelectorAll('.cards-container .card');
const textContainer = document.querySelector('.text-container');
const points = [
  "Lord Ganesha is worshipped first in every ritual as the remover of obstacles, bringing success and harmony.",
  "The festival symbolizes the cycle of creation and dissolution, reminding us of life’s transient nature.",
  "It emphasizes community bonding, devotion, and eco-consciousness through collective celebrations.",
  "Ganesha’s large ears, elephant head, and modaks symbolize wisdom, patience, and sweet rewards of devotion."
];

let currentIndex = 0;

function updateCards() {
  cards.forEach((card, i) => {
    card.classList.remove('prev', 'active', 'next');
    card.style.opacity = 1; // ensure visible
    if (i === currentIndex) card.classList.add('active');
    else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
    else if (i === (currentIndex + 1) % cards.length) card.classList.add('next');
    else card.style.opacity = 0; // hide far cards
  });

  // Update text
  textContainer.querySelector('.point-text').style.opacity = 0;
  setTimeout(() => {
    textContainer.querySelector('.point-text').textContent = points[currentIndex];
    textContainer.querySelector('.point-text').style.opacity = 1;
  }, 300);
}

// Initialize
updateCards();

// Reuse existing observer to fade-in text container
observer.observe(textContainer);

// Auto-slide every 4 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
}, 4000);

