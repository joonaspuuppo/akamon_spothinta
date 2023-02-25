import { Bar } from 'react-chartjs-2'
import 'chart.js/auto';
 

interface TransformedPriceDataType {
    price: number,
    time: string
}

const BarGraph = ({priceData, isVertical, lowestPrice, highestPrice}: 
    {priceData: Array<TransformedPriceDataType>, 
     isVertical: Boolean,
     lowestPrice: number,
     highestPrice: number}) => {
    
    const data = {
        labels: priceData.map(e => e.time),
        datasets: [{
            label: "Spot-hinta snt/kWh",
            backgroundColor: priceData.map(e => {
                if (e.price === lowestPrice) {
                    return "lightgreen"
                } else if (e.price === highestPrice) {
                    return "salmon"
                } else return "lightblue"
            } ),
            borderRadius: 5,
            data: priceData.map(e => e.price)
        }]
    }
    
    if (isVertical) {
        return (
            <div id="verticalPriceGraph">
                <Bar data={data} options={{
                    maintainAspectRatio: false
                    }} />
            </div>
        )
    } else {
        return (
            <div id="horizontalPriceGraph">
                <Bar data={data} options={{
                    indexAxis: "y" as const,
                    maintainAspectRatio: false
                    }} />
            </div>
        )
    }
    
}

export default BarGraph