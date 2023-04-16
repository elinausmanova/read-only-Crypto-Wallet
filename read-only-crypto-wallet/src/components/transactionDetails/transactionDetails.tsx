import React from 'react';
import { Modal, Divider } from 'antd';
import './transactionDetails.css';

// information about a transaction
// interface TransactionProps {
//     blockHash: string,
//     blockNumber: number,
//     from: string,
//     gas: number,
//     gasPrice: string,
//     hash: string,
//     input: string,
//     nonce: number,
//     to: string,
//     transactionIndex: number,
//     value: string,
// }

interface ComponentProps {
    openModal: boolean;
    updateVisibility: (arg: boolean) => void;
    transactionInfo: any
}

function TransactionDetails({ openModal, updateVisibility, transactionInfo }: ComponentProps) {

    // handle OK button in modal window
    const handleOk = () => {
        updateVisibility(false);
    };

    // handle Cancel button in modal window
    const handleCancel = () => {
        updateVisibility(false);
    };


    return (
        <>
            <Modal className='modal' title="Transaction Details" open={openModal}
                onOk={handleOk} onCancel={handleCancel}
            >
                <p className='type'>Block Number</p>
                <p className='info'>{transactionInfo.blockNumber}</p>
                <Divider />
                <p className='type'>Sender</p>
                <p className='info'>{transactionInfo.from}</p>
                <Divider />
                <p className='type'>Receiver</p>
                <p className='info'>{transactionInfo.to}</p>
                <Divider />
                <p className='type'>Gas Price</p>
                <p className='info'>{transactionInfo.gasPrice}</p>
                <Divider />
                <p className='type'>Gas</p>
                <p className='info'>{transactionInfo.gas}</p>
                <Divider />
                <p className='type'>Transaction Index</p>
                <p className='info'>{transactionInfo.transactionIndex}</p>
                <Divider />
                <p className='type'>Transferred Value</p>
                <p className='info'>{transactionInfo.value}</p>
                <Divider />
                <p className='type'>Input</p>
                <p className='info'>{transactionInfo.input}</p>
            </Modal>
        </>
    )
}

export default TransactionDetails