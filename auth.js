import { createAuth0Client } from "https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@2.0.3/+esm";

let auth0Client;

async function initAuth() {
  auth0Client = await createAuth0Client({
    domain: "autotechjackpot.eu.auth0.com", // Sostituisci con il tuo dominio
    client_id: "KaPyAYevXOZaKcI7nbH3OCNKcB1fKQek", // Sostituisci con il tuo Client ID
    redirect_uri: "https://autotechjackpot.vercel.app/login.html"
  });

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    document.getElementById("user-info").innerText = `Welcome, ${user.name}`;
  }
}

// Funzione per il login
async function login() {
  await auth0Client.loginWithRedirect();
}

// Funzione per la registrazione
async function signup() {
  await auth0Client.loginWithRedirect({
    screen_hint: "signup"
  });
}

// Funzione per il logout
async function logout() {
  auth0Client.logout({
    returnTo: "https://autotechjackpot.vercel.app/"
  });
}

// Inizializza Auth0
window.onload = () => {
  initAuth();
  document.getElementById("login-button")?.addEventListener("click", login);
  document.getElementById("register-button")?.addEventListener("click", signup);
  document.getElementById("logout-button")?.addEventListener("click", logout);
};
