export default function Product({product, placeOrder}) {
    const {id, name, description, price, image} = product
    const ethDecimal = 1e18;
    const priceDisplay = price / ethDecimal;
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
                <p className="Product-price">{priceDisplay} ETH</p>
                <button
                    onClick={() => placeOrder(id, price)}
                >
                    Place Order
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}