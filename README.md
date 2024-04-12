
## Set Up the Project
In this section, we will guide you on how to set up the project. We will set up the project, including the backend and frontend.

Step 1: Open Ganache
Step 2: Choosing two first accounts in Ganache and copy their private keys by clicking on the key icon.
In this guide the first account is the retailer and the second account is the customer.
The first account address is 0xbFa35ed62edB2De539fbdB610803c6733779747B and the private key is 0xFdE41Cde2114265Ff1E51d2BdA535b261163cbD9.
Step 3: Import the two accounts to MetaMask
Open MetaMask and import the two accounts in the step 2 to MetaMask.
The first account is the retailer and the second account is the customer.
The first account is also the owner of smart contract which is deployed on the Ganache network.

open MetaMask and click the account icon in the top right corner of MetaMask.
Click Add account or hardware wallet button. Choose Import account option.

In the import account popup, paste the private key of the first account in the step 2 to the private key field.
Repeat the same steps to import the second account to MetaMask.

Now, we have two accounts in MetaMask: the first account is named Account 12 and the second account is named Account 13.
The first account is the retailer and the second account is the customer.


Step 4: Create a new folder for the project and navigate to it.

In which we have downloaded the two .zip project files, create a new folder for the project with the name ecommerce-order-purchasing.

```bash
mkdir ecommerce-order-purchasing
cd ecommerce-order-purchasing
```

Step 5: New terminal window in the created project folder.

New terminal window in the created project folder. This terminal window is used to set up backend and frontend of the project in the following steps.
```bash
cd ecommerce-order-purchasing
```

Step 6: Unzip the two zip files
Copy two .zip files ecommerce-order-purchasing-backend.zip and ecommerce-order-purchasing-frontend.zip to the created project folder and unzip them.
We now have two directories inside ecommerce-order-purchasing folder: ecommerce-order-purchasing-backend and ecommerce-order-purchasing-frontend.

From now on, we call the ecommerce-order-purchasing-backend folder as the backend folder and the ecommerce-order-purchasing-frontend folder as the frontend folder.


Step 7: Navigate to backend folder
Come back to the terminal window We opened in step 5.
Run the following command to navigate to the backend folder.

```bash
cd ecommerce-order-purchasing-backend
```

Step 8: Deploy the smart contract to the Ganache

In the terminal window, run the following command to deploy the smart contract to the Ganache network.

```bash
truffle migrate --network development
```
In the console output, We will see the transaction hash, contract address, account and other information.
As We can see, the contract address is the first address in the list of addresses in Ganache. 
It is one of the two accounts We imported to MetaMask in step 3.

Now, We have successfully deployed the smart contract to the Ganache network.

Step 10: Copy artifacts of the contract to the frontend folder
In this step, we will copy the contract to the frontend folder. The artifacts of the contract are stored in the build/contracts of the backend folder.
Run the following command to copy the contracts to the frontend folder. The artifacts contract now is in the src/contracts folder of the frontend folder.


```bash
rm -rf ./../ecommerce-order-purchasing-frontend/src/contracts/
cp -r ./build/contracts ./../ecommerce-order-purchasing-frontend/src/
```

Step 11: Navigate to the frontend folder
Run the following command to navigate to the frontend folder.

```bash
cd ./../ecommerce-order-purchasing-frontend
```

Step 12: Install frontend dependencies

Run the following command to install the dependencies of the frontend and wait for the installation to complete.

```bash
npm install
```

Completed the installation of the frontend dependencies.

Step 13: Start the frontend

Run the following command to start the frontend.

```bash
npm run start
```

After the frontend is started, We can access the application at http://localhost:3000. 
By default, it will open the browser and display the application. 
If it does not open, we can manually open the browser and enter the URL http://localhost:3000.
We have successfully set up the project, including the backend and frontend.
In the next section, we will guide you on how to interact with the application.

## How to use the application
In this section, we will guide you on how to interact with the application.
We have two roles in the application: retailer and customer.
Retailer is the owner of the smart contract as well as the first account in Ganache.
Customer is the second account in Ganache.
There are four functionalities in the application:
1. Get Products: it is executed by Get Products button.
2. Place an order: it is executed by Place Order button.
3. Issue refund: it is executed by Issue Refund button.
4. Cancel order: it is executed by Cancel Order button.

These buttons will be not displayed at the same time. It will be displayed step by step as the following steps.

Step 1: Connect to MetaMask
Come back to the browser where the application is opened in step 13 of the previous section.
Click `Connect to MetaMask` button to connect to MetaMask. A MetaMask popup will appear and then allow the connection.
After connecting to MetaMask, the application will display this description: 
`You connected to the smart contract. Click the Get Products button to get the list of products.`.
Now, We can click the Get Products button to get the list of products.

Step 2: Get Products
Click the Get Products button. The application will display the list of products.
The list of products includes image, name, description, price. In this project, we have three products: Product 1, Product 2, Product 3.
There is a Place Order button in each product. We can click the Place Order button to place an order for the product.

Step 3: Place an order
To place an order, we need to change the account in MetaMask to the customer account.

In this guide, we use the second account in Ganache as the customer account. It is the "Account 13" in MetaMask.
To change the account in MetaMask, click the account icon in the top right corner of MetaMask and then select the Account 13.
Then click the circle icon right next to the account icon. It is another popup will appear and then click the Connect button.
After that, close the popup and come back to the application.

In the above image, we can see that the balance of the customer account is 92.0818 ETH. Now, click the Place Order button of the product we want to order. In this guide, we click the Place Order button of Product 1.
A MetaMask popup will appear and then click the Confirm button.

After the transaction is confirmed, the application will display the message that the order is purchased successfully with the order ID.

The message should be like this: `You have successfully purchased an order with id order_id_1`.


Click OK to close the message.

We can now check the balance of the customer account in MetaMask. The balance should be reduced by the price of the product.
As we can see, the customer account balance now is 91.0813 ETH, before it was 92.0818 ETH.

Step 4: Issue refund

To issue a refund, we need to change the account in MetaMask to the retailer account.
Do it the same way as in step 3. But now, we select the first account in Ganache as the retailer account. It is the "Account 12" in MetaMask.
Now the retailer account is connected to the application. The balance of the retailer account is 103.6427 ETH.
After issuing a refund, the balance of the retailer account will be reduced.
In the same time, the balance of the customer account will be increased.

Close the MetaMask popup and come back to the application.
Click the Issue Refund button. A MetaMask popup will appear and then click the Confirm button.
After the transaction is confirmed, the application will display the message that the refund is issued successfully.
The message should be like this: `You have successfully refunded your payment`.

Click OK to close the message.
As we can see, the Issued Refund button is not displayed anymore. It is because the refund is issued successfully.
The Cancel Order button is displayed instead.

Check the balance of the retailer account in MetaMask. The balance of the retailer account is reduced to 102.6425 ETH.
Check the balance of the customer account in MetaMask. The balance of the customer account is increased to 92.081 ETH.
So, the Ethereum is transferred from the retailer account to the customer account.
We have successfully issued a refund.

Step 5: Cancel order
The last functionality is to cancel the order. We can cancel the order after issuing a refund.
Close the MetaMask popup and come back to the application.

Click the Cancel Order button. A MetaMask popup will appear and then click the Confirm button.
After the transaction is confirmed, the application will display the message that the order is canceled successfully.
The message should be like this: `You have successfully canceled your order`.

Click OK to close the message.
As we can see, the Cancel Order button is not displayed anymore. It is because the order is canceled successfully.
There will be a description said that: This order have been canceled. Please click the Place Order button to place a new order.

Now, we have successfully canceled the order.

Click OK to close the message. Then check the balance of the retailer account and customer account in MetaMask. The balance of the retailer account is reduced to 102.6425 ETH. The balance of the customer account is increased to 92.081 ETH. So, the Ethereum is transferred from the retailer account to the customer account

## Conclusion
We have successfully set up the project and interacted with the application. We have two roles in the application: retailer and customer.
Thank you for reading this guide. I hope it helps you to understand how to set up the project and interact with the application.
I am looking forward to hearing your feedback. Thank you for your time and consideration.

