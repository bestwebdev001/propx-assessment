import { Environment, FetchFunction, Network, RecordSource, Store } from 'relay-runtime';
import { GRAPHQL_ENDPOINT, API_TOKEN } from '@env';

const fetchQuery: FetchFunction = async (operation, variables) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
};

export const relayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
