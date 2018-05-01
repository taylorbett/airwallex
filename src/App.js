import React, { Component } from 'react';
import './App.css';
import GetInvite from './modules/GetInvite';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Broccoli &amp; Co.</h1>
        </header>
         <GetInvite />
      </div>
    );
  }
}

export default App;
