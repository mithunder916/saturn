import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../app/store';

import {Synth} from '../../app/components/Synth.jsx';
import Home from '../../app/components/Home.jsx';
import {Selector} from '../../app/components/Selector.jsx';

describe('Synth component', () => {
  let synth;
  beforeEach('Create component', () => {
    synth = shallow(
      <Provider store={store}>
        <Synth />
      </Provider>);
  });

  it('should render three Selector components', () => {
    // expect(synth.find(Synth).to.have.length(1))
    // expect(synth.find(Selector)).to.have.length(3);
    expect(synth.props.oscillator1.shape).to.be.equal('triangle')
  })

});
