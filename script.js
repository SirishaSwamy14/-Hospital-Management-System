let currentUser = null;

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.username === username)) {
    alert("User already exists.");
    return;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully!");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  currentUser = user;
  document.getElementById("auth").classList.add("hidden");

  if (user.role === "user") {
    document.getElementById("userPanel").classList.remove("hidden");
  } else {
    document.getElementById("adminPanel").classList.remove("hidden");
  }
}

function logout() {
  currentUser = null;
  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("userPanel").classList.add("hidden");
  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("adminOutput").innerHTML = "";
}

function bookAppointment() {
  const details = document.getElementById("appointmentDetails").value;
  let appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  appointments.push({ user: currentUser.username, details, status: "pending" });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  alert("Appointment booked!");
  document.getElementById("appointmentDetails").value = "";
}

function sendMessage() {
  const message = document.getElementById("messageToSend").value;
  let messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push({ from: currentUser.username, message });
  localStorage.setItem("messages", JSON.stringify(messages));
  alert("Message sent!");
  document.getElementById("messageToSend").value = "";
}

function viewAppointments() {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  if (appointments.length === 0) {
    document.getElementById("adminOutput").innerHTML = "<p>No appointments found.</p>";
    return;
  }
  const output = appointments.map((a, i) =>
    `#${i + 1} | User: ${a.user} | Details: ${a.details} | Status: ${a.status}`
  ).join("<br>");
  document.getElementById("adminOutput").innerHTML = `<h3>Appointments</h3>${output}`;
}

function viewMessages() {
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  if (messages.length === 0) {
    document.getElementById("adminOutput").innerHTML = "<p>No messages found.</p>";
    return;
  }
  const output = messages.map((m, i) =>
    `#${i + 1} | From: ${m.from} | Message: ${m.message}`
  ).join("<br>");
  document.getElementById("adminOutput").innerHTML = `<h3>Messages</h3>${output}`;
}

function addDoctor() {
  const name = document.getElementById("doctorName").value;
  if (!name.trim()) {
    alert("Please enter a valid doctor name.");
    return;
  }
  let doctors = JSON.parse(localStorage.getItem("doctors") || "[]");
  doctors.push({ name });
  localStorage.setItem("doctors", JSON.stringify(doctors));
  alert("Doctor added!");
  document.getElementById("doctorName").value = "";
}

function addAdmin() {
  const newAdmin = document.getElementById("newAdmin").value;
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === newAdmin);
  if (!user) {
    alert("User not found.");
    return;
  }
  user.role = "admin";
  localStorage.setItem("users", JSON.stringify(users));
  alert("User promoted to admin!");
  document.getElementById("newAdmin").value = "";
}
