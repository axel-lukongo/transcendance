import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RestLink } from 'apollo-link-rest';
import App from './App';


const authLink = setContext((_, { headers }) => {
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = user ? user.token : null;
  console.log('token in apollo_client', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// const restLink = new RestLink({
//   uri: () => {
//     const userString = sessionStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;
//     return user ? user.avatar : '';
//   },
// } as any);


const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const apolloClientRest = new ApolloClient({
  link: authLink.concat(restLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
