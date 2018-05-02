import React from 'react';
import { InviteModal } from './InviteModal';
import renderer from 'react-test-renderer';

describe('InviteModal', () => {
    it('renders correctly', () => {
        const showModal = false;
        const registered = false;
        const handleModalClose = () => {
            console.log('handleModalClose');
        };
        const handleRegistration = () => {
            console.log('handleRegistration');
        };
        const tree = renderer
            .create(
                <InviteModal 
                    showModal={showModal}
                    registered={registered}
                    handleModalClose={handleModalClose}
                    handleRegistration={handleRegistration}
                />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});