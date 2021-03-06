/*eslint no-useless-escape: "off"*/
import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

import {
    Alert, 
    Button,
    ControlLabel,
    FormGroup,
    FormControl,
    Modal 
} from 'react-bootstrap';
import Spinner from 'react-spinkit';

export class InviteModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSending: false,
            errorMessage: '',
            form: {
                fullName: '',
                fullNameMessage: 'Name must be at least 3 characters',
                email: '',
                emailMessage: 'Please enter a valid email',
                confirmEmail: '',
                confirmEmailMessage: 'Email confirmation does not match',
            },
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.readyToSubmit = this.readyToSubmit.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    getStyles() {
        return {
            container: {
                textAlign: 'center',
            },
            modalBody: {
                padding: '40px 20px',
            },
            button: {
                borderRadius: '0px',
                backgroundColor: 'transparent',
                border: '1px solid #222',
                color: '#222',
            },
            ctrlGroup: {
                textAlign: 'left',
            }
        };
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

    readyToSubmit() {
        if ((this.getNameValidationState() && this.getNameValidationState() !== 'success') ||
            (this.getEmailValidationState() && this.getEmailValidationState() !== 'success') ||
            (this.getConfirmEmailValidationState() && this.getConfirmEmailValidationState() !== 'success') ||
            (!this.getNameValidationState() || !this.getEmailValidationState() || !this.getConfirmEmailValidationState())
        ) {
            return false;
        }
        return true;
    }
    
    async submitRequest(event) {
        event.preventDefault();
        if (!this.readyToSubmit()) {
            return false;
        }
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
        });
        if (request.errorMessage !== undefined) {
            this.setState({
                isSending: false,
                errorMessage: request.errorMessage,
            });
        } else {
            this.setState({
                isSending: false,
            });
            this.props.handleRegistration();
        }
    }

    getNameValidationState() {
        const value = this.state.form.fullName;
        if (value) {
            if (value.length >= 3) {
                return 'success';
            }
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
                return 'error';
            }
        }
        return null;
    }

    renderUnregistered(styles) {
        return this.state.isSending ?
            <Spinner name="three-bounce" fadeIn='none' />
        :
            <form onSubmit={this.submitRequest} className="invite-modal-form">
                <FormGroup
                    style={styles.ctrlGroup}
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
                    {this.getNameValidationState() === 'error' ? <Alert bsStyle="danger">{this.state.form.fullNameMessage}</Alert> : null}
                </FormGroup>
                <FormGroup
                    style={styles.ctrlGroup}
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
                    {this.getEmailValidationState() === 'error' ? <Alert bsStyle="danger">{this.state.form.emailMessage}</Alert> : null}
                </FormGroup>
                <FormGroup
                    style={styles.ctrlGroup}
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
                    {this.getConfirmEmailValidationState() === 'error'  ? <Alert bsStyle="danger">{this.state.form.confirmEmailMessage}</Alert> : null}
                </FormGroup>
                { this.state.errorMessage ?
                    <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
                : null }
                <Button style={styles.button} type="submit" bsStyle="primary" disabled={!this.readyToSubmit()}>Submit</Button>
            </form>;
    }

    renderRegistered(styles) {
        return (
            <React.Fragment>
                <p>Thanks for registering!</p>
                <p>You will be one of the first to experience Broccoli &amp; Co. when we launch.</p>
                <Button style={styles.button} onClick={() => this.handleClose()}>Close</Button>
            </React.Fragment>
        );
    }
    
    render() {
        const styles = this.getStyles();
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose} style={styles.container}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.registered ? 'All done!' : 'Request an invite'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    {this.props.registered ? this.renderRegistered(styles) : this.renderUnregistered(styles)}
                </Modal.Body>
            </Modal>
        );
    }
}

InviteModal.defaultProps = {
    showModal: false,
    registered: false,
};

InviteModal.propTypes = {
    showModal: PropTypes.bool,
    handleModalClose: PropTypes.func,
    handleRegistration: PropTypes.func,
    registered: PropTypes.bool,
};

export default Radium(InviteModal);