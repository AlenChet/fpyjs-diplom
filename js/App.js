/**
 * Класс App управляет всем приложением
 * */
class App {
  static init() {
    this.searchBlock = new SearchBlock(document.getElementsByClassName('search-block')[0]);
    this.imageViewer = new ImageViewer(document.getElementsByClassName('images-wrapper')[0]);
    this.initModals();
  }

  static initModals() {
    this.modals = {
      fileUploader: new FileUploaderModal($('.ui.modal.file-uploader-modal').modal({closable: false})),
      filePreviewer: new PreviewModal($('.ui.modal.uploaded-previewer-modal').modal({closable: false})),
    }
  }

  static getModal(name) {
    return this.modals[name];
  }
}
