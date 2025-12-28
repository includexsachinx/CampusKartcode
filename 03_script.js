// 1. Import the specific Google tools we need (Don't change these URLs)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// 2. Your Firebase Configuration
// Go to Firebase Console > Project Settings > General > Scroll down to "Your apps"
// Copy the "firebaseConfig" object and replace the one below completely.
const firebaseConfig = {
    apiKey: "AIzaSyD2VNeLPuJaxNtcjJL7uUoIXye7vXJ3Paw",
    authDomain: "campuskart2-7256b.firebaseapp.com",
    projectId: "campuskart2-7256b",
    storageBucket: "campuskart2-7256b.firebasestorage.app",
    messagingSenderId: "580446857414",
    appId: "1:580446857414:web:f039af2da71b628a44cfc7",
    measurementId: "G-X21043X8NM"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Set up Google Login

// 4. The Logic (The "Glue")
const loginButton = document.getElementById('login-btn');

// EVENT: What happens when they click "Login"
loginButton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // Success! The user is logged in.
            const user = result.user;
            console.log("Logged in as:", user.displayName);
            alert(`Hello ${user.displayName}! You are verified.`);
        })
        .catch((error) => {
            // Failure! (e.g., they closed the popup)
            console.error("Login failed:", error.message);
            alert("Login failed. Please try again.");
        });
});

// EVENT: Watch for login state changes (Auto-update the button text)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, change the button to say "Logout"
        loginButton.innerText = "Logout";
        
        // Optional: If you click logout, it signs you out
        loginButton.onclick = () => {
             signOut(auth).then(() => {
                 alert("Signed out!");
                 location.reload(); // Refresh page
             });
        };
    } else {
        // User is not logged in
        loginButton.innerText = "Login";
    }
});