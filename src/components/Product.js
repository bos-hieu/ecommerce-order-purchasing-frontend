import {
    ETHEREUM_DECIMAL,
    ETHEREUM_SYMBOL,
    PLACE_ORDER_BUTTON,
} from "../constants";

export default function Product({product, placeOrder}) {
    const {id, name, description, price, image} = product
    const priceDisplay = price / ETHEREUM_DECIMAL;
    // change "image 1" to image_1
    const beautyImage = image.replace(/\s/g, "").toLowerCase();

    return (
        <div
            className="Product"
            key={id}
        >
            <img
                className="Product-image"
                src={`/images/${beautyImage}.jpg`}
                alt={name}
            />
            <div className="Product-info">
                <div className="Product-name">{name}</div>
                <p className="Product-description">{description}</p>
                <p className="Product-price">{priceDisplay} {ETHEREUM_SYMBOL}</p>
                <button
                    onClick={() => placeOrder(id, price)}
                >
                    {PLACE_ORDER_BUTTON}
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}