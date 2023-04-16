import React, { useState } from 'react';
import Web3 from 'web3';
import './welcome.css';
// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'

interface WelcomeProps {
  updateView: (arg: string) => void;
  updateBalance: (arg: string) => void;
  updateAddress: (arg: string) => void;
  updateTransactions: (arg: []) => void;
}


function Welcome({ updateView, updateBalance, updateAddress, updateTransactions }: WelcomeProps) {

  const [blockNumber, changeBlockNumber] = useState(0);
  const [walletAddress, changeWalletAddress] = useState('');
  const [errorMessage, changeErrorMessage] = useState('');

  // When connect btn is clicked
  const onBtnClick = async () => {
    try {
      const testnet = 'https://eth.bd.evmos.dev:8545';
      // save wallet address to the state
      updateAddress(walletAddress);

      // convert address to evmos
      // let address = ethToEvmos(walletAddress);

      // provider
      const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

      // function to get balance of the wallet
      web3.eth.getBalance(walletAddress, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // if success go to the balance (wallet) page
          updateView('wallet');
          // save to the state balance info
          updateBalance(web3.utils.fromWei(result, "ether"));
        }
      }
      );

      // get amount of transactions
      web3.eth.getTransactionCount(walletAddress, function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log('transaction count is ', result)
        }
      });



      // get block Number
      web3.eth.getBlockNumber(function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log('block number is ', result);
          changeBlockNumber(result);
        }
      });

      // get block info with transactions
      web3.eth.getBlock(blockNumber, false, function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log('block is ', result);
          // updateTransactions(result.transactions)
        }
      });
    }
    catch {
      changeErrorMessage('Something went wrong. Please check your wallet address');
    }

  }

  return (
    <div className="Welcome">
      <h1 className='textWelcome'>Welcome!</h1>
      <p className='textConnect'>Connect my wallet</p>
      <div className='connect'>
        <input type="text" id="address" placeholder='Your wallet address' onChange={(e) => changeWalletAddress(e.currentTarget.value)} name="address" />
        <button className='button' onClick={() => {
          onBtnClick();
        }
        }>Connect Wallet!</button>
      </div>
      {/* error message in case of any problem */}
      <p className='errorMessage'>{errorMessage}</p>
    </div>
  );
}

export default Welcome;
