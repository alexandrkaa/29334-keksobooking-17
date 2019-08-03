'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // var onFileLoaded = function (pictureElem, reader) {
  //   pictureElem.src = reader.result;
  //   reader.addEventListener('load', onFileLoaded);
  // };

  // var onFileChoose = function (pictureElem, evt) {
  //   var fileChooser = evt.target;
  //   if (typeof pictureElem === 'function') {
  //     pictureElem = pictureElem();
  //   }
  //   var file = fileChooser.files[fileChooser.files.length - 1];
  //   var fileName = file.name.toLowerCase();

  //   var matches = FILE_TYPES.some(function (it) {
  //     return fileName.endsWith(it);
  //   });

  //   if (matches) {
  //     var reader = new FileReader();
  //     reader.addEventListener('load', onFileLoaded.bind(null, pictureElem, reader));
  //     reader.readAsDataURL(file);
  //   }
  // };

  function checkMimeType(file) {
    var mime = file.type.slice(file.type.indexOf('/') + 1)
    return FILE_TYPES.includes(mime)
  }

  function onFileChoose(files) {
    var filtredFiles = Array.prototype.filter.call(files, function (file) {
      return checkMimeType(file);
    }).map(function (file) {
      return URL.createObjectURL(file);
    });
    return filtredFiles;
  }

  window.previewLoader = {
    onFileChoose: onFileChoose,
    checkMimeType: checkMimeType
  };
})();
