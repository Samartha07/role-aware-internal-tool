const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}

fetch("/audit-logs", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("auditTable");

    if (data.error) {
      document.body.innerHTML = "<h3>Access Denied</h3>";
      return;
    }

    if (data.length === 0) {
      table.innerHTML = "<tr><td colspan='4'>No logs found</td></tr>";
      return;
    }

    data.forEach(log => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${log.userId}</td>
        <td>${log.role}</td>
        <td>${log.action}</td>
        <td>${new Date(log.createdAt).toLocaleString()}</td>
      `;

      table.appendChild(row);
    });
  })
  .catch(() => {
    document.body.innerHTML = "<h3>Error loading audit logs</h3>";
  });
