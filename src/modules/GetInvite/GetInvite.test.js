import React from 'react';
import { GetInvite } from './GetInvite';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const registered = false;
    const handleModalOpen = () => {
        console.log('handleModalOpen');
    };
    const tree = renderer
        .create(
            <GetInvite
                registered={registered}
                handleModalOpen={handleModalOpen}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

