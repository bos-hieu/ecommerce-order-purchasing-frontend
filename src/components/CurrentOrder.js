import {
    CANCEL_ORDER_BUTTON,
    CANCEL_ORDER_DESCRIPTION,
    CANCELLED_DESCRIPTION,
    CURRENT_ORDER_TITLE,
    ISSUE_REFUND_BUTTON,
    ISSUE_REFUND_DESCRIPTION,
} from "../constants";

export default function ({currentOrder, issueRefund, cancelOrder}) {
    // Check if the order have been placed
    const orderHaveBeenPlaced = currentOrder.id !== "";

    // If the order is not refunded, show the refund button
    const canShowRefundButton = !currentOrder.refunded;

    // If the order is refunded and not cancelled, show the cancel button
    const canShowCancelButton = currentOrder.refunded && !currentOrder.cancelled;

    // getDescriptionByStatus Get the description by the status of the order
    const getDescriptionByStatus = () => {
        // If the order is cancelled, show the cancelled description
        if (currentOrder.cancelled) {
            return CANCELLED_DESCRIPTION;
        }

        // If the order is refunded, but not cancelled, show the cancel order description
        if (currentOrder.refunded) {
            return CANCEL_ORDER_DESCRIPTION;
        }

        // If the order is not refunded, show the issue refund description
        return ISSUE_REFUND_DESCRIPTION;
    }

    return (
        <>
            {
                orderHaveBeenPlaced && (
                    <div>
                        <h3>{CURRENT_ORDER_TITLE}</h3>
                        <p dangerouslySetInnerHTML={
                            {__html: getDescriptionByStatus()}
                        }/>
                        <div>
                            <p>ID: <b>{currentOrder.id}</b></p>
                            <div>
                                {
                                    canShowRefundButton &&
                                    <button onClick={() => issueRefund(currentOrder)}>{ISSUE_REFUND_BUTTON}</button>
                                }
                                {
                                    canShowCancelButton &&
                                    <button onClick={() => cancelOrder(currentOrder)}>{CANCEL_ORDER_BUTTON}</button>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}