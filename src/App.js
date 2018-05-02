import React, { Component } from 'react';
import './App.css';
import GetInvite from './modules/GetInvite';
import Footer from './core/components/Footer';
import InviteModal from './modules/InviteModal';

import brocolliImg from './img/broccoli.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteModal: false,
    }

    this.inviteModalOpen = this.inviteModalOpen.bind(this);
    this.inviteModalClose = this.inviteModalClose.bind(this);
  }

  inviteModalOpen() {
    this.setState({
      inviteModal: true,
    });
  }

  inviteModalClose() {
    this.setState({
      inviteModal: false,
    });
  }
  
  render() {
    const bgStyles = {
      backgroundImage: `url(${brocolliImg}`,
    };

    return (
      <div className="App">
        <div className="App-background" style={bgStyles}/>
        <header className="App-header">
          <h1 className="App-title">Broccoli &amp; Co.</h1>
        </header>
         <GetInvite handleModalOpen={this.inviteModalOpen} />
         <Footer />
         <InviteModal showModal={this.state.inviteModal} handleModalClose={this.inviteModalClose} />
      </div>
    );
  }
}

export default App;
 