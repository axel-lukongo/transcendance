// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import App from './App';

// const apollo_client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql', // Utilisez l'adresse IP du conteneur "back-end"
//   cache: new InMemoryCache(),
// });

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <ApolloProvider client={apollo_client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals




import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';


const userString = sessionStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const authLink = setContext((_, { headers }) => {
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
        <App />
      </ApolloProvider>
  </React.StrictMode>
);
