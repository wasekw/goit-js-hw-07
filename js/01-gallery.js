import { galleryItems } from './gallery-items.js';
// // Change code below this line
const placeForGallery = document.querySelector('.gallery');
const markupGallery = makePictureForGallery(galleryItems);
placeForGallery.insertAdjacentHTML('beforeend', markupGallery);

function makePictureForGallery (picture) {
  return picture.map(({ preview, original, description }) => {
    return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`}).join(''); 
};

placeForGallery.addEventListener('click', showPicture);

function showPicture(event) {
  event.preventDefault();
  const isPictureChosen = event.target.classList.contains('gallery__image');
  if (!isPictureChosen) {
    return;
  }

  const instance = basicLightbox.create(`<img src="${event.target.dataset.source}" width="800" height="600">`, {
    onClose: () => {
      window.removeEventListener('keyup', closeModal);
    },
  });

  instance.show();

  document.addEventListener('keyup', closeModal);

  function closeModal(event) {
    if (event.key === 'Escape') {
      instance.close();
    }
  }
}

