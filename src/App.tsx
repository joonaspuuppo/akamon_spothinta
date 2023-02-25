import React from 'react'
import { useState, useEffect } from 'react'
import BarGraph from './components/BarGraph'
import PriceDisplay from './components/PriceDisplay'

function App() {

  interface PriceDataElementType {
    timestamp: string,
    price: number,
    deliveryArea: string,
    unit: string
  }

  interface TransformedPriceDataType {
    price: number,
    time: string
  }

  const [priceData, setPriceData] = useState<Array<TransformedPriceDataType>>([])
  const [lowestPrice, setLowestPrice] = useState({price: 0, time: "00:00"})
  const [highestPrice, setHighestPrice] = useState({price: 0, time: "00:00"})
  const [avgPrice, setAvgPrice] = useState(0)
  const [date, setDate] = useState("")

  useEffect( () => {  

    // On page load: fetch price data, extract price and time, calculate min & max & avg prices.
    fetch("./spot-data.json")
    .then(res => res.json())
    .then(data => {
      setDate(new Date(data[0].timestamp).toLocaleDateString("fi-FI"))
      const transformedData = handlePriceData(data)
      setPriceData(transformedData)
      calculateMinMaxAvg(transformedData)
    })
    .catch(error => console.log(error))

    const handlePriceData = (priceData: Array<PriceDataElementType>) => {
      const prices = priceData.map(elem => elem.price)
      
      // MWh to kWh, eur to snt, add 10 % tax
      const transformedPrices = prices.map(price => transformPrice(price))

      // getting HH.MM from timestamp
      const times = priceData.map(elem => {
        return new Date(elem.timestamp)
        .toLocaleTimeString("fi-FI")
        .slice(0, -3) // remove minutes
        .padStart(5, "0") // add a leading zero if needed
      })

      // creating new array of {price, time} objects
      const transformedData = transformedPrices.map((price, i) => ({price, time: times[i]}))
      
      // returning data sorted in chronological order
      return transformedData.sort((a, b) => (a.time > b.time) ? 1 : -1)
    }

    const transformPrice = (price: number) => {
      const pricePerkWh = price / 1000
      const priceInCents = pricePerkWh * 100
      const priceWithTax = priceInCents * 1.1
      return parseFloat(priceWithTax.toFixed(2))
    }

    const calculateMinMaxAvg = (priceData: Array<TransformedPriceDataType>) => {
      // sorting price data to get min and max prices
      const sortedPriceData = [...priceData].sort((a, b) => (a.price > b.price) ? 1 : -1)
      setLowestPrice(sortedPriceData[0])
      setHighestPrice(sortedPriceData[sortedPriceData.length - 1])

      // calculating average price
      const sumOfPrices = sortedPriceData.reduce((partialSum, a) => partialSum + a.price, 0)
      setAvgPrice(parseFloat((sumOfPrices / sortedPriceData.length).toFixed(2)))
    }
  }, [])

  if (priceData.length > 0) {
    return (
      <div className="App">
        <h1>Sähkön spot-hinta {date} </h1>
        <div id="priceDisplays">
          <PriceDisplay description="Halvin tunti" time={lowestPrice.time} price={lowestPrice.price} />
          <PriceDisplay description="Kallein tunti" time={highestPrice.time} price={highestPrice.price} />
          <PriceDisplay description="Keskiarvo" price={avgPrice} />
        </div>
        {/* Vertical bar graph for desktop, horizontal for mobile */}
        <BarGraph priceData={priceData} isVertical={true} lowestPrice={lowestPrice.price} highestPrice={highestPrice.price} />
        <BarGraph priceData={priceData} isVertical={false} lowestPrice={lowestPrice.price} highestPrice={highestPrice.price} />
      </div>
    )
  } else {
    return (
      <div className="App">
        <p>Spot-hintadataa ei saatavilla.</p>
      </div>
    )
  }

}

export default App
