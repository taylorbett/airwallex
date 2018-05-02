import React from 'react';

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
                <button onClick={() => this.props.handleModalOpen()}>Request an invite</button>
            </div>
        );
    }
}

export default GetInvite;