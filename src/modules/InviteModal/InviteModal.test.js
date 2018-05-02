import React from 'react';
import { InviteModal } from './InviteModal';
import { shallow } from 'enzyme';

describe('InviteModal', () => {
    // Note: Ran out of time to add mocks for network requests and test the scenarios here

    // it('should set registered on successful submission', () => {
    //     const inviteModalComponent = shallow(<InviteModal />);
    //     const fakeEvent = { preventDefault: () => console.log('preventDefault')};
    //     inviteModalComponent.setState({
    //         form: {
    //             fullName: 'Test User',
    //             email: 'test@gmail.com',
    //             confirmEmail: 'test@gmail.com',
    //         },
    //     });
    //     inviteModalComponent.find('.invite-modal-form').simulate('submit', fakeEvent);
    //     expect(inviteModalComponent.props().registered).toEqual(true);
    // });

    // it('should set server error messages', () => {
    //     const inviteModalComponent = shallow(<InviteModal />);
    //     const fakeEvent = { preventDefault: () => console.log('preventDefault')};
    //     inviteModalComponent.setState({
    //         form: {
    //             fullName: 'Duplicate User',
    //             email: 'usedemail@airwallex.com',
    //             confirmEmail: 'usedemail@airwallex.com',
    //         },
    //     });
    //     inviteModalComponent.find('.invite-modal-form').simulate('submit', fakeEvent);
    //     expect(inviteModalComponent.props().registered).toEqual('Bad Request: Email is already in use');
    //     expect(inviteModalComponent.props().registered).toEqual(false);
    // });
});