var inputContext = null;
var keyboardBody = null;
var keyboardElement = null;
// ---
var functionKeyActiveTextColor = "#00CAF2";
var functionKeyInactiveTextColor = "#A6A6A6";
var functionKeyClickTextColor = "#FFFFFF";
var functionKeyActiveBackgroundColor = "#4D4D4D";
var functionKeyInactiveBackgroundStyle = "linear-gradient(to bottom, #5b6668, #606b6e)";
var functionKeyInactiveBackgroundRepeat = "no-repeat";
var functionKeyInactiveBackgroundPosition = "right center";
var functionKeyInactiveBackgroundImage = "url('/style/images/div.png')";
var functionKeyClickBackgroundColor = "#00CAF2";
var functionKeyBackgroundNone = "none";
// ---
function resizeWindow() {
  window.resizeTo(document.getElementById('keyboardBody').innerWidth, keyboardElement.clientHeight);
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
function styleAsActiveFunctionKey(keyEl) {
  keyEl.style.color = functionKeyActiveTextColor;
  keyEl.style.background = functionKeyBackgroundNone;
  keyEl.style.backgroundColor = functionKeyActiveBackgroundColor;
}
function styleAsInactiveFunctionKey(keyEl) {
  keyEl.style.color = functionKeyInactiveTextColor;
  keyEl.style.background = functionKeyInactiveBackgroundStyle;
  keyEl.style.backgroundRepeat = functionKeyInactiveBackgroundRepeat;
  keyEl.style.backgroundPosition = functionKeyInactiveBackgroundPosition;
  keyEl.style.backgroundImage = functionKeyInactiveBackgroundImage;
}

function styleAsClickFunctionKey(keyEl) {
  keyEl.style.color = functionKeyClickTextColor;
  keyEl.style.background = functionKeyBackgroundNone;
  keyEl.style.backgroundColor = functionKeyClickBackgroundColor;
}
// ---

function init() {
  keyboardBody = document.getElementById('keyboardBody');
  keyboardBody.addEventListener('resize', resizeWindow);
  
  // Prevent loosing focus to the currently focused app.
  // Otherwise, right after mousedown event, the app will receive a focus event.
  keyboardElement = document.getElementById('keyboardDesk');
  keyboardElement.addEventListener('mousedown', function onMouseDown(evt) {
    evt.preventDefault();
  });
  
  window.addEventListener('resize', resizeWindow);
  window.navigator.mozInputMethod.oninputcontextchange = function() {
    inputContext = navigator.mozInputMethod.inputcontext;
    resizeWindow();
  };
  
  // Handler for shift key event...
  var shiftKey = false;
  var shiftLong = false;
  var shiftTimeout = null;
  var shiftElement = document.getElementById('shiftKey');
  shiftElement.addEventListener('touchstart', function mouseOverHandler(e) {
    if (shiftKey) {
      shiftKey = false;
      shiftLong = false;
    } else {
      shiftKey = true;
      styleAsActiveFunctionKey(e.target);
      shiftTimeout = window.setTimeout(function menuTimeout() {
        shiftLong = true;
        styleAsClickFunctionKey(e.target);
      }, 700);
    }
  });
  shiftElement.addEventListener('touchend', function mouseLeaveHandler(e) {
    if (shiftKey) {
      styleAsClickFunctionKey(e.target);
      if (!shiftLong) {
        clearTimeout(shiftTimeout);
      }
    } else {
      styleAsInactiveFunctionKey(e.target);
    }
  });
  
  // Binding handlers on letter keys...
  var letterKeyElements = document.getElementsByName('letterKey');
  for (var i = 0; i < letterKeyElements.length; i++) {
    letterKeyElements[i].addEventListener('click', function letterKeyHandler(e) {
      ch = (e.target).innerHTML;
      if (!shiftKey) {
        ch = ch.toLowerCase();
      }
      sendKey(ch.charCodeAt(0));
      if (!shiftLong) {
        if (shiftKey) {
          shiftKey = false;
          styleAsInactiveFunctionKey(shiftElement);
        }
      }
    });
  }
  
  // Handler for switch layout button...
  var switchElement = document.getElementById('switchKey');
  switchElement.addEventListener('click', function switchHandler() {
    var mgmt = navigator.mozInputMethod.mgmt;
    mgmt.next();
  });

  // Long press to trigger IME menu...
  var menuTimeout = 0;
  switchElement.addEventListener('touchstart', function longHandler(e) {
    styleAsActiveFunctionKey(e.target);
    menuTimeout = window.setTimeout(function menuTimeout() {
      var mgmt = navigator.mozInputMethod.mgmt;
      mgmt.showAll();
    }, 700);
  });
  switchElement.addEventListener('touchend', function longHandler(e) {
    styleAsInactiveFunctionKey(e.target);
    clearTimeout(menuTimeout);
  });
}

window.addEventListener('load', init);