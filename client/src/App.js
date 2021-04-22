import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Body } from './components/body/body';
function App() {
  return (
    <React.Fragment>
      <Header />
      <Body />
    </React.Fragment>
  );
}

export default App;
