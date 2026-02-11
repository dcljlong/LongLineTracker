window.trackLine = function () {
  const result = document.getElementById('result');
  const now = new Date().toLocaleString();
  result.textContent = Line tracked at \;
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registered:', reg.scope))
    .catch(err => console.error('Service Worker registration failed:', err));
}
