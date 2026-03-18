var now = new Date();
var hour = now.getHours();

function greeting(x) {
    if (document.getElementById("greeting") === null) { return }

    if (x < 5 || x >= 20) { document.getElementById("greeting").innerHTML = "Good night"; }
    else if (x < 12) {document.getElementById("greeting").innerHTML = "Good morning";}
    else if (x < 18) {document.getElementById("greeting").innerHTML = "Good afternoon";}
    else {document.getElementById("greeting").innerHTML = "Good evening";}
}

function addYear() {
    if (document.getElementById("copyYear") === null) { return }
    document.getElementById("copyYear").innerHTML = now.getFullYear() + " &copy; MonoMuse. All rights reserved.";
}

greeting(hour);

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