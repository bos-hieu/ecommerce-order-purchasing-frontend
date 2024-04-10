/*
This constant file contains all the constant values that are used in the project.
These constant values are grouped in the following categories:
1. Constants for common values
2. Constants for titles
3. Constants for buttons
4. Constants for descriptions
5. Constants for messages
 */


// region 1. Constants for common values

// This constant is used to store the default current order
export const DEFAULT_CURRENT_ORDER = {
    id: "", // The order ID
    value: 0, // The order value
    refunded: false, // The order refunded status
    cancelled: false, // The order cancelled status
};

// This constant is used to store the event name by the function in the smart contract
export const EVENT_NAME_BY_FUNCTION = {
    placeOrder: "PlaceOrder", // The event name for the placeOrder function
    cancelOrder: "CancelOrder", // The event name for the cancelOrder function
    issueRefund: "IssueRefund" // The event name for the issueRefund function
};

// This constant is used to store the title for the refund button
export const ETHEREUM_SYMBOL = "ETH";

// This constant is used to store the decimal value for Ethereum
export const ETHEREUM_DECIMAL = 1e18;

// endregion 1. Constants for common values


// region 2. Constants for titles

// This constant is used to store the app title
export const APP_TITLE = "Ecommerce Order Purchasing Smart Contract";

// This constant is used to store the title for the current order
export const CURRENT_ORDER_TITLE = "Current purchased order";

// This constant is used to store the title for the list of products component
export const LIST_PRODUCTS_TITLE = "List of products";

// endregion 2. Constants for titles


// region 3. Constants for buttons

// This constant is used to store the title for the refund button
export const GET_PRODUCTS_BUTTON = "Get Products";

// This constant is used to store the title for the refund button
export const PLACE_ORDER_BUTTON = "Place Order";

// This constant is used to store the title for the refund button
export const ISSUE_REFUND_BUTTON = "Issue Refund";

// This constant is used to store the title for the refund button
export const CANCEL_ORDER_BUTTON = "Cancel Order";

// This constant is used to store the title for connect to MetaMask button
export const CONNECT_TO_METAMASK_BUTTON = "Connect to MetaMask";

// endregion 3. Constants for buttons


// region 4. Constants for descriptions

// This constant is used to store the description for the list of products component
export const LIST_PRODUCT_DESCRIPTION = "<i>(*) Click the <b>Place Order</b> button to place an order for the product.</i>";

// This constant is used to store the description for the cancel order button
export const CANCEL_ORDER_DESCRIPTION = "<i> (*) Click the <b>Cancel Order</b> button to cancel the order. <i>";

// This constant is used to store the description for the cancel order button
export const ISSUE_REFUND_DESCRIPTION = "<i> (*) Click the <b>Issue Refund</b> button to refund the order.<i>";

// This constant is used to store the description for the cancel order button
export const CANCELLED_DESCRIPTION = "<i> (*) This order has been cancelled. Please click the <b>Place Order</b> button to place a new order.</i>";

// This constant is used to store the description when the user is connected to the MetaMask as well as the smart contract
export const CONNECTED_TO_METAMASK_DESCRIPTION = "<i> (*) You connected to the smart contract. Click the <b>Get Products</b> button to get the list of products.</i>";

// This constant is used to store the description when the user have not installed the MetaMask
export const PLEASE_INSTALL_METAMASK_DESCRIPTION = "Please install MetaMask to use this application.";

// endregion 4. Constants for descriptions


// region 5. Constants for messages

// This constant is used to store the message prefix when the user need to switch to the retailer account
export const SWITCH_TO_RETAILER_ACCOUNT_ALERT_MESSAGE_PREFIX = "You are using the customer account. Please switch your MetaMask account to the retailer account: ";

// This constant is used to store the message when the user need to switch to the customer account
export const SWITCH_TO_CUSTOMER_ACCOUNT_ALERT_MESSAGE = "You are using the retailer account. Please switch your MetaMask account to another account.";

// This constant is used to store the success message for the user
export const SUCCESS_MESSAGE = {
    issueRefund: "You successfully refunded your payment", // The success message for the issueRefund function
    cancelOrder: "You successfully canceled your order", // The success message for the cancelOrder function
};

// endregion 5. Constants for messages
