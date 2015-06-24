var inputContext = null;
var keyboardElement = null;
// ---
var functionKeyActiveTextColor = "#00CAF2";
var functionKeyInactiveTextColor = "#A6A6A6";
var functionKeyClickTextColor = "#FFFFFF";
var functionKeyActiveBackgroundColor = "#4D4D4D";
var functionKeyInactiveBackgroundStyle = "linear-gradient(to bottom, #5b6668, #606b6e)";
var functionKeyClickBackgroundColor = "#00CAF2";
var functionKeyBackgroundNone = "none";
// ---

function init() {
  keyboardElement = document.getElementById('keyboard');
  window.addEventListener('resize', resizeWindow);
  window.navigator.mozInputMethod.oninputcontextchange = function() {
    inputContext = navigator.mozInputMethod.inputcontext;
    resizeWindow();
  };

  // Prevent loosing focus to the currently focused app.
  // Otherwise, right after mousedown event, the app will receive a focus event.
  /* keyboardElement.addEventListener('mousedown', function onMouseDown(evt) {
    evt.preventDefault();
  }); */
  
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
      shiftElement.style.color = functionKeyClickTextColor;
      shiftElement.style.background = functionKeyBackgroundNone;
      shiftElement.style.backgroundColor = functionKeyClickBackgroundColor;
    } else {
      shiftKey = false;
      shiftElement.style.color = functionKeyInactiveTextColor;
      shiftElement.style.background = functionKeyInactiveBackgroundStyle;
    }
  });
  shiftElement.addEventListener('mouseover', function mouseOverHandler() {
    if (!shiftKey) {
      shiftElement.style.color = functionKeyActiveTextColor;
      shiftElement.style.background = functionKeyBackgroundNone;
      shiftElement.style.backgroundColor = functionKeyActiveBackgroundColor;
    }
  });
  shiftElement.addEventListener('mouseleave', function mouseLeaveHandler() {
    if (!shiftKey) {
      shiftElement.style.color = functionKeyInactiveTextColor;
      shiftElement.style.background = functionKeyInactiveBackgroundStyle;
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
      if (shiftKey) {
        shiftKey = false;
        shiftElement.style.color = functionKeyInactiveTextColor;
        shiftElement.style.background = functionKeyInactiveBackgroundStyle;
      }
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
    switchElement.style.color = functionKeyActiveTextColor;
    switchElement.style.background = functionKeyBackgroundNone;
    switchElement.style.backgroundColor = functionKeyActiveBackgroundColor;
    // ---
    menuTimeout = window.setTimeout(function menuTimeout() {
      var mgmt = navigator.mozInputMethod.mgmt;
      mgmt.showAll();
    }, 700);
  });
  switchElement.addEventListener('touchend', function longHandler() {
    switchElement.style.color = functionKeyInactiveTextColor;
    switchElement.style.background = functionKeyInactiveBackgroundStyle;
    // ---
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
