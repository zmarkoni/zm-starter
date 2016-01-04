var $ = require('jquery');

module.exports = function (someText) { //ne mogu da stavim ime funkcije!
  var z = $('#app').text(someText);
  return z;
}