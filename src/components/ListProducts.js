import Product from "./Product";

export default function ListProducts({products, placeOrder, getProducts}) {
    return (
        <>
            {
                products.length === 0 ? (
                    <button onClick={getProducts}>Get Products</button>
                ) : (
                    <>
                        <h3>List Products</h3>
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