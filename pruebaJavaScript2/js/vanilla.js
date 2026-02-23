const paragrafById = document.getElementById("paragraf");
const paragrafByTag = document.getElementsByTagName("p");
const paragrafByClass = document.getElementsByClassName("colorBlau");
const querySelector = document.querySelector("p");
const querySelectorAll = document.querySelectorAll(".colorBlau");

console.log("getElementById", paragrafById.innerText);
console.log("getElementsByTagName:", paragrafByTag[0].innerText);