export default function Product({product, placeOrder}) {
    const {id, name, description, price, image} = product
    const ethDecimal = 1e18;
    const priceDisplay = price / ethDecimal;
    // change "image 1" to image_1
    const beautyImage = image.replace(/\s/g, "").toLowerCase();

    return (
        <div
            className="max-w-[250px] rounded overflow-hidden shadow-lg"
            key={id}
        >
            <img
                className="w-full"
                width={250}
                height={250}
                // objectFit="cover"
                // %20 is a space
                src={`/images/${beautyImage}.jpg`}
                alt={name}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <p className="text-gray-900 text-xl">{priceDisplay} ETH</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => placeOrder(id, price)}
                >
                    Place Order
                </button>
            </div>
            <div className="px-6 pt-4 pb-2">
            </div>
        </div>
    )
}