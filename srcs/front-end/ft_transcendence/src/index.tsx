import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, split} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import App from './App';

const userString = sessionStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
const token = user? user.token : null;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
   credentials: 'include'
 });

export const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true,
  connectionParams: {
    headers: token
  }
});

const apollo_client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ApolloProvider client={apollo_client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApolloProvider>
);
