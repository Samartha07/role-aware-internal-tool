document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Login form submitted");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  console.log("Response status:", res.status);

  const data = await res.json();
  console.log("Response data:", data);

  if (!res.ok) {
    document.getElementById("error").innerText = data.error || "Login failed";
    return;
  }

  localStorage.setItem("token", data.token);
  console.log("Token stored, redirecting...");

  window.location.href = "/dashboard.html";
});
