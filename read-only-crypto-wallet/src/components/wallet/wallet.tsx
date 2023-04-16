import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Balance from '../balance/balance';
import Transactions from '../transactions/transactions';
import './wallet.css';


interface WalletProps {
  balance: string;
  address: string;
  updateView: (arg: string) => void;
}

function Wallet({ balance, address, updateView }: WalletProps) {

  // items for tabs
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Balance`,
      children: <Balance balance={balance} />,
    },
    {
      key: '2',
      label: `Transactions`,
      children: <Transactions address={address} />,
    },
  ];


  return (
    <div className='Wallet'>
      <div className='addressInfo'>
        <p className='textWalletAddress'>My wallet address is </p>
        <p className='walletAddress'>{address}</p>
        <button className='buttonDisconnect' onClick={() => updateView('welcome')}>Disconnect</button>
      </div>
      <Tabs className='tabs' centered defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Wallet;