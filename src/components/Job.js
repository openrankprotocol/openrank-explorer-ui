import React, { useEffect, useState } from 'react';
import { getTransactionsByJobSeqNumber } from '../api/protocol'
import Loader from '../ui/loader'
import { Link } from 'react-router-dom';

export default function Job({ job }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await getTransactionsByJobSeqNumber(job.seqNumber);

                setTransactions(result.transactions);
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
                setLoading(false)
            }
        };

        setLoading(true)
        fetchTransactions();
    }, []);

    const computeVerificationHashes = transactions
        .filter(tx => tx.type === 'compute_verification')
        .map(tx => tx.hash);

    const computeRequest = transactions.find(tx => tx.type === 'compute_request');
    const domainId = computeRequest?.body?.ComputeRequest?.domain_id ?? 'N/A';

    const computeCommitment = transactions.find(tx => tx.type === 'compute_commitment');
    const localTrustHash = computeCommitment?.body?.ComputeCommitment?.lt_root_hash ?? 'N/A';


    return (
        <div
            className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4"
            style={{ border: '1px lightgrey solid' }}
        >
            <div>
                <p><strong>Compute Job #</strong> {job.seqNumber}</p>
                {
                    loading === true ?
                        <Loader /> : <>
                            <p><strong>Requested by:</strong> Karma3 Labs</p>
                            <p><strong>Domain:</strong> {domainId}</p>
                            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
                            <p><strong>Local Trust Hash:</strong> {localTrustHash}</p>
                            <p><strong>Seed Trust Hash:</strong> ?</p>
                            <p><strong>Status:</strong> Complete</p>
                            <p><strong>Verification Hashes:</strong></p> 
                            <div> {computeVerificationHashes.map(hash => <div key={hash}>
                            <Link className='underline' to={`/transactions/${hash}`}>{hash}</Link><br/>
                        </div>)}</div>
                            
                        </>}
            </div>
        </div>
    );
}