document.getElementById('logoutLink')?.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('parkea_token');
  localStorage.removeItem('parkea_user_id');
  window.location.href = '../HU02-Homepage/index.html';
});

document.getElementById('logoutLinkMob')?.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('parkea_token');
  localStorage.removeItem('parkea_user_id');
  window.location.href = '../HU02-Homepage/index.html';
});