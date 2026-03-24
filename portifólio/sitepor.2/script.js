// MENU MOBILE

const menuToggle = document.createElement("div")
menuToggle.classList.add("menu-toggle")
menuToggle.innerHTML = "☰"

const navbar = document.querySelector(".navbar")
const menu = document.querySelector(".menu")

navbar.insertBefore(menuToggle, menu)

menuToggle.addEventListener("click", () => {

menu.classList.toggle("active")

})



// SCROLL SUAVE

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
})

})

})



// NAVBAR EFEITO AO ROLAR

window.addEventListener("scroll", () => {

const header = document.querySelector("header")

if(window.scrollY > 50){

header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)"

}else{

header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)"

}

})



// ANIMAÇÃO AO SCROLL

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1"
entry.target.style.transform = "translateY(0)"

}

})

})

document.querySelectorAll(".tratamento, .depoimento, .sobre-texto, .sobre-imagem")
.forEach(el => {

el.style.opacity = "0"
el.style.transform = "translateY(40px)"
el.style.transition = "all 0.6s ease"

observer.observe(el)

})



// BOTÃO PULSANDO (AGENDAR)

const botao = document.querySelector(".btn-primary")

setInterval(() => {

botao.style.transform = "scale(1.06)"

setTimeout(()=>{

botao.style.transform = "scale(1)"

},300)

},4000)