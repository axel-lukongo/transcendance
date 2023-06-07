import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import App from './App';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const apollo_client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Utilisez l'adresse IP du conteneur "back-end"
  cache: new InMemoryCache(),
});

export default client;


ReactDOM.render(
  <ApolloProvider client={apollo_client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
