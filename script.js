const intro = document.getElementById('intro');
const page = document.getElementById('birthday');
const replay = document.getElementById('replay');

setTimeout(() => {
  intro.classList.add('hide');
  page.classList.remove('hidden');
}, 5000);

replay.addEventListener('click', () => {
  document.querySelectorAll('.cake-layer, .plate, .icing, .candle, .flame').forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
});
