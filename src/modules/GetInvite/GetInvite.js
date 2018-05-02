import React from 'react';
import Radium from 'radium';

import { Button } from 'react-bootstrap';

export class GetInvite extends React.PureComponent {
    renderRegistered() {
        return (
            <React.Fragment>
                <h2>A better way to enjoy every day.</h2>
                <p>Thanks for registering!</p>
                <p>You will be one of the first to experience Broccoli &amp; Co. when we open.</p>
                <Button onClick={() => this.props.handleModalOpen()} bsStyle="success">Registered &#10004;</Button>
            </React.Fragment>
        );
    }
    
    renderUnregistered() {
        return (
            <React.Fragment>
                <h2>A better way to enjoy every day.</h2>
                <p>Be the first to know when we launch</p>
                <Button onClick={() => this.props.handleModalOpen()} bsStyle="primary">Request an invite</Button>
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <div className="get-invite">
                {this.props.registered ? this.renderRegistered() : this.renderUnregistered()}
            </div>
        );
    }
}

export default GetInvite;