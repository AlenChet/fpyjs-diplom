/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = "https://cloud-api.yandex.net/v1/disk";
  static TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; 

  static getToken() {
    let yaToken = localStorage.getItem("yaToken");
    let tokenTimestamp = localStorage.getItem("yaTokenTimestamp");

    // Запрашиваем новый токен
    if (!yaToken || !tokenTimestamp || this.isTokenExpired(tokenTimestamp)) {
      yaToken = prompt("Введите OAUth-токен от Яндекс.Диска");
      localStorage.setItem("yaToken", yaToken);
      localStorage.setItem("yaTokenTimestamp", Date.now().toString());
    }

    return yaToken;
  }

  static isTokenExpired(tokenTimestamp) {
    const currentTimestamp = Date.now();
    return currentTimestamp - parseInt(tokenTimestamp, 10) > this.TOKEN_EXPIRATION_TIME;
  }

  static uploadFile(path, url, callback) {
    createRequest({
      method: "POST",
      path: "/resources/upload",
      data: { way: path, url: url },
      headers: {
        Authorization: `OAuth ${localStorage.getItem("yaToken")}`,
      },
      callback: callback,
    });
  }
  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback) {
    createRequest({
      method: "DELETE",
      path: "/resources",
      data: { way: path },
      headers: {
        Authorization: `OAuth ${this.getToken()}`,
      },
      callback: callback,
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback) {
    createRequest({
      method: "GET",
      path: "/resources/files",
      data: { mediaType: "image", limit: 1000000 },
      headers: {
        Authorization: `OAuth ${this.getToken()}`,
      },
      callback: callback,
    });
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url) {
    const link = document.createElement("a");
    link.href = url;
    link.click();
  }
}
