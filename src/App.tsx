import React from 'react'
import { useState, useEffect } from 'react'
import BarGraph from './components/BarGraph'
import PriceDisplay from './components/PriceDisplay'

function App() {
  const [priceData, setPriceData] = useState([])
  const [lowestPrice, setLowestPrice] = useState({price: 0, time: "00:00"})
  const [highestPrice, setHighestPrice] = useState({price: 0, time: "00:00"})
  const [avgPrice, setAvgPrice] = useState(0)

  useEffect( () => {
    fetch("./spot-data.json")
    .then(res => res.json())
    .then(data => {
      setPriceData(data)
      console.log(data)
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <h1>Spot-hinta</h1>
      <div id="priceDisplays">
        <PriceDisplay description="Halvin tunti" time={lowestPrice.time} price={lowestPrice.price} />
        <PriceDisplay description="Kallein tunti" time={highestPrice.time} price={highestPrice.price} />
        <PriceDisplay description="Keskiarvo" price={avgPrice} />
      </div>
      <BarGraph />
    </div>
  )
}

export default App
