const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")
const currencySelectToConverty = document.querySelector(".currency-select-to-converty")

async function convertValues() {
    const inputCurrencyValue = Number(document.querySelector(".input-currency").value)

    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueToConverted = document.querySelector(".currency-value")

    try {
        const response = await fetch(
            "https://api.frankfurter.dev/v2/rates?base=USD&quotes=BRL,EUR,GBP"
        )

        if (!response.ok) {
            throw new Error("Não foi possível buscar as cotações")
        }

        const data = await response.json()

        const rates = {}

        data.forEach(item => {
            rates[item.quote] = item.rate
        })

        const currencyRates = {
            real: 1,
            dolar: rates.BRL,
            euro: rates.BRL / rates.EUR,
            libra: rates.BRL / rates.GBP
        }

        const currencyNames = {
            real: { locale: "pt-BR", currency: "BRL" },
            dolar: { locale: "en-US", currency: "USD" },
            euro: { locale: "de-DE", currency: "EUR" },
            libra: { locale: "en-GB", currency: "GBP" }
        }

        const from = currencySelectToConverty.value
        const to = currencySelect.value

        
        const valueInReal = inputCurrencyValue * currencyRates[from]
        const convertedValue = valueInReal / currencyRates[to]

        const formatFrom = currencyNames[from]
        const formatTo = currencyNames[to]

        currencyValueToConvert.innerHTML = new Intl.NumberFormat(formatFrom.locale, {
            style: "currency",
            currency: formatFrom.currency
        }).format(inputCurrencyValue)

        currencyValueToConverted.innerHTML = new Intl.NumberFormat(formatTo.locale, {
            style: "currency",
            currency: formatTo.currency
        }).format(convertedValue)

    } catch (error) {
        console.log(error)
        alert("Erro ao buscar as cotações. Tente novamente.")
    }
}

function changeCurrencyToConvert() {
    const currencyName = document.getElementById("currency-name-to-convert")
    const currencyImage = document.querySelector(".currency-img-to-convert")

    if (currencySelectToConverty.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"
    }

    if (currencySelectToConverty.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelectToConverty.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra 1.png"
    }

    if (currencySelectToConverty.value == "real") {
        currencyName.innerHTML = "Real"
        currencyImage.src = "./assets/brasil 2.png"
    }
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra 1.png"
    }

    if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real"
        currencyImage.src = "./assets/brasil 2.png"
    }
}

currencySelectToConverty.addEventListener("change", changeCurrencyToConvert)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
currencySelectToConverty.addEventListener("change", convertValues)
currencySelect.addEventListener("change", convertValues)