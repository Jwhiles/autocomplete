function myFunction () {
  document.getElementById('language-options').classList.toggle('show');
}
window.onclick = function (event) {
  if (!event.target.matches('.drop-down-btn')) {
    var options = document.getElementsByClassName('options');
    for (var i = 0; i < options.length; i++) {
      var openOption = options[i];
      if (openOption.classList.contains('show')) {
        openOption.classList.remove('show');
      }
    }
  }
};
