import React, { useState } from 'react';
import './App.css';
import Welcome from './components/welcome/welcome';
import Wallet from './components/wallet/wallet';

function App() {

  interface TransactionProps {
    hash: string;
    blockNumber: string; 
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gas: string;
    input: string;
  }

  const [view, onViewChange] = useState('welcome');
  const [ balance, onBalanceChange ] = useState('0');
  const [ address, onAddressChange ] = useState('');
  const [ transactions, onTransactionChange ] = useState<Array<TransactionProps>>([]);

  // update view of the app
  const updateView = (view: string):void => {
    onViewChange(view)
  }

  // update balance of the wallet
  const updateBalance = (balance: string):void => {
    onBalanceChange(balance);
  }

  // update wallet address, put to the state
  const updateAddress = (address: string):void => {
    onAddressChange(address);
  }

  // update transactions for the particular wallet
  const updateTransactions = (transactions: []):void => {
    onTransactionChange(transactions);
  }
 
  return (
    <div className="App">
      {view === 'welcome' && 
      <Welcome updateView={updateView} updateBalance={updateBalance} updateAddress={updateAddress} updateTransactions={updateTransactions} /> }
      {view === 'wallet' &&
      <Wallet updateView={updateView} balance={balance} address={address} /> }
    </div>
  );
}

export default App;
