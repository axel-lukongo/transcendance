import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

const authLink = setContext((_, { headers }) => {
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = user? user.token : null;
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

 const apollo_client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
    <ApolloProvider client={apollo_client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
	// {console.log('sdsdf');}
);
