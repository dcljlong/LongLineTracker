window.trackLine = function () {
  var result = document.getElementById('result');
  var now = new Date().toLocaleString();
  result.textContent = 'Line tracked at ' + now;
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function(reg) { console.log('Service Worker registered:', reg.scope); })
    .catch(function(err) { console.error('Service Worker registration failed:', err); });
}
