class FileUploaderModal extends BaseModal {
  constructor(element) {
    super(element);
    this.uploaderWindow = document.querySelector(".file-uploader-modal");
    this.contenContainer = this.domElement.querySelector(".content");
    this.closeButton = this.domElement.querySelector(".close");
    this.sendAllButton = this.domElement.querySelector(".send-all");
    this.registerEvents();
  }


  registerEvents() {
    this.uploaderWindow
      .querySelector(".header .x")
      .addEventListener("click", this.close);

    this.closeButton.addEventListener("click", this.close);

    this.sendAllButton.addEventListener("click", this.sendAllImages.bind(this));

    this.contenContainer.addEventListener("click", (event) => {
      if (
        event.target ===
        document.querySelector(".file-uploader-modal .content .input")
      ) {
        if (this.contenContainer.classList.contains("error")) {
          this.contenContainer.classList.remove("error");
        }
      }
      if (
        event.target.classList.contains("button") ||
        event.target.classList.contains("upload")
      ) {
        this.sendImage(event.target.closest(".image-preview-container"));
      }
    });
  }

  showImages(images) {
    images.reverse();
    const arrayOfImagesHTML = [];
    for (const image of images) {
      arrayOfImagesHTML.push(this.getImageHTML(image));
    }
    this.contenContainer.innerHTML = arrayOfImagesHTML.join("");
  }

  getImageHTML(item) {
    return `<div class="image-preview-container">
                <img src='${item}' />
                <div class="ui action input">
                    <input type="text" placeholder="Путь к файлу">
                    <button class="ui button"><i class="upload icon"></i></button>
                </div>
            </div>`;
  }

  sendAllImages() {
    for (const imageContainer of Array.from(
      this.contenContainer.querySelectorAll(".image-preview-container")
    )) {
      this.sendImage(imageContainer);
    }
  }

  sendImage(imageContainer) {
    if (imageContainer.querySelector("input").value.trim()) {
      imageContainer.querySelector(".input").classList.add("disabled");
      Yandex.uploadFile(
        imageContainer.querySelector("input").value,
        imageContainer.querySelector("img").src,
        () => {
          imageContainer.remove();
          if (
            document.querySelector(".file-uploader-modal .content").children
              .length === 0
          ) {
            this.close();
          }
        }
      );
    } else {
      imageContainer.querySelector(".input").classList.add("error");
    }
  }
}