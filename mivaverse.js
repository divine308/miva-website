
function openModal(id) {
  closeAllModals();
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.style.display = 'none');
}

function openAuthModal() {
  openModal('authModal');
}

// Register

const registeredEmails = JSON.parse(localStorage.getItem("miva_registered_emails"))

document.getElementById('registerForm').onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const error = document.getElementById('regError');

  if (!email.endsWith('@miva.edu.ng')) {
    error.textContent = 'Only Miva University emails are allowed. Please register using your @miva.edu.ng email address';
    return;
  }

  if (registeredEmails.includes(email)) {
    error.textContent = "This email is already registered, please log in instead";
    return
  }

  const passwordRegex = /^(?=.[A-Za-z])(?=.\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    error.textContent = 'Password must include letters, numbers, and special characters.';
    return;
  }
 localStorage.setItem('miva_user_email', email);
  localStorage.setItem('miva_user_password', password);

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem('miva_verification_code', code);
  alert(`Code sent to email (simulated): ${code}`);

  openModal('codeModal');
};

// Code verification
document.getElementById('verifyForm').onsubmit = function (e) {
  e.preventDefault();
  const codeInput = document.getElementById('verificationCode').value.trim();
  const codeStored = localStorage.getItem('miva_verification_code');

  if (codeInput === codeStored) {
    alert('Verification successful!');
    window.location.href = 'student.html';
  } else {
    alert('Incorrect code.');
  }
};

// Login
document.getElementById('loginForm').onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const error = document.getElementById('loginError');

  const storedEmail = localStorage.getItem('miva_user_email');
  const storedPassword = localStorage.getItem('miva_user_password');

   if (email === storedEmail && password === storedPassword) {
    alert('Login successful!');
    window.location.href = 'mewstudent.html';
  } else {
    error.textContent = 'Invalid login credentials.';
  }
};
