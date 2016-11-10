function good(){
  return true;
}

function buildUrl(endpoint, lang, value){
  if (arguments.length != 3) return undefined;
  return endpoint + "?lang=" + lang + "&search=" + value;
}


if (module) {
module.exports = {
  good: good,
  buildUrl: buildUrl
}
}
