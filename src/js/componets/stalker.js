export const updatePosition = (e) => {
    const divStalker = document.querySelector('#stalker')
    const estilo = window.getComputedStyle(e.target)
    const cursor = estilo.getPropertyValue('cursor')

    if (cursor !== 'auto') {
        divStalker.style.width = `20px`
        divStalker.style.top = `${e.pageY}px`
        divStalker.style.left = `${e.pageX}px`
    } else {
        divStalker.style.width = `55px`
        divStalker.style.top = `${e.pageY}px`
        divStalker.style.left = `${e.pageX}px`
    }
}