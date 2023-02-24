import { Bar } from 'react-chartjs-2'
import 'chart.js/auto';
 

interface TransformedPriceDataType {
    price: number,
    time: string
}

const BarGraph = ({priceData}: {priceData: Array<TransformedPriceDataType>}) => {
    const data = {
        labels: priceData.map(e => e.time),
        datasets: [{
            label: "Spot-hinta snt/kWh",
            data: priceData.map(e => e.price)
        }]
    }

    return (
        <div id="priceGraph">
            <Bar data={data} />
        </div>
    )
}

export default BarGraph