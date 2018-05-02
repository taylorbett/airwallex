/*eslint no-useless-escape: "off"*/
import React from 'react';

import {
    Alert, 
    Button,
    ControlLabel,
    FormGroup,
    FormControl,
    Modal 
} from 'react-bootstrap';

export class InviteModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSending: false,
            errorMessage: '',
            form: {
                fullName: '',
                fullNameMessage: '',
                email: '',
                emailMessage: '',
                confirmEmail: '',
                confirmEmailMessage: '',
            },
            registered: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            form: Object.assign(this.state.form, {
                fullName: event.target.value,
            }),
        });
    }

    handleEmailChange(event) {
        this.setState({
            form: Object.assign(this.state.form, {
                email: event.target.value,
            }),
        });
    }

    handleConfirmEmailChange(event) {
        this.setState({
            form: Object.assign(this.state.form, {
                confirmEmail: event.target.value,
            }),
        });
    }

    handleClose() {
        this.props.handleModalClose();
    }
    
    async submitRequest(event) {
        event.preventDefault();
        this.setState({
            isSending: true,
            errorMessage: '',
        });
        const fetchUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
        const requestBody = JSON.stringify({
            name: this.state.form.fullName,
            email: this.state.form.email,
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
                apiMessage: request.errorMessage,
            });
        } else {
            this.setState({
                registered: true,
            });
        }
    }

    getNameValidationState() {
        const value = this.state.form.fullName;
        if (value) {
            if (value.length >= 3) {
                return 'success';
            }
            // this.setState({
            //     form: Object.assign(this.state.form, {
            //         confirmEmailMessage: 'Name must be at least 3 characters long',
            //     }),
            // });
            return 'error';
        }
        return null;
    }

    getEmailValidationState() {
        const value = this.state.form.email;
        if (value) {
            //  Note: not perfect validation, would probably use a popular validation library if you really cared about FED email validation.
            const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
            return emailRegex.test(String(value).toLowerCase()) ? 'success' : 'error';
        }
        return null;
    }

    getConfirmEmailValidationState() {
        const value = this.state.form.confirmEmail;
        if (value && this.state.form.email) {
            if (value === this.state.form.email) {
                return 'success';
            } else {
                // this.setState({
                //     form: Object.assign(this.state.form, {
                //         confirmEmailMessage: 'Email confirmation does not match',
                //     }),
                // });
                return 'error';
            }
        }
        return null;
    }

    renderUnregistered() {
        return (
            <form onSubmit={this.submitRequest}>
                <FormGroup
                    controlId="fullNameText"
                    validationState={this.getNameValidationState()}
                >
                    <ControlLabel>Full name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.form.fullName}
                        placeholder="Full name"
                        onChange={this.handleNameChange}
                    />
                    {this.state.form.fullNameMessage ? <Alert bsStyle="danger">{this.state.form.fullNameMessage}</Alert> : null}
                </FormGroup>
                <FormGroup
                    controlId="emailText"
                    validationState={this.getEmailValidationState()}
                >
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.form.email}
                        placeholder="Email"
                        onChange={this.handleEmailChange}
                    />
                    {this.state.form.emailMessage ? <Alert bsStyle="danger">{this.state.form.emailMessage}</Alert> : null}
                </FormGroup>
                <FormGroup
                    controlId="confirmEmailText"
                    validationState={this.getConfirmEmailValidationState()}
                >
                    <ControlLabel>Confirm email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.form.confirmEmail}
                        placeholder="Confirm email"
                        onChange={this.handleConfirmEmailChange}
                    />
                    {this.state.form.confirmEmailMessage ? <Alert bsStyle="danger">{this.state.form.confirmEmailMessage}</Alert> : null}
                </FormGroup>
                <Button type="submit" bsStyle="primary" >Submit</Button>
                { this.state.errorMessage ?
                    <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
                : null }
            </form>
        );
    }

    renderRegistered() {
        return (
            <p>Thanks for registering!</p>
        );
    }
    
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Request an invite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.registered ? this.renderRegistered() : this.renderUnregistered()}
                </Modal.Body>
            </Modal>
        );
    }
}

export default InviteModal;