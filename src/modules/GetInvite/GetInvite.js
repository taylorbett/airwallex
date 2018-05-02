import React from 'react';

import { Button } from 'react-bootstrap';

export class GetInvite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    
    render() {
        return (
            <div className="get-invite">
                <h2>A better way to enjoy every day.</h2>
                <p>Be the first to know when we launch</p>
                <Button onClick={() => this.props.handleModalOpen()} bsStyle="primary">Request an invite</Button>
            </div>
        );
    }
}

export default GetInvite;