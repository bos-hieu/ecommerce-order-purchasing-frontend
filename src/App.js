import "./styles/App.css"
import "./styles/Product.css"
import {useState, useEffect} from "react";
import Web3 from "web3";
import ContractArtifact from "./contracts/EcommerceOrderPurchasing.json";
import Product from "./components/Product.js";

function App() {
    const [msg, setMsg] = useState("");
    const [myAccount, setMyAccount] = useState("");
    const [products, setProducts] = useState([]);
    const [contract, setContract] = useState({});
    const [currentOrder, setCurrentOrder] = useState(null);
    const eventNameByFunction = {
        placeOrder: "PlaceOrder",
        cancelOrder: "CancelOrder",
        issueRefund: "IssueRefund"
    }

    const checkWallet = async () => {
        // check if MetaMask is installed in the browser
        if (window.ethereum) {
            setMsg("Connect to MetaMask. Click getProducts to see the products.");
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

    const getProducts = async () => {
        const products = await contract.methods.getProducts().call();
        setProducts(products);
    }

    const placeOrder = async (productId, value) => {
        // Send a transaction
        try {
            const response = await contract.methods.placeOrder(productId).send({from: myAccount, value: value});
            console.log(response);
            const message = getReturnMessage(response, eventNameByFunction.placeOrder);
            alert(message);

            // You have successfully purchased an order with id order_id_6
            // get the order_id from the message
            const components = message.split(" ");
            setCurrentOrder({id: components[components.length - 1], value: value});
        } catch (error) {
            alert(error);
        }
    }

    const cancelOrder = async (currentOrder) => {
        try {
            const response = await contract.methods.cancelOrder(currentOrder.id).send({from: myAccount, value: 0});
            const message = getReturnMessage(response, eventNameByFunction.cancelOrder);
            // if (message === "You successfully canceled your order") {
            //     setCurrentOrder(null)
            // }
            alert(message);
        } catch (error) {
            alert(error);
        }
    }

    const issueRefund = async (currentOrder) => {
        try {
            const response = await contract.methods.issueRefund(currentOrder.id).send({from: myAccount, value:currentOrder.value});
            console.log("response issueRefund", response);
            const message = getReturnMessage(response, eventNameByFunction.issueRefund);
            alert(message);
        } catch (error) {
            alert(error);
        }
    }

    const getReturnMessage =  (response, eventName) => {
        return response.events[eventName].returnValues.message;
    }

    useEffect(() => {
        checkWallet();
    }, []);

    return (
        <div className="App">
            <p>
                {/* If the Wallet is connected to an Account returns the message. Else show connect button*/}
                {
                    myAccount ? (
                        <div>
                            <p>{msg}</p>
                            {
                                products.length === 0 ? (
                                    <button onClick={getProducts}>Get Products</button>
                                ) : (
                                    <div className="ListProducts">
                                        {products.map((product) => (
                                            <Product
                                                product={product}
                                                key={product.id}
                                                placeOrder={placeOrder}
                                            />
                                        ))}
                                    </div>
                                )
                            }
                            {
                                currentOrder && (
                                    <div>
                                        <p>Current order: {currentOrder.id}</p>
                                        <button onClick={() => issueRefund(currentOrder)}>Issue Refund</button>
                                        <button onClick={() => cancelOrder(currentOrder)}>Cancel Order</button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <button onClick={readSmartContract}>Connect</button>
                    )
                }
            </p>
        </div>
    )
}

export default App;