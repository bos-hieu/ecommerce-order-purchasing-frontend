/*
This constant file contains all the constant values that are used in the project.
 */

// This constant is used to store the default current order
export const DEFAULT_CURRENT_ORDER = {
    id: "",
    value: 0,
    refunded: false,
    cancelled: false,
};

// This constant is used to store the event name by the function in the smart contract
export const EVENT_NAME_BY_FUNCTION = {
    placeOrder: "OrderPlaced",
    issueRefund: "RefundIssued",
    cancelOrder: "OrderCancelled",
};

// This constant is used to store the success message for the user
export const SUCCESS_MESSAGE = {
    issueRefund: "You successfully refunded your payment",
    cancelOrder: "You successfully canceled your order",
};