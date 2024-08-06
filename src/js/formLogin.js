import { updatePosition } from "./componets/stalker.js"

const btnTogglePassword = document.querySelector(".btn-toggle-password")
const inputPassword = document.querySelector("#password")

btnTogglePassword.addEventListener("click", () => {
    btnTogglePassword.classList.toggle("bi-eye")
    btnTogglePassword.classList.toggle("bi-eye-slash")

    inputPassword.getAttribute("type") === "password"
        ? inputPassword.setAttribute("type", "text")
        : inputPassword.setAttribute("type", "password")
})

const snowContainer = document.querySelector('.snow-container')
const numFlakes = 100

for (let i = 0; i < numFlakes; i++) {
    const flake = document.createElement('div')
    flake.classList.add('snowflake')
    flake.textContent = '❄'
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = Math.random() * 3 + 2 + 's'
    flake.style.opacity = Math.random()
    flake.style.fontSize = Math.random() * 10 + 10 + 'px'

    snowContainer.appendChild(flake)
}

document.addEventListener('mousemove', (e) => updatePosition(e))