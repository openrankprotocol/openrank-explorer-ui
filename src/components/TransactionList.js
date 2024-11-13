export default function TransactionList({ transactions }) {
  return (
    <div>
      {transactions.length > 0 ? (
        <div>
          {transactions.map((event, index) => (
            <div
              className="px-6 py-6 flex flex-col w-full mx-auto bg-white mt-4 mb-4"
              key={index}
              style={{ border: '1px lightgrey solid' }}
            >
              <div>
                <p><strong>Hash:</strong> {event.hash}</p>
                <p><strong>Job #</strong> {event.jobSeqNumber}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>From:</strong> {event.from}</p>
                <p><strong>To:</strong> {event.to}</p>

                {event.body !== null &&
                  <pre><strong>Decoded:</strong> {JSON.stringify(event.body, null, '\t')}</pre>
                }
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
