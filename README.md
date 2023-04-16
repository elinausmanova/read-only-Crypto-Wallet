# How to run this app

1. Clone the repo
2. Install all dependencies
3. Run front and back parts separatedly with `npm start` command. Please use localhost:3001 for backend part

# The task

The task was to implement a web3 wallet where the user can see its balance and history of transactions. In order to do it, blockchain libraries have to be used such as web3, cosmosjs and evmosjs.

The steps to approach to reach the app goal:
1. Connect to your wallet by using testnet endpoint. It is done with the help of the web3 library.
2. Convert the address to Bech32 format so the user can use both formats of the address. It can be done by using the package `@evmos/address-converter` and a method `ethToEvmos`. Unfortunately this part didn't work for me since I have got an error `ReferenceError: Buffer is not defined` which I tried to solve by adding another library called `buffer` to my app but the error is still there. 
3. Get Balance of the wallet. Web3 has a methods which allows the user to get a balance of the provided wallet.
4. Get list of all transactions. This could be done by using `getBlock` from `web3`. The `block` object body contains `transactions` which is a list of all transaction objects or their hashes (depending on the parameters provided to the method). For some reason this function returned an empty list of transactions.
5. Due to the described problems above, the decision was made to create a backend server which will respond to the app frontend part and provided fake data about the transactions made by this wallet. The procedure of getting transactions was imitated as close as possible to the original one. Two endpoints were created: 1 - to get list of all transaction objects, 2 - get transaction details by its hash.  