import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

// import App from './components/App';
import CreatUsr from './components/creat_usr';
import CreatMsg from './components/message/creat_message';

const apollo_client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Utilisez l'adresse IP du conteneur "back-end"
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <ApolloProvider client={apollo_client}>
	<CreatUsr/>
	<CreatMsg />
    {/* <App /> */}
  </ApolloProvider>,
  document.getElementById('root')
);
