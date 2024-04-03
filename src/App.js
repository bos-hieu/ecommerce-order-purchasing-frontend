import "./App.css"
import {useState, useEffect} from "react";
import Web3 from "web3";
import ContractArtifact from "./contracts/EcommerceOrderPurchasing.json";
import Product from "./components/Product.js";

function App() {
    const [msg, setMsg] = useState("");
    const [myAccount, setMyAccount] = useState("");
    const [products, setProducts] = useState([]);

    const checkWallet = async () => {
        // check if MetaMask is installed in the browser
        if (window.ethereum) {
            setMsg("Wallet found");
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
            const HelloContract = new web3.eth.Contract(contractABI, contractAddress);
            console.log(HelloContract);
            console.log("Account: ", account[0]);
            console.log("Contract Address: ", contractAddress);

            // // Send a transaction
            // try {
            //     await HelloContract.methods.setMessage("Hello Blockchain again").send({from: account[0]});
            // } catch (error) {
            //     alert(error);
            // }

            // Return(call) the getHello function of the contract
            const products = await HelloContract.methods.getProducts().call();
            console.log(products);
            setMsg(products);
            setProducts(products);
        } else {
            // if no wallet
            alert("Get MetaMask to connect");
        }
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
                            <div>
                                {products.map((product) => (
                                    <Product product={product} key={product.id} />
                                ))}
                            </div>
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