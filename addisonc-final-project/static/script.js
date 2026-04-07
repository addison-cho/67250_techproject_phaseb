/* Navigation */

// Navigation bar links
function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    
    // CSS for the active page link
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Load map behavior if on the About Page
    if (window.location.href.includes("about.html")) {
        map();
    }

    // Add eventListeners for invalid form fields if on the Tickets Page
    if (window.location.href.includes("tickets.html")) {
        document.getElementById('name').addEventListener('change', checkName);
        document.getElementById('email').addEventListener('change', checkEmail);
        document.getElementById('date').addEventListener('change', checkDate);
        document.getElementById('number').addEventListener('change', checkZip);
    }
}

// Menu behavior (mobile-only)
function toggleMenu() {
    var navLinks = document.querySelectorAll(".nav_links");
    navLinks.forEach(nav => { nav.classList.toggle("active"); });
}

// Ensures no incorrect "active" links
document.querySelectorAll(".nav_links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav_links").forEach(nav => {
            nav.classList.remove("active");
        });
    });
});

ActiveNav();

/* Home Page */

// Get current time for time-based greeting
var now = new Date();
var hour = now.getHours();

function greeting(x) {
    if (document.getElementById("greeting") === null) { return }

    if (x < 5 || x >= 20) { document.getElementById("greeting").innerHTML = "Good night"; }
    else if (x < 12) {document.getElementById("greeting").innerHTML = "Good morning";}
    else if (x < 18) {document.getElementById("greeting").innerHTML = "Good afternoon";}
    else {document.getElementById("greeting").innerHTML = "Good evening";}
}

greeting(hour);

// Paragraphs buttons to see more / hide excess text using jQuery
$("#readLess").click(function(){ 
    $("#not_here").hide();
    $("#readLess").hide();
    $("#readMore").show();  
});

$("#readMore").click(function(){
    $("#not_here").show();
    $("#readLess").show();
    $("#readMore").hide();  
});

// About Page

// Map behavior (Leaflet API)
function map() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("Probably where we are located!").openPopup();
}

// Slideshow and its controls (uses indexing)
var currentSlide = 0;
function changeSlide(x) {
    var slides = document.querySelectorAll("#slides img");
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + x + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
}

/* Buy Tickets Page */

// Calculates total cost from ticket quantity per ticket type
function getTotal() {
    var general = document.getElementById("ticketq-general").value;
    var member = document.getElementById("ticketq-member").value;
    var student = document.getElementById("ticketq-student").value;

    // Separate options for different ticket types in case of future price changes
    return (general * 18) + (member * 18) + (student * 18);
}

// Updates the total cost shown in html and stored
function updateTotal() {
    var cost = getTotal(); 

    document.getElementById('total').innerHTML = '$' + cost;

    // Reference for line below: https://stackoverflow.com/questions/23476732/set-javascript-global-variables-across-multiple-pages
    localStorage.setItem("totalCost", cost)
}

// Adds eventListener to all ticket quantity dropdown inputs so total cost is up-to-date
document.querySelectorAll('.ticketq').forEach(select => {
    select.addEventListener('change', () => {
        updateTotal();
    });
});

// Shows final step of the checkout process: personal information
$("#buyNow").click(function() { 
    // if cost is 0, alert and stop user from continuing
    var total = getTotal();
    
    if (total === 0) {
        alert("Please select at least one ticket.");
        return;
    }

    $("#buyNow").hide();
    $("#purchase-panel").show();
});

/* Checks form input validity; adds red border if invalid input. */

// Checks if name input is empty
function checkName() {
    var name = document.getElementById("name");

    if (name.value === "") {
        name.classList.add("invalid");
        return false;
    }

    name.classList.remove("invalid");
    return true;
}

// Checks if email input is empty or contains built-in psuedo-class invalid (incorrect format)
function checkEmail() {
    var email = document.getElementById("email");

    if (email.value === "" || !email.checkValidity()
    ) {
        email.classList.add("invalid"); return false;
    }

    email.classList.remove("invalid");
    return true;
}

// Checks if date input is empty or in the past
function checkDate() {
    var date = document.getElementById("date");

    if (date.value === "" || (new Date(date.value) <= new Date())) {
        date.classList.add("invalid");
        return false;
    }

    date.classList.remove("invalid");
    return true;
}

// Checks if number code input is empty (which is ok)
// If not empty, checks if the element contains built-in psuedo-class invalid (incorrect number range; not 5 digits)
function checkZip() {
    var zip = document.getElementById("number");
    if (zip.value !== "" && !zip.checkValidity()) {
        zip.classList.add("invalid");
        return false;
    }    

    zip.classList.remove("invalid");
    return true;
}

// Checks validity and if everything is alright, submits "form" and sends to purchase confirmation page.
function submitForm() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var date = document.getElementById("date");
    var zip = document.getElementById("number");

    if (getTotal() === 0){
        alert("Please select at least one ticket.");
        return;
    }

    if (!checkName(name)) {
        alert('Please enter your name.');
        return;
    }

    if (!checkEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!checkDate(date)) {
        alert('Please select a valid date.');
        return;
    }

    if (!checkZip(zip)) {
        alert('Please enter a valid zip code.');
        return;
    }

    alert("Redirecting to payment system.");
    window.location.href = "tickets-conf.html";
}

// Shows total cost (from the global variable) if on the ticket confirmation page
function showCost() {
    if (!window.location.href.includes("tickets-conf.html")) { return; }
    if (localStorage.getItem("totalCost") === null) { return; }

    document.getElementById("cost-confirmation").innerHTML = "Your total is $" + localStorage.getItem("totalCost");
}

window.onload = showCost();

/* Footer */

// Adds current year to copyright statement in the footer
function addYear() {
    if (document.getElementById("copyYear") === null) { return; }
    document.getElementById("copyYear").innerHTML = now.getFullYear() + " &copy; MonoMuse. All rights reserved.";
}

addYear();

// Inactive Code for Increment 3

// $("#hamburg").click(function(){ 
//     $("#seeNav").hide();
//     $("#hideNav").show();

//     $("#hamburg").hide();
//     $("#navLinks").show();
// });

// $("#hideNav").click(function(){ 
//     $("#hideNav").hide();
//     $("#seeNav").show();

//     $("#navLinks").hide();
//     $("#hamburg").show();
// });

// // Variable Declarations and Console Output
// var x = 5, y = 7;
// var z = x + y;
// console.log(z);

// // Create a Basic Function
// A = "Hello "; 
// B = "World!";    
// var C = A + B;
// console.log(C);

// function sumnPrint(x1, x2) {
//     console.log(x1 + x2);
// }

// sumnPrint(x, y);
// sumnPrint(A, B);

// // Add a Conditional Statement
// if (C.length > z) {
//     console.log(C);
    
//     if (C.length < z) {
//         console.log(z);
//     }
// }
// else {
//     console.log("good job!");
// }

// // Arrays + Loops (Alerts)
// L1 = ["Watermelon","Pineapple","Pear","Banana"];
// L2 = ["Apple","Banana","Kiwi","Orange"];

// function findTheBanana(x) {
//     for (let i = 0; i < x.length; i++) {
//         if (x[i] === "Banana") {
//             alert("Banana");
//         }
//     }
// }

// findTheBanana(L1);
// findTheBanana(L2);

// function findTheBanana2(x) {
//     x.forEach(element => {
//         if (element === "Banana") {
//             alert("Banana");
//         }
//     });
// }

// findTheBanana2(L1);
// findTheBanana2(L2);

