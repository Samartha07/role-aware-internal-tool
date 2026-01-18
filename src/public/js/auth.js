function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

function goTo(page) {
  window.location.href = page;
}
