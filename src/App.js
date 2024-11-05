import { useState, useEffect } from "react";
import { GraphQLClient, gql } from 'graphql-request';
// import OpenrankLogoSVG from "@/app/images/openrank_logo.svg";

export default function Home() {
  const [events, setEvents] = useState([]);  
  const [selectedEventIndex, setSelectedEventIndex] = useState(null); 
  const [searchHash, setSearchHash] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);  

  // "05f2acea2d6fd277cbd27762f0e50af7f05765d0eca9f3693adbb1ef126b1605"
  const fetchEvents = async (hash = '') => {
    setIsLoading(true);
    const client = new GraphQLClient('https://or-dev-exp-prod.k3l.io/graphql');
    // const client = new GraphQLClient('http://localhost:3030/graphql');
    const query = gql`
      query($hash: String) {
        events(hash: $hash, limit: 500) {
          eventBody
          eventId
          hash
        }
      }
    `;
    try {
      const variables = { hash: hash ? '"' + hash + '"': null }; 
      const data = await client.request(query, variables);
      console.log({data})
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents(searchHash);
  }, [searchHash]);

  const toggleEventDetails = (index) => {
    setSelectedEventIndex(index === selectedEventIndex ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchHash(event.target.value);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <nav className="w-full opacity-100 border-gray-200 md:max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center py-6 px-[16px] md:py-10 md:px-[100px]">
          <div className="w-[8rem]">
            {/*<Image src={OpenrankLogoSVG} alt="OpenRank Logo" />*/}
          </div>

          <div className="flex text-gray-500 font-dm-sans font-medium text-sm space-x-2 md:space-x-8 items-center">
            <a href="https://docs.openrank.com" className="hover:text-gray-800" target="_blank" rel="noreferrer">
              docs
            </a>
          </div>
        </div>
      </nav>

      <main className="pb-8 px-[16px] mx-auto flex flex-col gap-8 md:gap-8 md:items-center md:px-[100px] md:max-w-[1200px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full mx-auto ">
            <h3 className="font-dm-sans font-bold text-lg">Events</h3>
          </div>
          <br />
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by hash..."
              value={searchHash}
              onChange={handleSearchChange}
              className="border px-4 py-2 w-full"
            />
          </div>

          <div>
            {isLoading ? (
              <p>Loading events...</p>
            ) : events.length > 0 ? (
              <div>
                {events
                  .filter((a, index) => selectedEventIndex === null || selectedEventIndex === index)
                  .map((event, index) => (
                    <div
                      className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4"
                      key={index}
                      style={{ border: '1px black solid' }}
                    >
                      <p style={{ cursor: 'pointer' }} onClick={() => toggleEventDetails(index)}>
                        <strong>Hash:</strong> {event.hash}
                      </p>
             
                      <div className="mt-4">
                        <p><strong>Type:</strong> {event.eventBody.tx.kind}</p>
                        <p><strong>From:</strong> {event.eventBody.tx.from}</p>
                        <p><strong>To:</strong> {event.eventBody.tx.to}</p>
                        <p><strong>Body Size:</strong> {(event.eventBody.tx.body || []).length}</p>
                        {event.eventBody !== null && 
                        <pre><strong>Decoded:</strong> {JSON.stringify(event.eventBody, null, '\t')}</pre>
                      }
                        {selectedEventIndex !== null && (
                          <>
                            <p style={{ cursor: 'pointer', wordBreak: 'break-all', whiteSpace: 'normal' }}>
                              <strong>Body:</strong> {event.eventBody.tx.body}
                            </p>
                            <p style={{ cursor: 'pointer', wordBreak: 'break-all', whiteSpace: 'normal' }}>
                              <strong>Signature:</strong> {JSON.stringify(event.eventBody.tx.signature)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
