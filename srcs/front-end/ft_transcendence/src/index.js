import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import App from './components/App';

const cache = new InMemoryCache();

// Récupération des données du cache depuis SessionStorage (s'il en existe)
const sessionCache = window.sessionStorage.getItem('apollo-cache');
if (sessionCache) {
  cache.restore(JSON.parse(sessionCache));
}

// Enregistrement des données du cache dans SessionStorage avant la fermeture de l'application
window.addEventListener('beforeunload', () => {
  window.sessionStorage.setItem('apollo-cache', JSON.stringify(cache.extract()));
});

const apollo_client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Utilisez l'adresse IP du conteneur "back-end"
  cache,
});

ReactDOM.render(
  <ApolloProvider client={apollo_client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);