document.querySelectorAll('[data-flip-card]').forEach((card) => {
  const toggles = card.querySelectorAll('.flip-card-toggle');
  const setFlip = () => {
    const isFlipped = card.classList.toggle('is-flipped');
    const name = card.dataset.agentName || 'agent';
    card.setAttribute('aria-label', isFlipped ? `Return to ${name} photo` : `Flip ${name} card`);
    toggles.forEach((button) => button.setAttribute('aria-pressed', String(isFlipped)));
  };

  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    setFlip();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setFlip();
  });
});
