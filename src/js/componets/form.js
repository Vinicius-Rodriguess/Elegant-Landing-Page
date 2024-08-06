export const form = document.querySelector('#contactForm')
const formMenssage = document.querySelector('.form-message')
const contactBtn = document.querySelector("#contactBtn")

form.phone.addEventListener('input', e => e.target.value = mtel(e.target.value))

const mtel = (v) => {
    v = v.replace(/\D/g, '')
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
    v = v.replace(/(\d)(\d{4})$/, '$1-$2')
    return v
}

document.querySelector('#contactBtn').addEventListener('click', async () => {
    if (form.name.value.length < 3) {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'Nome invalido.'
        form.name.focus()
        return
    }
    if (!checkEmail(form.email)) {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'E-mail invalido.'
        form.email.focus()
        return
    }
    if (form.phone.value.length < 14) {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'Celular invalido.'
        form.phone.focus()
        return
    }
    if (form.message.value.length < 3) {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'Mensagem invalido.'
        form.message.focus()
        return
    }

    const payload = {
        nome: form.name.value,
        email: form.email.value,
        celular: form.phone.value,
        mensagem: form.message.value,
    }

    const controller = new AbortController()
    const signal = controller.signal
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const data = await fetch(`awds`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal
    }).catch(() => {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'Ops!, ocorreu um erro. Por favor, tente mais tarde.'
        contactBtn.classList.add("error")
        contactBtn.classList.remove("valid")
    })

    const obj = await data.json()
    if (obj.success) {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = 'Obrigado! Nossos especialistas entrarão em contato.'
        contactBtn.classList.add("valid")
        contactBtn.classList.remove("error")
        form.reset()
    } else {
        formMenssage.classList.remove('hide')
        formMenssage.innerHTML = obj.msg
    }
})

const checkEmail = field => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value)) return true
    return false
}