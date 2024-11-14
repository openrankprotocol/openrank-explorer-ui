import { useState, useEffect } from "react";
import { getJobs } from '../api/protocol'
import { Link } from 'react-router-dom';
import Loader from '../ui/loader'
import Job from '../components/Job'

export default function JobDetailPage() {
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
        <Loader />
      ) : events.length > 0 ? (
        <div>
          {events
            .map((event, index) => (
              <div key={event.seqNumber}>
                <Job job={event} />
              </div>
            ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>

  );
}
