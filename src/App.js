import "./styles/App.css"
import "./styles/Product.css"
import {useState, useEffect} from "react";
import Web3 from "web3";
import ContractArtifact from "./contracts/EcommerceOrderPurchasing.json";
import ListProducts from "./components/ListProducts";
import CurrentOrder from "./components/CurrentOrder";
import {
    APP_TITLE,
    CONNECT_TO_METAMASK_BUTTON,
    DEFAULT_CURRENT_ORDER,
    EVENT_NAME_BY_FUNCTION,
    GET_PRODUCTS_DESCRIPTION,
    SUCCESS_MESSAGE,
} from "./constants";

function App() {
    const [msg, setMsg] = useState("");
    const [myAccount, setMyAccount] = useState("");
    const [products, setProducts] = useState([]);
    const [contract, setContract] = useState({});
    const [currentOrder, setCurrentOrder] = useState(DEFAULT_CURRENT_ORDER);

    const checkWallet = async () => {
        // check if MetaMask is installed in the browser
        if (window.ethereum) {
            setMsg(GET_PRODUCTS_DESCRIPTION);
        } else {
            setMsg("Please Install MetaMask");
        }
    }

    const readSmartContract = async () => {
        if (window.ethereum) {
            // if MetaMask found, request connection to the Wallet Accounts (log in)
            const account = await window.ethereum.request({method: "eth_requestAccounts"});

            // select the last used account, store it in state variable
            setMyAccount(account[0]);

            // Web.js
            // select the ABI and contract address from the Artifact
            const contractABI = ContractArtifact.abi;
            const contractAddress = ContractArtifact.networks[5777].address;

            // create a Web3 instance
            const web3 = new Web3(Web3.givenProvider);

            // Get the deployed contract as an object
            const EcommerceOrderPurchasingContract = new web3.eth.Contract(contractABI, contractAddress);
            setContract(EcommerceOrderPurchasingContract);
        } else {
            // if no wallet
            alert("Get MetaMask to connect");
        }
    }

    // getProducts is a function that execute the getProducts function in the smart contract
    const getProducts = async () => {
        const products = await contract.methods.getProducts().call();
        setProducts(products);
    }

    //placeOrder is a function that execute the placeOrder function in the smart contract
    // @param productId: the id of the product to be purchased
    // @param amount: the amount of the order, in this case, it is the price of the product
    const placeOrder = async (productId, amount) => {
        try {
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
                refunded: false,
                cancelled: false
            };

            // set the new order to the current order
            setCurrentOrder(newOrder);
        } catch (error) {
            alert(error);
        }
    }

    // issueRefund is a function that execute the issueRefund function in the smart contract
    // @param currentOrder: the current order to be refunded
    const issueRefund = async (currentOrder) => {
        try {
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
            alert(error);
        }
    }

    // cancelOrder is a function that execute the cancelOrder function in the smart contract
    // @param currentOrder: the current order to be canceled
    const cancelOrder = async (currentOrder) => {
        try {
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
            alert(error);
        }
    }

    // getReturnMessage is a helper function that returns the message from the response of the smart contract
    // @param response: the response from the smart contract
    // @param eventName: the event name to get the return message
    // @return the message from the response
    const getReturnMessage = (response, eventName) => {
        return response.events[eventName].returnValues.message;
    }

    useEffect(() => {
        checkWallet();
    }, []);

    return (
        <div className="App">
            <h1>{APP_TITLE}</h1>
            {
                myAccount ? (
                    <div>
                        {
                            products.length === 0 &&
                            <p dangerouslySetInnerHTML={
                                {__html: msg}
                            }></p>
                        }

                        <ListProducts
                            getProducts={getProducts}
                            products={products}
                            placeOrder={placeOrder}
                            currentOrder={currentOrder}
                        />
                        <CurrentOrder
                            currentOrder={currentOrder}
                            issueRefund={issueRefund}
                            cancelOrder={cancelOrder}
                        />
                    </div>
                ) : (
                    <button onClick={readSmartContract}>{CONNECT_TO_METAMASK_BUTTON}</button>
                )
            }
        </div>
    )
}

export default App;