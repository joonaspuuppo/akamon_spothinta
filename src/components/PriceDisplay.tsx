interface PriceDisplayProps {
    description: string,
    time?: string,
    price: number
}

const PriceDisplay = ({description, time, price}: PriceDisplayProps) => {

    return (
        <div className="priceDisplay">
            <p className="priceDisplayDescription">{description} {time}</p>
            <p className="priceDisplayPrice">{price} snt/kWh</p>
        </div>
    )
}

export default PriceDisplay