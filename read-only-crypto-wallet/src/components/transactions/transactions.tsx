import React, { useEffect, useState } from "react";
import Web3 from "web3";
import TransactionDetails from "../transactionDetails/transactionDetails";
import './transactions.css';

interface ComponentProps {
    address: string
}

function Transactions({ address }: ComponentProps) {


    // transaction details
    interface TransactionProps {
        blockHash: string,
        blockNumber: number,
        from: string,
        gas: number,
        gasPrice: string,
        hash: string,
        input: string,
        nonce: number,
        to: string,
        transactionIndex: number,
        value: string,
    }


    const [transactions, onTransactionChange] = useState<Array<TransactionProps>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionInfo, setTransactionInfo] = useState<TransactionProps>({
        blockHash: '',
        blockNumber: 0,
        from: '',
        gas: 0,
        gasPrice: '',
        hash: '',
        input: '',
        nonce: 0,
        to: '',
        transactionIndex: 0,
        value: '',
    });

    // fetch transactions once when the component is rendered
    useEffect(() => {
        fetch("http://localhost:3001/transactions")
            .then((res) => res.json())
            .then((data) => onTransactionChange(data));
    }, []
    );


    // fetch data about specific transaction, provide a hash of the transaction
    const onTransactionClick = (key: any) => {
        console.log(key);
        fetch("http://localhost:3001/transaction?hash=" + key)
            .then((res) => res.json())
            .then((data) => {
                setTransactionInfo(data);
            });
        // open a modal window with transaction details
        setIsModalOpen(true);
    }

    // needed to convert transfered value
    const testnet = 'https://eth.bd.evmos.dev:8545';
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

    // change visibility of the modal window
    const updateVisibility = (state: boolean) => {
        setIsModalOpen(state);
    };

    return (
        <div className="transactionList">
            <h1>Transactions</h1>
            {/* display list of transactions */}
            {transactions.map(el => {
                return (
                    <>
                        <div className="transaction" key={el.hash} onClick={() => onTransactionClick(el.hash)}>
                            <p className="address">{el.from === address ? el.to : el.from}</p>
                            <p
                                className="amount"
                                style={el.from === address ? { color: 'red', border: '1px solid red', backgroundColor: '#FCCAC5' } : { color: 'green', border: '1px solid green', backgroundColor: '#CCFCC5' }}
                            >
                                {el.from === address ? '-' : '+'}{web3.utils.fromWei(el.value.toString(), "ether")}</p>
                        </div>
                        {/* modal window */}
                        <TransactionDetails transactionInfo={transactionInfo} openModal={isModalOpen} updateVisibility={updateVisibility} />
                    </>
                )
            })}
        </div>
    )
}

export default Transactions;