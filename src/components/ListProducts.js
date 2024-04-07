import Product from "./Product";
import {
    GET_PRODUCTS_BUTTON,
    LIST_PRODUCTS_TITLE,
    LIST_PRODUCT_DESCRIPTION,
} from "../constants";

export default function ListProducts({products, placeOrder, getProducts, currentOrder}) {
    // Check if the order have not been placed
    const orderHaveNotBeenPlaced = currentOrder.id === "";

    // listProductsHaveNotBeenGet Check if the products have not been get from the smart contract.
    const listProductsHaveNotBeenGet = products.length === 0;

    return (
        <>
            {
                listProductsHaveNotBeenGet ? (
                    <button onClick={getProducts}>{GET_PRODUCTS_BUTTON}</button>
                ) : (
                    <>
                        <h3>{LIST_PRODUCTS_TITLE}</h3>
                        {
                            orderHaveNotBeenPlaced && (
                                <p dangerouslySetInnerHTML={
                                    {__html: LIST_PRODUCT_DESCRIPTION}
                                }/>
                            )
                        }
                        <div className="ListProducts">
                            {products.map((product) => (
                                <Product
                                    product={product}
                                    key={product.id}
                                    placeOrder={placeOrder}
                                />
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}