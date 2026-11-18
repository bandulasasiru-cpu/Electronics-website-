
// ==========================
// NAVIGATION MENU
// ==========================

let menuIcon = document.getElementById("menuIcon");
let navLinks = document.getElementById("navLinks");

if (menuIcon && navLinks) {

    menuIcon.addEventListener("click", function() {

        navLinks.classList.toggle("show");

    });

}


// Close Menu After Clicking a Link

let navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function(item) {

    item.addEventListener("click", function() {

        if (navLinks) {
            navLinks.classList.remove("show");
        }

    });

});


// ==========================
// PRODUCT CATEGORY FILTER
// ==========================

let categoryButtons = document.querySelectorAll(".category-btn");
let products = document.querySelectorAll(".store-product");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let category = button.getAttribute("data-category");

        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        products.forEach(function(product) {

            let productCategory = product.getAttribute("data-category");

            if (category === "all" || category === productCategory) {

                product.classList.remove("hide");

            } else {

                product.classList.add("hide");

            }

        });

    });

});


// ==========================
// SHOPPING CART DATA
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Save Cart Data

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}


// ==========================
// UPDATE CART COUNT
// ==========================

function updateCartCount() {

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {

        let totalItems = cart.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);

        cartCount.innerText = totalItems;

    }

}


// ==========================
// ADD TO CART FUNCTION
// ==========================

let addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let productName = button.getAttribute("data-name");

        let productPrice = Number(button.getAttribute("data-price"));

        let existingProduct = cart.find(function(item) {

            return item.name === productName;

        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                quantity: 1

            });

        }

        saveCart();

        updateCartCount();

        showSuccessMessage();

    });

});


// ==========================
// DISPLAY CART PRODUCTS
// ==========================

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your Cart is Empty!</h3>

                <p>You haven't added any products yet.</p>

                <a href="products.html" class="shop-btn">
                    Start Shopping
                </a>

            </div>

        `;

    }

    cart.forEach(function(product, index) {

        let itemTotal = product.price * product.quantity;

        subtotal += itemTotal;

        totalItems += product.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-details">

                    <h3>${product.name}</h3>

                    <p>Rs. ${product.price.toLocaleString("en-US")}</p>

                    <div class="quantity-control">

                        <button onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <div>

                    <p style="font-weight:600; margin-bottom:10px;">
                        Rs. ${itemTotal.toLocaleString("en-US")}
                    </p>

                    <button class="remove-btn"
                        onclick="removeProduct(${index})">

                        <i class="fa-solid fa-trash"></i>
                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    // Update Summary

    let totalItemsElement = document.getElementById("totalItems");
    let subtotalElement = document.getElementById("subtotal");
    let totalPriceElement = document.getElementById("totalPrice");

    if (totalItemsElement) {

        totalItemsElement.innerText = totalItems;

    }

    if (subtotalElement) {

        subtotalElement.innerText = "Rs. " + subtotal.toLocaleString("en-US");

    }

    if (totalPriceElement) {

        totalPriceElement.innerText = "Rs. " + subtotal.toLocaleString("en-US");

    }

    updateCartCount();

}


// ==========================
// INCREASE / DECREASE QUANTITY
// ==========================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity < 1) {

        cart[index].quantity = 1;

    }

    saveCart();

    displayCart();

}


// ==========================
// REMOVE PRODUCT
// ==========================

function removeProduct(index) {

    if (!cart[index]) return;

    let confirmRemove = confirm("Are you sure you want to remove this product?");

    if (confirmRemove) {

        cart.splice(index, 1);

        saveCart();

        displayCart();

    }

}


// ==========================
// CHECKOUT
// ==========================

function checkout() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

    } else {

        alert("Thank you for shopping with TechZone Electronics! Checkout functionality will be available soon.");

    }

}
// Show Success Message
function showSuccessMessage() {
    let message = document.getElementById("successMessage");

    if (message) {
        message.classList.add("show");

        setTimeout(function() {
            message.classList.remove("show");
        }, 2500);
    }
}

// ==========================
// LOAD CART WHEN PAGE OPENS
// ==========================

displayCart();

updateCartCount();

// ==========================
// CONTACT FORM
// ==========================

let contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get Form Values

        let name = document.getElementById("contactName").value;

        let email = document.getElementById("contactEmail").value;

        let subject = document.getElementById("contactSubject").value;

        let message = document.getElementById("contactMessage").value;


        // Check Empty Fields

        if (name.trim() === "" ||
            email.trim() === "" ||
            subject.trim() === "" ||
            message.trim() === "") {

            alert("Please fill all the fields!");

            return;

        }


        // Show Success Message

        let successMessage = document.getElementById("successMessage");

        successMessage.classList.add("show");


        // Clear Form

        contactForm.reset();


        // Hide Message After 4 Seconds

        setTimeout(function() {

            successMessage.classList.remove("show");

        }, 4000);

    });

}


// Close Success Message

function closeSuccessMessage() {

    let successMessage = document.getElementById("successMessage");

    if (successMessage) {

        successMessage.classList.remove("show");

    }

}
