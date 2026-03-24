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

    anchor.addEventListener("click", function (e) {

        e.preventDefault()

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
            behavior: "smooth"
        })

    })

})



// NAVBAR EFEITO SCROLL

window.addEventListener("scroll", () => {

    const header = document.querySelector("header")

    if(window.scrollY > 50){

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)"
        header.style.background = "#ffffff"

    } else {

        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"

    }

})



// ANIMAÇÃO AO SCROLL

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show")

        }

    })

})

document.querySelectorAll(".card, .depoimento, .sobre-text, .sobre-img")
.forEach(el => observer.observe(el))



// BOTÃO WHATSAPP PULSANDO

const whatsappBtn = document.querySelector(".btn-primary")

setInterval(() => {

    whatsappBtn.style.transform = "scale(1.05)"

    setTimeout(() => {
        whatsappBtn.style.transform = "scale(1)"
    },300)

},4000)