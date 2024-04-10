/*
 This component is responsible for listing the products.
 It will display a button to get the products from the smart contract if the products have not been get yet.
 If the products have been get, it will display the products and a button to place an order.
 */
import Product from "./Product";
import {
    GET_PRODUCTS_BUTTON,
    LIST_PRODUCTS_TITLE,
    LIST_PRODUCT_DESCRIPTION,
} from "../constants";

// ListProducts component
function ListProducts(
    {
        products, // The list of products
        placeOrder, // The function to place an order
        getProducts, // The function to get the products
        currentOrder, // The current order object
    },
) {
    // Check if the order have not been placed
    const orderHaveNotBeenPlaced = currentOrder.id === "";

    // listProductsHaveNotBeenGet Check if the products have not been get from the smart contract.
    const listProductsHaveNotBeenGet = products.length === 0;

    // If the products have not been get, show the button to get the products
    if (listProductsHaveNotBeenGet) {
        return (
            <button
                onClick={getProducts}
            >
                {GET_PRODUCTS_BUTTON}
            </button>
        )
    }

    // Display the list of products
    return (
        <>
            {/* Display the list of products title */}
            <h3>
                {LIST_PRODUCTS_TITLE}
            </h3>

            {/* If the order have not been placed, show the list product description */}
            {
                orderHaveNotBeenPlaced && (
                    <p
                        dangerouslySetInnerHTML={
                            {
                                __html: LIST_PRODUCT_DESCRIPTION,
                            }
                        }
                    />
                )
            }

            {/* Display the list of products */}
            <div
                className="ListProducts"
            >
                {
                    products.map(
                        (product) => (
                            <Product
                                product={product}
                                key={product.id}
                                placeOrder={placeOrder}
                            />
                        )
                    )
                }
            </div>
        </>
    )
}

// Export the ListProducts component
export default ListProducts;