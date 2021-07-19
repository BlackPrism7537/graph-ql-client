import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { CookiesProvider } from 'react-cookie';
import 'dotenv/config'

import App from './App';
import { getAccessToken } from './AccessToken';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  request: (operation) => {
    operation.setContext({
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });
    return operation;
  },
});


ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
);

