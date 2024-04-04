export default function Product({product, placeOrder}) {
    const {id, name, description, price, image} = product
    const ethDecimal = 1e18;
    const priceDisplay = price / ethDecimal;
    // change "image 1" to image_1
    const beautyImage = image.replace(/\s/g, "").toLowerCase();

    return (
        <div
            key={id}
        >
            <img
                width={250}
                height={250}
                // objectFit="cover"
                // %20 is a space
                src={`/images/${beautyImage}.jpg`}
                alt={name}
            />
            <div>
                <div>{name}</div>
                <p>{description}</p>
                <p>{priceDisplay} ETH</p>
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