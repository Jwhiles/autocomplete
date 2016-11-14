function myFunction () {
  document.getElementById('language-options').classList.toggle('show');
}
window.onclick = function (event) {
  if (!event.target.matches('.drop-down-btn')) {
    var options = document.getElementsByClassName('options');
    if (options.classList.contains('show')) {
      options.classList.remove('show');
    }
  }
};
