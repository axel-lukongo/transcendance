import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createRoot } from 'react-dom';

import App from './components/App';

const apollo_client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Utilisez l'adresse IP du conteneur "back-end"
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apollo_client}>
    <App />
  </ApolloProvider>
);
