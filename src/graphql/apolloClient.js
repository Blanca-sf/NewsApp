import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URI } from '@env'; 

const client = new ApolloClient({
  uri: "https://newsappb.xyz/graphql",
  cache: new InMemoryCache(),
});

export default client;
