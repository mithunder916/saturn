import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exampleUpdate } from '../ducks/rename';

/* Think of this Home component as your main content. If you add new routes,
their content will replace what you see here (when you navigate to them).  */

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { example, update, clear } = this.props

    return (
      <div>
        <h2>React + Redux Template</h2>
      </div>
    )
  }
}

/* REDUX CONTAINER */

const mapStateToProps = ({ example }) => ({ example })

const mapDispatchToProps = dispatch => ({
  update: () => dispatch(exampleUpdate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
