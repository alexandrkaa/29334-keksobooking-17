'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var onFileLoaded = function (pictureElem, reader) {
    pictureElem.src = reader.result;
    // reader.addEventListener('load', onFileLoaded);
    reader.removeEventListener('load', onFileLoaded);
  };

  var onFileChoose = function (pictureElem, images) {
    var reader = new FileReader();
    // var fileChooser = evt.target;
    // var file = fileChooser.files[fileChooser.files.length - 1];
    images.forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        if (typeof pictureElem === 'function') {
          pictureElem = pictureElem();
        }
        reader.readAsDataURL(file);
      }
    });

    reader.addEventListener('load', onFileLoaded.bind(null, pictureElem, reader));
  };

  window.previewLoader = {
    onFileChoose: onFileChoose
  };
})();
