import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, ApolloLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import App from './App';
import { WebSocketProvider } from './WebSocketProvider'

const authLink = setContext((_, { headers }) => {
  
  const token  = sessionStorage.getItem('userToken');
  console.log('token front end ', token);
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


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Gérer les erreurs GraphQL ici
    graphQLErrors.forEach(error => {
      console.log('Erreur GraphQL :', error.message);
    });
  }
  
  if (networkError) {
    // Gérer les erreurs réseau ici
    if (networkError.message.includes('401')) {
      sessionStorage.removeItem('userToken');
      window.location.reload();
      console.log('erreur 401');
    }
    else if (networkError.message.includes('404'))
      console.log('erreur 404');

    console.log('Erreur réseau :', networkError);

  }
});


const apollo_client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={apollo_client}>
    <BrowserRouter>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </BrowserRouter>
  </ApolloProvider>
);
