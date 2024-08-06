import { dictionary } from "./dictionary.js"
import { language } from "../main.js"

const waitForMs = ms => new Promise(resolve => setTimeout(resolve, ms))

export const writeAndEraseAlternating = async () => {
    const Phrases = ['yourIndustry', 'yourSales', 'yourSchool', 'yourServices', 'yourCustomerService', 'yourClinic', 'yourWholeLife', 'yourOffice']
    const element = document.querySelector('#dynamic-text')

    while (true) {
        for (const sentence of Phrases) {
            const translatedSentence = dictionary.translate(sentence, language)

            for (let i = 0; i <= translatedSentence.length; i++) {
                element.innerHTML = translatedSentence.slice(0, i)
                await waitForMs(50)
            }
            await waitForMs(1000)

            for (let i = translatedSentence.length; i >= 0; i--) {
                element.innerHTML = translatedSentence.slice(0, i)
                await waitForMs(25)
            }
            await waitForMs(500)
        }
    }
}