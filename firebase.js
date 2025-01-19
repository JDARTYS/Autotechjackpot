// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn_UmalWNd1dIdJG2lgbKNXKLZlWwmn4w",
  authDomain: "autotechjackpot.firebaseapp.com",
  projectId: "autotechjackpot",
  storageBucket: "autotechjackpot.firebasestorage.app",
  messagingSenderId: "127768056298",
  appId: "1:127768056298:web:fbd966161d3a2bc28c2293",
  measurementId: "G-3RJM0DNWDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase functions
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful!");
    return userCredential.user;
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed: " + error.message);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed: " + error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed: " + error.message);
  }
}

export async function saveToFirestore(collection, id, data) {
  try {
    await setDoc(doc(db, collection, id), data);
    console.log("Data saved to Firestore.");
  } catch (error) {
    console.error("Error saving to Firestore:", error);
  }
}

export async function getFromFirestore(collection, id) {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No document found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching from Firestore:", error);
    throw error;
  }
}
