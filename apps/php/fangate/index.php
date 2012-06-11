<?php
  // App parameters
  $appID = '';
  $pageTitle = '';
  $fanGate = true;
  $fanGateTextDisplay = false;
  $fanGateText = '';
  /*  End app parameters. Nothing beneath this line needs to be altered for a
   *  standard deployment.
   */
  $isHttps = $_SERVER['SERVER_PORT'];
  
  if ($fanGate) {
    $signed_request = $_REQUEST['signed_request'];
  
    function parsePageSignedRequest() {
      if (isset($_REQUEST['signed_request'])) {
        $encoded_sig = null;
        $payload = null;
        list($encoded_sig, $payload) = explode('.', $_REQUEST['signed_request'], 2);
        $sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
        $data = json_decode(base64_decode(strtr($payload, '-_', '+/'), true));
        return $data;
      }
      return false;
    }
  
    if($signed_request = parsePageSignedRequest()) {
      if($signed_request->page->liked) {
        $fan = true;
      } else {
        $fan = false;
      }
    }
  } else {
    $fan = true;
  }
?>

<?php 
  echo '<?xml version="1.0" encoding="UTF-8"?>';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <title><?php echo $pageTitle; ?></title>
    
    <link rel="stylesheet" type="text/css" media="screen" href="css/screen.css" />
    
    <!--
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
    -->
  </head>

  <body>
    <div id="tab-container">
      <div id="fb-root"></div>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
              appId: '<?php echo $appID; ?>',
              status: true, // check login status
              cookie: true, // use cookies
              xfbml: true   // parse xfbml
          });
            
          FB.Canvas.setAutoResize();
        };

        (function() {
          var e = document.createElement('script');
          e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
          e.async = true;
          document.getElementById('fb-root').appendChild(e);
        }());
      </script>

      <?php
        if ($fan) {
          include 'fan.html';
        } else {
          include 'fangate.html';
          if ($fanGateTextDisplay) {
      ?>
            <div id="fan-warning" class="round-corners-8px">
              <h3><?php echo $fanGateText; ?></h3>
            </div>
      <?php
          }
        }
      ?>
    </div>
  </body>
</html>