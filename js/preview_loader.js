'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var onFileLoaded = function (pictureElem, reader) {
    pictureElem.src = reader.result;
    reader.addEventListener('load', onFileLoaded);
  };

  var onFileChoose = function (pictureElem, fileChooser) {
    if (typeof pictureElem === 'function') {
      pictureElem = pictureElem();
    }
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', onFileLoaded.bind(null, pictureElem, reader));
      reader.readAsDataURL(file);
    }
  };

  window.previewLoader = {
    onFileChoose: onFileChoose
  };
})();
