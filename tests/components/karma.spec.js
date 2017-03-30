const expect = chai.expect;
// import React from 'react';
// import { shallow } from 'enzyme';

describe('check window', () => {
    it('checks AudioContext', () => {
        expect(window.AudioContext).to.be.ok;
        expect(window.crypto).to.be.ok;
    });
});
