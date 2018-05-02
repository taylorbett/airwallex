import React from 'react';

export class InviteModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSending: false,
            errorMessage: '',
            fullName: '',
            email: '',
            confirmEmail: '',
            registered: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            fullName: event.target.value,
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleConfirmEmailChange(event) {
        this.setState({
            confirmEmail: event.target.value,
        });
    }
    
    async submitRequest(event) {
        event.preventDefault();
        this.setState({
            isSending: true,
            errorMessage: '',
        });
        const fetchUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
        const requestBody = JSON.stringify({
            name: this.state.fullName,
            email: this.state.email,
        });
        const request = await fetch(fetchUrl, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: requestBody,
        }).then(res => {
          return res.json();
        })
        console.log(request);
        if (request.errorMessage !== undefined) {
            this.setState({
                errorMessage: request.errorMessage,
            });
        } else {
            this.setState({
                registered: true,
            });
        }
    }

    renderUnregistered() {
        return (
            <form onSubmit={this.submitRequest}>
                <input type="text" placeholder="Full name" value={this.state.fullName} onChange={this.handleNameChange} />
                <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
                <input type="text" placeholder="Confirm email" value={this.state.confirmEmail} onChange={this.handleConfirmEmailChange}/>
                <input type="submit" value="Send request" />
                { this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null }
            </form>
        );
    }

    renderRegistered() {
        return (
            <p>Thanks for registering!</p>
        );
    }
    
    render() {
        const modalStyles = {
            display: this.props.showModal ? 'block' : 'none',
        }
        return (
            <div className="invite-modal" style={modalStyles}>
                {this.state.registered ? this.renderRegistered() : this.renderUnregistered()}
            </div>
        );
    }
}

export default InviteModal;