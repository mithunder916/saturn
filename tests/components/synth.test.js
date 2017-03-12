import React from 'react';
import {expect} from 'chai';
import {mount, shallow} from 'chai-enzyme';
import {spy} from 'sinon';
import Tone from 'tone';

import Synth from '../../app/components/Synth.jsx';
import {Selector} from '../../app/components/Selector.jsx';

describe('Synth component', () => {
  let synth;
  beforeEach('Create component', () => {
    synth = mount(<Synth />);
  });

  it('should render three Selector components', () => {
    expect(synth.find(Selector)).to.have.length(3);
  })

});
