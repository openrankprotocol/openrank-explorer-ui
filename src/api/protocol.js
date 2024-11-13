import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://or-dev-exp-prod.k3l.io/graphql');
// const client = new GraphQLClient('http://localhost:3030/graphql');

// "05f2acea2d6fd277cbd27762f0e50af7f05765d0eca9f3693adbb1ef126b1605"
export const getTransactions = async (hash) => {
    const query = gql`
  query($hash: String) {
    transactions(hash: $hash, limit: 500) {
      body
      id
      type
      hash
      to,
      from,
      jobSeqNumber
    }
  }
`;
    try {
        const variables = { hash: hash ? hash : null };
        const data = await client.request(query, variables);
        console.log({ data })
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }

}

export const getTransactionsByJobSeqNumber = async (jobSeqNumber) => {
  console.log('getTransactionsByJobSeqNumber')
  const query = gql`
query($jobSeqNumber: String) {
  transactions(jobSeqNumber: $jobSeqNumber, limit: 500) {
    body
    id
    type
    hash
    to,
    from,
    jobSeqNumber
  }
}
`;
  try {
      const variables = { jobSeqNumber: jobSeqNumber ? jobSeqNumber : null };
      const data = await client.request(query, variables);
      return data;
  } catch (error) {
      console.error('Error fetching events:', error);
  }

}

export const getJobs = async () => {
    const query = gql`
  query() {
    jobs(limit: 500) {
        seqNumber
        transactionHashes
    }
  }
`;
    try {
        const variables = { };
        const data = await client.request(query, variables);
        console.log({ data })
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }

}