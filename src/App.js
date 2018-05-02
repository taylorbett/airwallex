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
      registered: false,
    }

    this.inviteModalOpen = this.inviteModalOpen.bind(this);
    this.inviteModalClose = this.inviteModalClose.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
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

  handleRegistration() {
    this.setState({
      registered: true,
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
         <GetInvite 
          handleModalOpen={this.inviteModalOpen}
          registered={this.state.registered}
        />
         <Footer />
         <InviteModal
          showModal={this.state.inviteModal}
          handleModalClose={this.inviteModalClose}
          handleRegistration={this.handleRegistration}
          registered={this.state.registered}
        />
      </div>
    );
  }
}

export default App;
 