import { useState, useEffect } from "react";
import { getTransactions } from '../api/protocol'
import Loader from '../ui/loader';
import TransactionList from '../components/TransactionList';

export default function TransactionListPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async (hash = '') => {
    setIsLoading(true);
    try {
      const data = await getTransactions(hash);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full mx-auto ">
        <h3 className="font-dm-sans font-bold text-lg">Transactions</h3>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
}
