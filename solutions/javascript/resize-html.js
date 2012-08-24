function resizeHTML() {
  var docHeight = $(document).height();
  var bodyHeight = $('html').height();

  if (bodyHeight < docHeight) {
    // Firefox (& others?) won't reset body height
    $('html').height(docHeight);
    // IE7 won't reset html height
    $('body').height(docHeight);
  }
}
