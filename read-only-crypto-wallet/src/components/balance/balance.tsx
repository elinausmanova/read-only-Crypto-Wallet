import './balance.css';

interface BalanceProps {
    balance: string;
}

function Balance({ balance }: BalanceProps ) {
    return (
        <div>
            <h1>Total balance is</h1>
            <p className="balance">{balance}</p>
        </div>
    );
}

export default Balance;