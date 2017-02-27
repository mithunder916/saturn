import React, { Component } from 'react';

// modularize so that it runs a props function
export default class Dial extends Component {
  render(){
    const { nxDefine } = this.props;
    return (
      <div>
        <canvas
        data-type="dial"
        ref={canvas => nxDefine(canvas)}
        onClick={(e)=> this.props.changeAttack(5,2)}>
        </canvas>
      </div>
    )
  }
}
