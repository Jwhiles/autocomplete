function good () {
  return true;
}

if (module) {
  module.exports = {
    good: good
  };
}
