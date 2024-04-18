/*
    @class: CCMP 603 - Introduction to Smart Contracts - Project - Frontend
    @title: E-commerce Order Purchasing Smart Contract
    @member: Le, Trung Hieu
    @date: April 10, 2024

    This is the frontend of the E-commerce Order Purchasing Smart Contract project.
    It is built using React.js to interact with the smart contract.
    The frontend allows the user to connect to MetaMask, get the list of products from the smart contract,
    place an order, issue a refund, and cancel the order.

    The frontend is divided into components:
    - App.js: The main component of the frontend
    - ListProducts.js: The component to display the list of products
    - Product.js: The component to display the product details
    - CurrentOrder.js: The component to display the current order status

    All constants are stored in the constants.js file.
    The artifacts of the smart contract are stored in the contracts folder.

    I am looking forward to receiving your feedback. Thank you for your time and consideration.
*/
import "./styles/App.css"
import "./styles/Product.css"
import {
    useState,
    useEffect,
} from "react";
import Web3 from "web3";
import ContractArtifact from "./contracts/EcommerceOrderPurchasing.json";
import ListProducts from "./components/ListProducts";
import CurrentOrder from "./components/CurrentOrder";
import {
    APP_TITLE,
    CONNECT_TO_METAMASK_BUTTON,
    CONNECTED_TO_METAMASK_DESCRIPTION,
    DEFAULT_CURRENT_ORDER,
    EVENT_NAME_BY_FUNCTION,
    PLEASE_INSTALL_METAMASK_DESCRIPTION,
    SUCCESS_MESSAGE,
    SWITCH_TO_CUSTOMER_ACCOUNT_ALERT_MESSAGE,
    SWITCH_TO_RETAILER_ACCOUNT_ALERT_MESSAGE_PREFIX,
} from "./constants";

function App() {
    // msg is a state variable that stores the message to be displayed to the user
    const [msg, setMsg] = useState("");

    // myAccount is a state variable that stores the current MetaMask account address
    const [myAccount, setMyAccount] = useState("");

    // products is a state variable that stores the list of products
    const [products, setProducts] = useState([]);

    // contract is a state variable that stores the smart contract object
    const [contract, setContract] = useState({});

    // currentOrder is a state variable that stores the current order
    const [currentOrder, setCurrentOrder] = useState(DEFAULT_CURRENT_ORDER);

    // retailerAccount is a state variable that stores the retailer account address
    const [retailerAccount, setRetailerAccount] = useState("");

    // checkWallet is a function that checks if the wallet is connected to the browser
    const checkWallet = async () => {
        // check if MetaMask is installed in the browser
        if (window.ethereum) {
            setMsg(CONNECTED_TO_METAMASK_DESCRIPTION);
        } else {
            setMsg(PLEASE_INSTALL_METAMASK_DESCRIPTION);
        }
    }

    // checkAccount is a function that checks if the account is changed from MetaMask.
    const checkAccount = async () => {
        if (window.ethereum) {
            // if the account is changed, update the account
            window.ethereum.on('accountsChanged', function (accounts) {
                // select the last used account, store it in state variable
                setMyAccount(accounts[0]);
            })
        }
    }

    // isRetailerAccount is a function that checks if the current account is the retailer account
    const isRetailerAccount = (currentAccount) => {
        return currentAccount === retailerAccount;
    }

    // readSmartContract is a function that reads the smart contract
    const readSmartContract = async () => {
        if (window.ethereum) {
            // create a Web3 instance
            const web3 = new Web3(window.ethereum);

            // set provider to Sepolia testnet
            web3.setProvider(process.env.NEXT_PUBLIC_API_URL);

            // if MetaMask found, request connection to the Wallet Accounts (log in)
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

            // select the last used account, store it in state variable
            setMyAccount(accounts[0]);

            // select the ABI and contract address from the Artifact
            const contractABI = ContractArtifact.abi;
            const contractAddress = ContractArtifact.networks[process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID].address;

            // Get the deployed contract as an object
            const EcommerceOrderPurchasingContract = new web3.eth.Contract(contractABI, contractAddress);
            setContract(EcommerceOrderPurchasingContract);

            // get the retailer account
            const retailer = await EcommerceOrderPurchasingContract.methods.getRetailer().call();
            // Because the address from the contract is in sensitive case, but the address account from MetaMask is in lower case.
            // So, we need to convert the retailer address to lower case.
            setRetailerAccount(retailer.toLowerCase());
        } else {
            alert(PLEASE_INSTALL_METAMASK_DESCRIPTION);
        }
    }

    // getProducts is a function that execute the getProducts function in the smart contract
    const getProducts = async () => {
        // call the getProducts function in the smart contract
        const products = await contract.methods.getProducts().call();

        // set the products to the state variable
        setProducts(products);
    }

    //placeOrder is a function that execute the placeOrder function in the smart contract
    // @param productId: the id of the product to be purchased
    // @param amount: the amount of the order, in this case, it is the price of the product
    const placeOrder = async (productId, amount) => {
        try {
            // check if the current account is the retailer account
            if (isRetailerAccount(myAccount)) {
                // alert the user to switch to the customer account
                alert(SWITCH_TO_CUSTOMER_ACCOUNT_ALERT_MESSAGE);
                return;
            }

            // call the placeOrder function in the smart contract
            const response = await contract.methods.placeOrder(productId).send({from: myAccount, value: amount});

            // get the message from the response
            const message = getReturnMessage(response, EVENT_NAME_BY_FUNCTION.placeOrder);

            // alert the response message to the user
            alert(message);

            // get the order_id from the message
            const messageArrays = message.split(" ");

            // get the last element of the messageArrays
            const orderId = messageArrays[messageArrays.length - 1];

            // create a new order object
            const newOrder = {
                id: orderId,
                value: amount,
                refunded: false, // set the refunded value to false
                cancelled: false // set the cancelled value to false
            };

            // set the new order to the current order
            setCurrentOrder(newOrder);
        } catch (error) {
            // alert the error message to the user
            alert(getErrorMessage(error));
        }
    }

    // issueRefund is a function that execute the issueRefund function in the smart contract
    // @param currentOrder: the current order to be refunded
    const issueRefund = async (currentOrder) => {
        try {
            // check if the current account is the retailer account
            if (!isRetailerAccount(myAccount)) {
                // alert the user to switch to the retailer account
                alert(getSwitchToRetailerAccountAlertMessage());
                return;
            }

            // call the issueRefund function in the smart contract
            const response = await contract.methods.issueRefund(currentOrder.id).send({
                from: myAccount,
                value: currentOrder.value
            });

            // get the message from the response
            const message = getReturnMessage(response, EVENT_NAME_BY_FUNCTION.issueRefund);

            // if the message is "You successfully refunded your payment", set the current order to be refunded.
            if (message === SUCCESS_MESSAGE.issueRefund) {
                // create a new object with the refunded value
                const updatedOrder = {...currentOrder, refunded: true};

                // set the updated order to the current order
                setCurrentOrder(updatedOrder);
            }

            // alert the response message to the user
            alert(message);
        } catch (error) {
            // alert the error message to the user
            alert(getErrorMessage(error));
        }
    }

    // cancelOrder is a function that execute the cancelOrder function in the smart contract
    // @param currentOrder: the current order to be canceled
    const cancelOrder = async (currentOrder) => {
        try {
            // check if the current account is the retailer account
            if (!isRetailerAccount(myAccount)) {
                // alert the user to switch to the retailer account
                alert(getSwitchToRetailerAccountAlertMessage());
                return;
            }

            // call the cancelOrder function in the smart contract
            const response = await contract.methods.cancelOrder(currentOrder.id).send({from: myAccount});

            // get the message from the response
            const message = getReturnMessage(response, EVENT_NAME_BY_FUNCTION.cancelOrder);

            // if the message is "You successfully canceled your order", set the current order to be cancelled.
            if (message === SUCCESS_MESSAGE.cancelOrder) {
                // create a new object with the cancelled value
                const updatedOrder = {...currentOrder, cancelled: true};

                // set the updated order to the current order
                setCurrentOrder(updatedOrder);
            }

            // alert the response message to the user
            alert(message);
        } catch (error) {
            // alert the error message to the user
            alert(getErrorMessage(error));
        }
    }

    // getReturnMessage is a helper function that returns the message from the response of the smart contract
    // @param response: the response from the smart contract
    // @param eventName: the event name to get the return message
    // @return the message from the response
    const getReturnMessage = (response, eventName) => {
        return response.events[eventName].returnValues.message;
    }

    // getErrorMessage is a helper function that returns the error message
    // @param error: the error that occurred
    function getErrorMessage(error) {
        // This is to check if the error is an object and has a message property
        // Example: {code: 4001, message: 'MetaMask Tx Signature: User denied transaction signature.'}
        if (typeof error === "object" && error.hasOwnProperty("message")) {
            return error.message;
        } else {
            return error;
        }
    }

    // getSwitchToRetailerAccountAlertMessage is a helper function that returns the message to switch to the retailer account
    function getSwitchToRetailerAccountAlertMessage() {
        return `${SWITCH_TO_RETAILER_ACCOUNT_ALERT_MESSAGE_PREFIX} ${retailerAccount}`;
    }

    useEffect(() => {
        // check if the wallet is connected
        checkWallet();
    }, []);

    useEffect(() => {
        // check if the account is changed from MetaMask
        checkAccount();
    })

    return (
        <div className="App">
            {/* Display the title of the application */}
            <h1>{APP_TITLE}</h1>
            {
                myAccount ? (
                    <div>
                        {/* If the products have not been get, show message to get the products */}
                        {
                            products.length === 0 &&
                            <p
                                dangerouslySetInnerHTML={
                                    {
                                        __html: msg,
                                    }
                                }
                            />
                        }

                        {/* Display the list of products */}
                        <ListProducts
                            getProducts={getProducts}
                            products={products}
                            placeOrder={placeOrder}
                            currentOrder={currentOrder}
                            currentAccount={myAccount}
                        />

                        {/* Display the current order */}
                        <CurrentOrder
                            currentOrder={currentOrder}
                            currentAccount={myAccount}
                            issueRefund={issueRefund}
                            cancelOrder={cancelOrder}
                        />
                    </div>
                ) : (
                    // If the account is not connected, show the "connect to MetaMask" button
                    <button
                        onClick={readSmartContract}
                    >
                        {CONNECT_TO_METAMASK_BUTTON}
                    </button>
                )
            }
        </div>
    )
}

export default App;