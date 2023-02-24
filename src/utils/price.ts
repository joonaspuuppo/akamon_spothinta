const transformPrice = (price: number) => {
    const pricePerkWh = price / 1000
    const priceinCents = pricePerkWh * 100
    const priceWithTax = priceinCents * 1.1
    return parseFloat(priceWithTax.toFixed(2))
}


export default transformPrice