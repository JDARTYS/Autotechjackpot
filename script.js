// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDn_UmalWNd1dIdJG2lgbKNXKLZlWwmn4w",
  authDomain: "autotechjackpot.firebaseapp.com",
  projectId: "autotechjackpot",
  storageBucket: "autotechjackpot.firebasestorage.app",
  messagingSenderId: "127768056298",
  appId: "1:127768056298:web:fbd966161d3a2bc28c2293"
};

// Inizializza Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const passwordError = document.getElementById('password-error');
  const registerPassword = document.getElementById('register-password');
  const confirmPassword = document.getElementById('register-confirm-password');

  // Funzione per passare da Login a Register
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  });

  // Validazione delle password nella registrazione
  confirmPassword.addEventListener('input', () => {
    if (registerPassword.value !== confirmPassword.value) {
      passwordError.style.display = 'block';
    } else {
      passwordError.style.display = 'none';
    }
  });

  // Registrazione Utente
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = registerPassword.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Registrazione completata!");
        console.log("Utente registrato:", userCredential.user);
      })
      .catch((error) => {
        handleError(error, "register");
      });
  });

  // Login Utente
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Login completato!");
        console.log("Utente loggato:", userCredential.user);
        window.location.href = "index.html"; // Reindirizza alla homepage
      })
      .catch((error) => {
        handleError(error, "login");
      });
  });

  // Funzione per gestire errori
  function handleError(error, context) {
    let message = "";
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "L'indirizzo email è già registrato.";
        break;
      case "auth/weak-password":
        message = "La password deve contenere almeno 6 caratteri.";
        break;
      case "auth/invalid-email":
        message = "Inserisci un indirizzo email valido.";
        break;
      case "auth/user-not-found":
        message = "Utente non trovato. Registrati prima.";
        break;
      case "auth/wrong-password":
        message = "Password errata. Riprova.";
        break;
      default:
        message = "Errore: " + error.message;
    }

    alert(`Errore durante il ${context}: ${message}`);
  }
});
