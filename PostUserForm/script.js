document.getElementById("registerBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Clear old message
  message.textContent = "";

  // Validation
  if (!name || !email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill all fields.";
    return;
  }

  const userData = {
    name,
    email,
    password
  };

  try {
    const res = await fetch("https://mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      message.style.color = "green";
      message.textContent = "Registration successful!";
    } else {
      message.style.color = "red";
      message.textContent = "Failed to register. Email might already exist.";
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Network error!";
  }
});
