/**
 *  K2JS Library version 0.2
 *  https://github.com/k2sports/k2js
 *  
 *  Copyright 2012, K2 Sports
 *  
 *  Dependencies:
 *    jQuery v1.7.2
 */

/**
 *  Example use for social plugins:
 *  
 *  <script type="text/javascript" src="https://raw.github.com/k2sports/k2js/master/k2js.js"></script>
 *  <script type="text/javascript">
 *    k2js.social_plugins.use(["facebook", "google", "pinterest", "twitter"]);
 *    
 *    $(function() {
 *      k2js.social_plugins.render();
 *    });
 *  </script>
 *  
 *  When content containing social plugins is loaded asynchronously, just re-render:
 *  
 *  k2js.social_plugins.render();
 */

var k2js = {
  social_plugins: {
    catalog: {
      facebook: "//connect.facebook.net/en_US/all.js",
      google: "https://apis.google.com/js/plusone.js",
      pinterest: "http://assets.pinterest.com/js/pinit.js",
      twitter: "http://platform.twitter.com/widgets.js"
    },
    shelf: [],
    actions: [],
    /**
     *  @param {String[]} sdks
     */
    use:  function(sdks) {
            for (var i = 0; i < sdks.length; i++) {
              this.load(sdks[i]);
            }
          }, // End social_plugins.use()
    /**
     *  @param {String} lib
     */
    load: function(lib) {
            var mirror = this;
            
            $.ajax({
              url: this.catalog[lib],
              dataType: "script",
              cache: true,
              complete: function(jqXHR, textStatus) {
                if (mirror.shelf.indexOf(lib) == -1) {
                  mirror.shelf.push(lib);
                }
                
                switch(lib) {
                  case "facebook":
                    mirror.render_facebook = 
                      function() {
                        // Facebook Like buttons load dynamically as their iframes are 
                        // added to the DOM. This does not work with HTML5 divs.
                      }
                    break;
                  case "google":
                    mirror.render_google = 
                      function() {
                        // Load Google +1 buttons
                        try {
                          gapi.plusone.go();
                        }
                        catch(e) {
                          this.load("google");
                        }
                      }
                    break;
                  case "pinterest":
                    mirror.render_pinterest = 
                      function() {
                        // PinIt buttons load dynamically as they are added to the 
                        // DOM.
                      }
                    break;
                  case "twitter":
                    mirror.render_twitter = 
                      function() {
                        // Load Twitter widgets
                        try {
                          window.twttr.widgets.load();
                        }
                        catch(e) {
                          this.load("twitter");
                        }
                      }
                    break;
                  default:
                    // Placeholder
                }
                
                if (mirror.actions.indexOf("render_ " + lib) == -1) {
                  mirror.actions.push("render_" + lib);
                }
              }
            });
          }, // End social_plugins.load()
    render: function() {
              for (var j = 0; j < this.actions.length; j++) {
                this[ this.actions[j] ]();
              }
            } // End social_plugins.render()
  }, // End social_plugins
  
  client: {
    /**
     *  @return {String} "mobile" or "desktop"
     */
    form_factor:  (function(agent) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4))) { 
                      return "mobile"; 
                    }
                    else { 
                      return "desktop"; 
                    }
                  })(navigator.userAgent||navigator.vendor||window.opera) // End client.form_factor
  }, // End client
  
  request: {
    /**
     *  @return {Object[]}
     */
    query_string_params:  function() {
                            var vars = [], hash;
                            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                            
                            for(var i = 0; i < hashes.length; i++) {
                              hash = hashes[i].split('=');
                              vars.push(hash[0]);
                              vars[hash[0]] = hash[1];
                            }
                            
                            return vars;
                          } // End request.query_string_params()
  } // End request
} // End k2js
