document.getElementById('appMenu').addEventListener('click', function() {
  document.addEventListener('visibilitychange', function() {
    window.close();
  });
  var activity = new MozActivity({
    name: 'configure',
    data: {
      target: 'device'
    }
  });
});
