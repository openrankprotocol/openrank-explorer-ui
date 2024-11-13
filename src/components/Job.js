import React, { useEffect, useState } from 'react';
import { getTransactionsByJobSeqNumber } from '../api/protocol'
import Loader from '../ui/loader'

export default function Job({ job }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await getTransactionsByJobSeqNumber(job.seqNumber);
                console.log({ result })
                setTransactions(result);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };


        fetchTransactions();
    }, [job]);

    return (
        <div
            className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4"
            style={{ border: '1px lightgrey solid' }}
        >
            <div>
                <p><strong>Hash:</strong> {JSON.stringify(job)}</p>
            </div>
            <div>
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map((transaction) => (
                            <div>
                                {JSON.stringify(transaction)}
                            </div>
                        ))}
                    </ul>
                ) : (
                    <div><Loader /></div>
                )}
            </div>
        </div>
    );
}