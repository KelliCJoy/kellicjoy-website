const views = [
  { src: 'a-hearts-dream.jpg', caption: 'A Hearts Dream · full painting', alt: 'Full view of A Hearts Dream, a softly colored landscape with Cinderella, pumpkins, birds, and a cat.' },
  { src: 'dress-detail.jpg', caption: 'A Hearts Dream · the dress', alt: 'Close view of the tiny white flowers and sparkling accents on Cinderella’s blue dress.' },
  { src: 'painting-detail.jpg', caption: 'A Hearts Dream · detail', alt: 'Cinderella, pumpkins, birds, and a cat against the painting’s blue and pink texture.' }
];
const viewer = document.querySelector('#lightbox');
let current = 0;
function showView(index) {
  current = (index + views.length) % views.length;
  const view = views[current];
  const image = document.querySelector('#viewer-image');
  image.src = view.src;
  image.alt = view.alt;
  document.querySelector('#lightbox-caption').textContent = view.caption;
  document.querySelector('#image-count').textContent = `${current + 1} / ${views.length}`;
}
document.querySelectorAll('[data-view]').forEach(button => {
  button.addEventListener('click', () => {
    showView(Number(button.dataset.view));
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
document.querySelector('#previous').addEventListener('click', () => showView(current - 1));
document.querySelector('#next').addEventListener('click', () => showView(current + 1));
viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showView(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showView(current + 1); }
});
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();
