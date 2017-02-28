import React, { Component } from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';

export class Filter extends Component {
  constructor(props) {
    super(props);
    const synthFilter = new Tone.Filter({
      type: 'highpass',
      frequency: 200,
      rolloff: -12,
      Q: 1
    })
  }
  render() {
    return (
    <div></div>
    )
  }
}
/* REDUX CONTAINER */
// const mapStateToProps = ({  }) => ({  })

// const mapDispatchToProps = dispatch => ({ })

// export default connect(mapStateToProps,mapDispatchToProps)(Filter);
