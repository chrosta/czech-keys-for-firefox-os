var inputContext = null;
var keyboardElement;

function init() {
  keyboardElement = document.getElementById('keyboard');
  window.addEventListener('resize', resizeWindow);
  window.navigator.mozInputMethod.oninputcontextchange = function() {
    inputContext = navigator.mozInputMethod.inputcontext;
    resizeWindow();
  };

  // Prevent loosing focus to the currently focused app.
  // Otherwise, right after mousedown event, the app will receive a focus event.
  keyboardElement.addEventListener('mousedown', function onMouseDown(evt) {
    evt.preventDefault();
  });
  
  // Handler for general char sendings keys...
  /*
  var sendKeyElement = document.getElementById('sendKey');
  sendKeyElement.addEventListener('click', function sendKeyHandler() {
    var testString = '\\o/';
    for (var i = 0; i < testString.length; i++) {
      sendKey(testString.charCodeAt(i));
    }
  });
  */
  
  // Handler for shift key event...
  var shiftKey = false;
  var shiftElement = document.getElementById("shiftKey");
  shiftElement.addEventListener('click', function shiftHandler() {
    if (!shiftKey) {
      shiftKey = true;
      shiftElement.style.color="#FFFFFF";
      shiftElement.style.backgroundColor="#00CAF2";
    } else {
      shiftKey = false;
      shiftElement.style.color="#A6A6A6";
      shiftElement.style.background="none";
    }
  });
  
  
  // Handler for general char sendings keys...
  var sendKeyElements = document.getElementsByName('sendKey');
  for (var i = 0; i < sendKeyElements.length; i++) {
    sendKeyElements[i].addEventListener('click', function sendKeyHandler(e) {
      ch = (e.target).innerHTML;
      if (!shiftKey) {
        ch = ch.toLowerCase();
      }
      sendKey(ch.charCodeAt(0));
    });
  }
  
  // Handler for switch layout button...
  var switchElement = document.getElementById('switchLayout');
  switchElement.addEventListener('click', function switchHandler() {
    var mgmt = navigator.mozInputMethod.mgmt;
    mgmt.next();
  });

  // Long press to trigger IME menu...
  var menuTimeout = 0;
  switchElement.addEventListener('touchstart', function longHandler() {
    menuTimeout = window.setTimeout(function menuTimeout() {
      var mgmt = navigator.mozInputMethod.mgmt;
      mgmt.showAll();
    }, 700);
  });
  switchElement.addEventListener('touchend', function longHandler() {
    clearTimeout(menuTimeout);
  });
}

function resizeWindow() {
  window.resizeTo(window.innerWidth, keyboardElement.clientHeight);
}

function sendKey(keyCode) {
  switch (keyCode) {
  case KeyEvent.DOM_VK_BACK_SPACE:
  case KeyEvent.DOM_VK_RETURN:
    if (inputContext) {
      inputContext.sendKey(keyCode, 0, 0);
    }
    break;
    default:
      if (inputContext) {
        inputContext.sendKey(0, keyCode, 0);
      }
      break;
    }
}

window.addEventListener('load', init);
