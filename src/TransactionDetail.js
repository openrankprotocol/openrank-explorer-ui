// TransactionDetail.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTransactions } from './api'; 

export default function TransactionDetail() {
  const { hash } = useParams(); 
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactions(hash);
        if (data.transactions && data.transactions.length > 0) {
          setTransaction(data.transactions[0]);
        } else {
          setTransaction(null);
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setTransaction(null);
      }
      setIsLoading(false);
    };

    fetchTransaction();
  }, [hash]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!transaction) {
    return <p>Transaction not found.</p>;
  }

  return (<>
    <div className="flex flex-row items-center justify-between w-full mx-auto ">
      <h3 className="font-dm-sans font-bold text-lg">Transaction {transaction.hash}</h3>
    </div>
    <div className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4" style={{ border: '1px lightgrey solid' }}>
      <p><strong>Hash:</strong> {transaction.hash}</p>
      <p><strong>Type:</strong> {transaction.type}</p>
      <p><strong>From:</strong> {transaction.body.from}</p>
      <p><strong>To:</strong> {transaction.body.to}</p>
      {transaction.body && (
        <pre><strong>Decoded:</strong> {JSON.stringify(transaction.body, null, '\t')}</pre>
      )}
    </div>
  </>
  );
}
