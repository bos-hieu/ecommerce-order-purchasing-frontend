/*
 This component is responsible for displaying the current order status.
 It will display the title, the description by the status of the order, the order ID, and the issue refund and cancel order buttons.
*/
import {
    CANCEL_ORDER_BUTTON,
    CANCEL_ORDER_DESCRIPTION,
    CANCELLED_DESCRIPTION,
    CURRENT_ORDER_TITLE,
    ISSUE_REFUND_BUTTON,
    ISSUE_REFUND_DESCRIPTION,
} from "../constants";

// CurrentOrder component
function CurrentOrder(
    {
        currentOrder, // The current order object
        issueRefund, // The function to issue a refund
        cancelOrder, // The function to cancel the order
    },
) {
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

    // If the order have not been placed, do not show anything
    if (!orderHaveBeenPlaced) {
        return <></>;
    }

    // Display the current order
    return (
        <div>
            {/* Display the current order title */}
            <h3>{CURRENT_ORDER_TITLE}</h3>

            {/* Display the description by the status of the order */}
            <p
                dangerouslySetInnerHTML={
                    {
                        __html: getDescriptionByStatus(),
                    }
                }
            />

            <div>
                {/* Display the order ID */}
                <p>
                    ID: <b>{currentOrder.id}</b>
                </p>

                {/* Display the issue refund and cancel order buttons */}
                <div>
                    {/* Display the issue refund button */}
                    {
                        canShowRefundButton &&
                        (
                            <button
                                onClick={() => issueRefund(currentOrder)}
                            >
                                {ISSUE_REFUND_BUTTON}
                            </button>
                        )
                    }

                    {/* Display the cancel order button */}
                    {
                        canShowCancelButton &&
                        (
                            <button
                                onClick={() => cancelOrder(currentOrder)}
                            >
                                {CANCEL_ORDER_BUTTON}
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

// Export the CurrentOrder component
export default CurrentOrder;