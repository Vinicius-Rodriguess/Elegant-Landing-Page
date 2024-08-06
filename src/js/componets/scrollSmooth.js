export const scrollSmooth = {
    friction: 0.01, // Ajuste para controle da suavidade
    deltaSteps: 100, // Ajuste para o fator de deslocamento ao usar a roda de rolagem
    scrollwheel: false, // Indicador se a roda de rolagem está sendo usada
    viewY: window.scrollY, // Posição atual da rolagem
    scrollToY: window.scrollY, // Posição alvo da rolagem

    // Função de animação que é chamada em cada quadro
    onAnimationFrame() {
        scrollSmooth.viewY += (scrollSmooth.scrollToY - scrollSmooth.viewY) * scrollSmooth.friction
        window.scrollTo(window.scrollX, Math.round(scrollSmooth.viewY))

        if (Math.abs(scrollSmooth.scrollToY - scrollSmooth.viewY) > 1) { // Continua a animação se ainda não chegou ao destino
            requestAnimationFrame(scrollSmooth.onAnimationFrame)
        } else {
            window.scrollTo(window.scrollX, scrollSmooth.scrollToY) // Garante que a rolagem chegue ao destino
            scrollSmooth.scrollwheel = false
        }
    },

    // Função que lida com o evento da roda de rolagem
    onMouseWheel(e) {
        const deltaFactor = e.deltaY * scrollSmooth.deltaSteps / 100
        scrollSmooth.scrollwheel = true
        scrollSmooth.scrollToY += deltaFactor

        // Limita o valor de scrollToY para evitar rolagem fora dos limites
        scrollSmooth.scrollToY = Math.max(0, Math.min(
            scrollSmooth.scrollToY,
            document.documentElement.scrollHeight - window.innerHeight
        ))

        requestAnimationFrame(scrollSmooth.onAnimationFrame)
        e.preventDefault()
    },

    onScroll() {
        if (scrollSmooth.scrollwheel) return
        scrollSmooth.scrollToY = window.scrollY
        scrollSmooth.viewY = window.scrollY
    },

    onAnchor(anchor) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault()
            scrollSmooth.scrollwheel = true
            const target = document.querySelector(anchor.getAttribute("href"))
            const targetPosition = target.getBoundingClientRect().top + window.scrollY
            scrollSmooth.scrollToY = targetPosition
            requestAnimationFrame(scrollSmooth.onAnimationFrame)
        })
    },

    isMobile() {
        return window.innerWidth <= 768
    },

    init() {
        if (scrollSmooth.isMobile()) {
            document.documentElement.style.scrollBehavior = "smooth"          
            return
        }

        document.documentElement.style.scrollBehavior = "initial"          
        window.smoothMousewheel = true
        window.addEventListener('wheel', scrollSmooth.onMouseWheel, { passive: false })
        window.addEventListener('scroll', scrollSmooth.onScroll)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => scrollSmooth.onAnchor(anchor))
    }
}