/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из VK.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */

class VK {
  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';  
  static lastCallback = {
    callbackFn: function (result) {
      VK.processData(result);
    },
    listFromCallback: [], 
  };

  static get(id = "") {
    let script = document.createElement("SCRIPT");
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&photo_sizes=1&count=1000&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.lastCallback.callbackFn`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  static processData(result) {
    document.head.querySelector("script").remove();
    console.log(result);
    if (!result || result.error) {
      alert(
        result.error.error_msg ??
          "Скорее всего у вас нет доступа к данным из ВК или проверьте работу интернета"
      );
      return;
    }
    if (result.response && result.response.items && result.response.items.length > 0) {
      VK.lastCallback.listFromCallback = result.response.items.map(photo => photo.sizes.pop().url);
    } else {
      alert("Выбирите другой id пользователя, в профиле нет фото");
    }
  }
}

