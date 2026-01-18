fetch("/admin", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
.then(res => res.json())
.then(data => {
  if (data.error) {
    document.body.innerHTML = "<h3>Access Denied</h3>";
  }
});
