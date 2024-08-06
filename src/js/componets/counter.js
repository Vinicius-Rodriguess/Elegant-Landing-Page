const waitForMs = ms => new Promise(resolve => setTimeout(resolve, ms))

export const updateSpans = async () => {
    const spanStudents = document.querySelector(".span-students")
    const spanTeachers = document.querySelector(".span-teachers")
    const spanSchools = document.querySelector(".span-schools")
    const spanParents = document.querySelector(".span-parents")

    spanParents.innerHTML = 0
    spanSchools.innerHTML = 0
    spanTeachers.innerHTML = 0
    spanStudents.innerHTML = 0

    const n = new Intl.NumberFormat('pt-BR')
    const parseNumber = (str) => Number(str.replace(/\./g, ''))

    for (let i = 0; i < 100; i++) {
        spanParents.innerHTML = n.format(parseNumber(spanParents.innerHTML) + 501)
        spanSchools.innerHTML = n.format(parseNumber(spanSchools.innerHTML) + 13)
        spanTeachers.innerHTML = n.format(parseNumber(spanTeachers.innerHTML) + 452)
        spanStudents.innerHTML = n.format(parseNumber(spanStudents.innerHTML) + 1501)

        await waitForMs(i >= 70 ? 20 : 10)
    }
}
