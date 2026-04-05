function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    if (window.location.href.includes("about.html")) {
        map();
    }
}

ActiveNav();

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

function addYear() {
    if (document.getElementById("copyYear") === null) { return }
    document.getElementById("copyYear").innerHTML = now.getFullYear() + " &copy; MonoMuse. All rights reserved.";
}

 // When the "Read Less" button is clicked
$("#readLess").click(function(){ 
    $("#not_here").hide(); // Hide the long introduction text
    $("#readLess").hide();  // Hide the "Read Less" button itself
    $("#readMore").show();  // Show the "Read More" button  
});

// When the "Read More" button is clicked
$("#readMore").click(function(){
    $("#not_here").show();  // Show the long introduction text
    $("#readLess").show();   // Show the "Read Less" button
    $("#readMore").hide();   // Hide the "Read More" button  
});

$("#buyNow").click(function(){ 
    $("#buyNow").hide();
    $("#purchase-panel").show();
});

function submitForm() {
    alert("Redirecting to payment system.");
}

function toggleMenu() {
    var navLinks = document.querySelectorAll(".nav_links");
    navLinks.forEach(nav => { nav.classList.toggle("active"); });
}

document.querySelectorAll(".nav_links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav_links").forEach(nav => {
            nav.classList.remove("active");
        });
    });
});

function map() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("Probably where we are located!").openPopup();
}

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