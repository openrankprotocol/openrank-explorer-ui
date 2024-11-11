import { useState, useEffect } from "react";
import { getTransactions } from './api'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function TransactionList() {
  const [events, setEvents] = useState([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [searchHash, setSearchHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async (hash = '') => {
    setIsLoading(true);
    try {
      const data = await getTransactions(hash);
      setEvents(data.transactions);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents(searchHash);
  }, [searchHash]);



  return (
          <div>
            <div className="flex flex-row items-center justify-between w-full mx-auto ">
            <h3 className="font-dm-sans font-bold text-lg">Transactions</h3>
          </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : events.length > 0 ? (
              <div>
                {events
                  
                  .map((event, index) => (
                    <div
                      className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4"
                      key={index}
                      style={{ border: '1px lightgrey solid' }}
                    >
                      <p >
                        <strong>Hash:</strong> {event.hash}
                      </p>

                      <div className="mt-4">
                        <p><strong>Type:</strong> {event.type}</p>
                        <p><strong>From:</strong> {event.body.from}</p>
                        <p><strong>To:</strong> {event.body.to}</p>
                        
                        {event.body !== null &&
                          <pre><strong>Decoded:</strong> {JSON.stringify(event.body, null, '\t')}</pre>
                        }
                        {/*selectedEventIndex !== null && (
                          <>
                            <p style={{ cursor: 'pointer', wordBreak: 'break-all', whiteSpace: 'normal' }}>
                              <strong>Body:</strong> {event.eventBody.tx.body}
                            </p>
                            <p style={{ cursor: 'pointer', wordBreak: 'break-all', whiteSpace: 'normal' }}>
                              <strong>Signature:</strong> {JSON.stringify(event.eventBody.tx.signature)}
                            </p>
                          </>
                        )*/}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>No events found.</p>
            )}
          </div>

  );
}
