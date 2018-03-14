/*
 *  TODO Examine and perhaps modify this code (Alexis)
 */

function iFrameApplyAncestorCSS() {
  if(window.top && window.top.location.href != document.location.href) {
  // I'm small but I'm not alone
    // all parent's <link>s
    var linkrels = window.top.document.getElementsByTagName('link');
    // my head
    var small_head = document.getElementsByTagName('head').item(0);
    // loop through parent's links
    for (var i = 0, max = linkrels.length; i < max; i++) {
      // are they stylesheets
      if (linkrels[i].rel && linkrels[i].rel == 'stylesheet') {
        // create new element and copy all attributes
        var thestyle = document.createElement('link');
        var attrib = linkrels[i].attributes;
        for (var j = 0, attribmax = attrib.length; j < attribmax; j++) {
          thestyle.setAttribute(attrib[j].nodeName, attrib[j].nodeValue);
        }
         // add the newly created element to the head
        small_head.appendChild(thestyle);
      }
    }
    // maybe, only maybe, here we should remove the kid's own styles...
  } else {
    //alert('I hate to tell you that, but you are an orphant  ');
  }
}
