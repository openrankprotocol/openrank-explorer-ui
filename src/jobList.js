import { useState, useEffect } from "react";
import { getJobs } from './api'
import { Link } from 'react-router-dom';

export default function JobList() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getJobs();
      setEvents(data.jobs);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  return (
          <div>
            <div className="flex flex-row items-center justify-between w-full mx-auto ">
            <h3 className="font-dm-sans font-bold text-lg">Jobs</h3>
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
                      <div className="mt-4">
                        <p><strong>Id:</strong> {event.seqNumber}</p>
                        <div><strong>Transactions:</strong> {event.transactionHashes.map(hash => <div key={hash}>
                            <Link to={`/transactions/${hash}`}>{hash}</Link><br/>
                        </div>)}</div>
                        
                     
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
