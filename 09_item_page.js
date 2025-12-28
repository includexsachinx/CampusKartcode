import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// *** PASTE YOUR FIREBASE CONFIG KEYS HERE ***
const firebaseConfig = {
    // ... paste keys here ...
    apiKey: "AIzaSyD2VNeLPuJaxNtcjJL7uUoIXye7vXJ3Paw",
    authDomain: "campuskart2-7256b.firebaseapp.com",
    projectId: "campuskart2-7256b",
    storageBucket: "campuskart2-7256b.firebasestorage.app",
    messagingSenderId: "580446857414",
    appId: "1:580446857414:web:f039af2da71b628a44cfc7",
    measurementId: "G-X21043X8NM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variables to hold data
let allProducts = [];
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');

// 1. Function to Fetch Data
async function loadProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        
        allProducts = []; // Clear list
        querySnapshot.forEach((doc) => {
            allProducts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        renderProducts(allProducts);

    } catch (error) {
        console.error("Error loading products:", error);
        productGrid.innerHTML = "<p>Error loading items. Please try again.</p>";
    }
}

// 2. Function to Render (Show) Data
function renderProducts(productList) {
    productGrid.innerHTML = ""; // Clear current grid

    if (productList.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {
        // Create HTML for one card
        const cardHTML = `
            <div class="product-card">
                <img src="${product.image || 'https://via.placeholder.com/300'}" class="product-image" alt="Item">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">₹${product.price}</p>
                    <p class="seller">Sold by: ${product.sellerName || 'Student'}</p>
                    <a href="https://wa.me/91${product.phone}?text=Hi, I am interested in your '${product.title}' listed on CampusKart." 
               target="_blank" 
               class="btn-chat">
               💬 Chat with Seller
            </a>
                </div>
            </div>
        `;
        productGrid.innerHTML += cardHTML;
    });
}

// 3. Search Logic
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
});

// Run on page load
loadProducts();