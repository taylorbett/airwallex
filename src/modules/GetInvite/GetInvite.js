import React from 'react';
import Radium from 'radium';

import { Button } from 'react-bootstrap';

export class GetInvite extends React.PureComponent {
    getStyles() {
        return {
            container: {
                padding: '40px 20px',
            },
            text: {
                margin: '20px 0px',
            },
            button: {
                borderRadius: '0px',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
            }
        };
    }
    
    renderRegistered(styles) {
        return (
            <React.Fragment>
                <h2 style={styles.text}>A better way to enjoy every day.</h2>
                <p style={styles.text}><span role="img" aria-label="party-emoji">🎉</span> Thanks for registering!</p>
                <p style={styles.text}>You will be one of the first to experience Broccoli &amp; Co. when we open.</p>
                <Button style={styles.button} onClick={() => this.props.handleModalOpen()} bsStyle="success">Registered &#10004;</Button>
            </React.Fragment>
        );
    }
    
    renderUnregistered(styles) {
        return (
            <React.Fragment>
                <h2 style={styles.text}>A better way to enjoy every day.</h2>
                <p style={styles.text}>Be the first to know when we launch</p>
                <Button style={styles.button} onClick={() => this.props.handleModalOpen()} bsStyle="primary">Request an invite</Button>
            </React.Fragment>
        );
    }
    
    render() {
        const styles = this.getStyles();
        return (
            <div className="get-invite" style={styles.container}>
                {this.props.registered ? this.renderRegistered(styles) : this.renderUnregistered(styles)}
            </div>
        );
    }
}

export default Radium(GetInvite);