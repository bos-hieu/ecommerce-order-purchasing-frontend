export default function ({currentOrder, issueRefund, cancelOrder}) {
    return (
        <>
            {
                currentOrder.id !== "" && (
                    <div>
                        <h3>Current purchased order</h3>
                        <div>
                            <p>ID: <b>{currentOrder.id}</b></p>
                            <div>
                                {!currentOrder.refunded && <button onClick={() => issueRefund(currentOrder)}>Issue Refund</button>}
                                {(currentOrder.refunded && !currentOrder.cancelled) && <button onClick={() => cancelOrder(currentOrder)}>Cancel Order</button>}
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}