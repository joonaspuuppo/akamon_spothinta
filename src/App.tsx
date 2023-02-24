import React from 'react'
import { useState, useEffect } from 'react'
import BarGraph from './components/BarGraph'
import PriceDisplay from './components/PriceDisplay'
import transformPrice from './utils/price'

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

  useEffect( () => {  

    // On page load: fetch price data, extract price and time, calculate min & max & avg prices.
    fetch("./spot-data.json")
    .then(res => res.json())
    .then(data => {
      const transformedData = handlePriceData(data)
      setPriceData(transformedData)
      calculateMinMaxAvg(transformedData)
    })
    .catch(error => console.log(error))

    const handlePriceData = (priceData: Array<PriceDataElementType>) => {
      const prices = priceData.map(elem => elem.price)
      
      // MWh to kWh, eur to snt, add tax 10 %
      const transformedPrices = prices.map(price => transformPrice(price))

      // getting HH:MM from timestamp
      const times = priceData.map(elem => elem.timestamp.substring(11, 16))

      const transformedData = transformedPrices.map((price, i) => ({price, time: times[i]}))
      
      return transformedData
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

  return (
    <div className="App">
      <h1>Spot-hinta</h1>
      <div id="priceDisplays">
        <PriceDisplay description="Halvin tunti" time={lowestPrice.time} price={lowestPrice.price} />
        <PriceDisplay description="Kallein tunti" time={highestPrice.time} price={highestPrice.price} />
        <PriceDisplay description="Keskiarvo" price={avgPrice} />
      </div>
      <BarGraph priceData={priceData} />
    </div>
  )
}

export default App
