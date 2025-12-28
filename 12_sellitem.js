// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // *** PASTE YOUR FIREBASE CONFIG HERE ***
// const firebaseConfig = {
//     // ... paste your keys here ...
//     apiKey: "AIzaSyAFv2RmXqL70wEo6kWElCfPzfIXGj7MSvY",
//     authDomain: "campuskart-df622.firebaseapp.com",
//     projectId: "campuskart-df622",
//     storageBucket: "campuskart-df622.firebasestorage.app",
//     messagingSenderId: "723302801138",
//     appId: "1:723302801138:web:f70c3df9d0505e229eba6b",
//     measurementId: "G-750HTEWKKD"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const sellForm = document.getElementById('sell-form');

// sellForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const user = auth.currentUser;
//     if (!user) {
//         alert("Please login first!");
//         window.location.href = "login.html";
//         return;
//     }

//     // Get the values from the form
//     const title = document.getElementById('item-title').value;
//     const price = document.getElementById('item-price').value;
//     const category = document.getElementById('item-category').value;
//     // const imageUrl = document.getElementById('item-image').value; // Just a text string now!
//     const submitBtn = document.getElementById('submit-btn');

//     try {
//         submitBtn.innerText = "Posting...";
//         submitBtn.disabled = true;

//         // Save directly to Firestore (No "Storage" needed)
//         await addDoc(collection(db, "products"), {
//             title: title,
//             price: price,
//             category: category,
//             // image: imageUrl, 
//             sellerName: user.displayName || "Student",
//             sellerId: user.uid,
//             createdAt: new Date()
//         });

//         alert("Success! Item listed.");
//         window.location.href = "item_page.html";

//     } catch (error) {
//         console.error("Error:", error);
//         alert("Error listing item: " + error.message);
//         submitBtn.innerText = "Post Ad";
//         submitBtn.disabled = false;
//     }
// });/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// We are using Firestore as you requested
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// *** PASTE YOUR FIREBASE CONFIG HERE ***
const firebaseConfig = {
    // ... paste your keys here ...
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
const db = getFirestore(app);

const sellForm = document.getElementById('sell-form');

// --- HELPER FUNCTION: Convert Image to Text (Base64) ---
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result); // This is the long text string
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

sellForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("Please login first!");
        window.location.href = "04_login.html";
        return;
    }

    const title = document.getElementById('item-title').value;
    const price = document.getElementById('item-price').value;
    const category = document.getElementById('item-category').value;
    const phone = document.getElementById('item-phone').value;
    const fileInput = document.getElementById('item-image'); // Make sure HTML input is type="file"
    const file = fileInput.files[0];
    const submitBtn = document.getElementById('submit-btn');

    // 1. LIMIT CHECK: Firestore documents have a size limit (1MB max)
    // We restrict images to 500KB to be safe.
    if (file && file.size > 500 * 1024) {
        alert("Image is too big! Please select an image smaller than 500KB.");
        return;
    }

    try {
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        // 2. Convert the file to a string
        const base64Image = await convertToBase64(file);

        // 3. Save EVERYTHING to Firestore
        await addDoc(collection(db, "products"), {
            title: title,
            price: price,
            category: category,
            phone: phone,
            image: base64Image, // Saving the image code directly here
            sellerName: user.displayName || "Student",
            sellerId: user.uid,
            createdAt: new Date()
        });

        alert("Item listed successfully!");
        window.location.href = "07_item_page.html";

    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
        submitBtn.innerText = "Post Ad";
        submitBtn.disabled = false;
    }
});