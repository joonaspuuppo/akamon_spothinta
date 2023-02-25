import { Bar } from 'react-chartjs-2'
import 'chart.js/auto';
 

interface TransformedPriceDataType {
    price: number,
    time: string
}

const BarGraph = ({priceData, isVertical}: {priceData: Array<TransformedPriceDataType>, isVertical: Boolean}) => {
    
    const data = {
        labels: priceData.map(e => e.time),
        datasets: [{
            label: "Spot-hinta snt/kWh",
            data: priceData.map(e => e.price)
        }]
    }
    
    if (isVertical) {
        return (
            <div id="verticalPriceGraph">
                <Bar data={data} />
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