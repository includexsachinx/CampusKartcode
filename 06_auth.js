import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// *** PASTE YOUR FIREBASE CONFIG HERE ***
const firebaseConfig = {
    // Paste your keys here just like in script.js
    apiKey: "AIzaSyD2VNeLPuJaxNtcjJL7uUoIXye7vXJ3Paw",
    authDomain: "campuskart2-7256b.firebaseapp.com",
    projectId: "campuskart2-7256b",
    storageBucket: "campuskart2-7256b.firebasestorage.app",
    messagingSenderId: "580446857414",
    appId: "1:580446857414:web:f039af2da71b628a44cfc7",
    measurementId: "G-X21043X8NM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. Toggle Logic (Switching between Login and Sign Up)
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault(); // Stop link from jumping
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// 2. Handle Sign Up (Create User + Save Name)
const formSignup = document.getElementById('form-signup');
formSignup.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const fullName = document.getElementById('signup-name').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // IMPORTANT: Save the Full Name to the profile
            updateProfile(user, {
                displayName: fullName
            }).then(() => {
                alert("Account created for " + fullName);
                window.location.href = "07_item_page.html"; // Redirect to item page
            });
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// 3. Handle Login
const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Welcome back, " + user.displayName);
            window.location.href = "07_item_page.html"; // Redirect to item page
        })
        .catch((error) => {
            alert("Login Failed: " + error.message);
        });
});