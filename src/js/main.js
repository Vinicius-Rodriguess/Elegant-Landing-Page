import { writeAndEraseAlternating } from "./componets/writer.js"
import { updateSpans } from "./componets/counter.js"
import { dictionary } from "./componets/dictionary.js"
import { form } from "./componets/form.js"
import { updatePosition } from "./componets/stalker.js"
import { scrollSmooth } from "./componets/scrollSmooth.js"

export let language = 1

const translatePage = () => {
    const elements = document.querySelectorAll("[translate]")
    elements.forEach(word =>{
        const translate = dictionary.translate(word.getAttribute("translate"), language)

        word.tagName === "TEXTAREA" 
        ? word.placeholder = translate 
        : word.innerText = translate
    })
}

translatePage()
writeAndEraseAlternating()

let prevScrollPos2 = window.scrollY
const navbar = document.querySelector('.cont-navbar')
const btnNavbar = document.querySelector('.btn-list-navbar')
const secondNavbar = document.querySelector('.const-second-navbar')

window.onscroll = () => {
    if (prevScrollPos2 > window.scrollY) {
        navbar.classList.add('height-4rem')
    } else {
        navbar.classList.remove('height-4rem')
        secondNavbar.classList.remove('height-20rem')
        btnNavbar.classList.add('bi-list')
        btnNavbar.classList.remove('bi-x-lg')
        btnNavbar.classList.remove('icon-rotate')
    }

    if (window.scrollY === 0) 
        navbar.classList.add('height-4rem')
    
    prevScrollPos2 = window.scrollY
}

btnNavbar.addEventListener('click', () => {
    secondNavbar.classList.toggle('height-20rem')
    btnNavbar.classList.toggle('bi-list')
    btnNavbar.classList.toggle('bi-x-lg')
    btnNavbar.classList.toggle('icon-rotate')
})

const obsOptions = { rootMargin: '-60px' }
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add(`animate-${entry.target.dataset.animate}`)
            if (entry.target.classList.contains("span-counter")) updateSpans()
            if (entry.target.classList.contains("footer")) {
                elAnimations.forEach(el => {
                    el.classList.remove("animate-right")
                    el.classList.remove("animate-left")
                    el.classList.remove("animate-top")
                    el.classList.remove("animate-bottom")
                })    
            }
        } 
    })
}, obsOptions)

const elAnimations = document.querySelectorAll('[data-animate]')
elAnimations.forEach(el => observer.observe(el))

const inputSetLanguages = document.querySelector("#input-set-language")
inputSetLanguages.addEventListener("input", (e) => toogleLanguage(e.target.value))

const toogleLanguage = (newLanguage) => {
    if (language === newLanguage) return

    language = newLanguage
    translatePage()

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

document.addEventListener('mousemove', (e) => updatePosition(e))
scrollSmooth.init()