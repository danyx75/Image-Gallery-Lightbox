const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
let galleryImages = document.querySelectorAll(".gallery img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const numLength = document.querySelector(".length");
const addBtn = document.querySelector(".add-btn");
const hiddenImage = document.querySelector(".hidden-image");

function addImageToGallery(imageURL) {
  const existingImage = document.querySelector(`img[src="${imageURL}"]`);
  if (existingImage) return;

  const newImage = document.createElement("img");
  newImage.src = imageURL;
  newImage.classList.add("images");

  const imageGallery = document.querySelector(".gallery");
  imageGallery.insertBefore(newImage, imageGallery.length);
  galleryImages = document.querySelectorAll(".gallery img");
  galleryImagesArray();
}

addBtn.addEventListener("click", () => {
  const imageInput = document.getElementById("imageInput");
  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let imageURL = reader.result;
      addImageToGallery(imageURL);
    };
    reader.readAsDataURL(file);
  });
});

let currentImageIndex = 0;

function updateImageNumber() {
  numLength.textContent = `${currentImageIndex + 1} of ${galleryImages.length}`;
}

function showImage(index) {
  const numImages = galleryImages.length;
  if (numImages === 0) return;
  if (index < 0) index = numImages - 1;
  else if (index >= numImages) index = 0;

  modal.style.display = "flex";
  modalContent.src = galleryImages[index].src;
  currentImageIndex = index;
  updateImageNumber();
}

const galleryImagesArray = () => {
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      showImage(index);
    });
  });
};

galleryImagesArray();

modal.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) modal.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  showImage(currentImageIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showImage(currentImageIndex + 1);
});

prevBtn.setAttribute("tabindex", "0");
nextBtn.setAttribute("tabindex", "0");

document.addEventListener("keydown", (event) => {
  if (modal.style.display === "flex") {
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
    else if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
  }
});
