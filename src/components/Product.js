/*
    This component is used to display the product details.
    It will display the product image, name, description, price, and a button to place an order.
*/
import {
    ETHEREUM_DECIMAL,
    ETHEREUM_SYMBOL,
    PLACE_ORDER_BUTTON,
} from "../constants";

// Product component
function Product(
    {
        product, // The product object
        placeOrder, // The function to place an order
    },
) {
    // Get the product details
    const {
        id, // The product ID
        name, // The product name
        description, // The product description
        price, // The product price
        image, // The product image
    } = product;

    // Get the price display by dividing the price by the Ethereum decimal
    const priceDisplay = Number(price) / ETHEREUM_DECIMAL;

    // Get the image name, replace the space with an underscore and convert it to lowercase
    // Example: change "image 1" to image_1
    const beautyImage = image.replace(/\s/g, "").toLowerCase();

    // Display the product details
    return (
        <div
            className="Product"
            key={id}
        >
            {/* Display the product image */}
            <img
                className="Product-image"
                src={`/images/${beautyImage}.jpg`}
                alt={name}
            />

            {/* Display the product information */}
            <div
                className="Product-info"
            >
                {/* Display the product name */}
                <div
                    className="Product-name"
                >
                    {name}
                </div>

                {/* Display the product description */}
                <p
                    className="Product-description"
                >
                    {description}

                </p>

                {/* Display the product price */}
                <p
                    className="Product-price"
                >
                    {priceDisplay} {ETHEREUM_SYMBOL}
                </p>

                {/* Display the place order button */}
                <button
                    onClick={() => placeOrder(id, price)}
                >
                    {PLACE_ORDER_BUTTON}
                </button>
            </div>
        </div>
    )
}

// Export the Product component
export default Product;