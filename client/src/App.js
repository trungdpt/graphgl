import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Body } from './components/body/body';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  }
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Body />
      </ApolloProvider>
    </>
  );
}

export default App;
