/* 
 *  K2JS Library version 0.1
 *  https://github.com/k2sports/k2js
 *  
 *  Copyright 2012, K2 Sports
 *  
 *  Dependencies:
 *    jQuery v1.7.2
 */

/* 
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
    /*
     *  @param {String[]} sdks
     */
    use:  function(sdks) {
            for (var i = 0; i < sdks.length; i++) {
              this.load(sdks[i]);
            }
          }, // End social_plugins.use()
    /*
     *  @param {String} lib
     */
    load: function(lib) {
            var mirror = this;
            
            $.ajax({
              url: this.catalog[lib],
              dataType: "script",
              cache: true,
              complete: function(jqXHR, textStatus) {
                mirror.shelf.push(lib);
                
                switch(lib) {
                  case "facebook":
                    mirror.render_facebook = 
                      function() {
                        // Facebook Like buttons load dynamically as their iframes are 
                        // added to the DOM. This does not work with HTML5 divs.
                      }
                    mirror.actions.push("render_facebook");
                    
                    break;
                  case "google":
                    mirror.render_google = 
                      function() {
                        // Load Google +1 buttons
                        gapi.plusone.go();
                      }
                    mirror.actions.push("render_google");
                    
                    break;
                  case "pinterest":
                    mirror.render_pinterest = 
                      function() {
                        // PinIt buttons load dynamically as they are added to the 
                        // DOM.
                      }
                    mirror.actions.push("render_pinterest");
                    
                    break;
                  case "twitter":
                    mirror.render_twitter = 
                      function() {
                        // Load Twitter widgets
                        window.twttr.widgets.load();
                      }
                    mirror.actions.push("render_twitter");
                    
                    break;
                  default:
                    // Placeholder
                }
              }
            });
          }, // End social_plugins.load()
    render: function() {
              for (var j = 0; j < this.actions.length; j++) {
                this[ this.actions[j] ]();
              }
            } // End social_plugins.render()
  } // End social_plugins
} // End k2js