import transactions from './transactions.json' assert { type: "json" };
import express from "express";
import cors from "cors";

const PORT = 3001;

const app = express();
app.use(cors());

// console.log(transactions);

const getTransactionByHash = (hash) => {
    let selectedTransaction = transactions.filter(el => {
        return el.hash === hash
    })[0];
    return selectedTransaction;
}


app.get('/transactions', (req, res) => {
    res.send(transactions);
    // console.log(transactions);
    // res.json({ message: "Hello from Express!" });
  });

  app.get('/transaction', (req, res) => {
    // res.json({hash: req.query.hash});
    let selectedTransaction = getTransactionByHash(req.query.hash);
    console.log(selectedTransaction);
    res.send(selectedTransaction);
    // console.log(transactions);
    // res.json({ message: "Hello from Express!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});