import React, { Component } from 'react';

export default class Dial extends Component {

  // allows users to let go of dial off of the dial element and still update the synths
  // calling .mouseup or .dispatchEvent does NOT work in React
  binder(event){
    const { dispatcher, changeRouter, id, args } = this.props
    // event.persist()
    $(`#${id}`).bind('mouseleave', function (){
      $('body').one('mouseup', function () {
        changeRouter(window[id].val.value, ...args)
        dispatcher(window[id].val.value)
        $(`#${id}`).unbind('mouseleave')
      })
    })
  }

  // write wrapper function that calls changeRouter and dispatcher
  // do some type of spread operation - pass an array of args as a prop, then spread them in the input to changeRouter

  // also pass min and max values
  render(){
    const { nxDefine, dispatcher, changeRouter, id, args, range } = this.props;
    return (
      <div className='dial'>
        <canvas
        id={id}
        data-type="dial"
        min={range[0]}
        max={range[1]}
        label={this.props.label ? this.props.label : null}
        ref={canvas => {nxDefine(canvas)}}
        onMouseDown={(e)=> this.binder(e)}
        onMouseUp={(e)=> {
          changeRouter(window[id].val.value, ...args)
          dispatcher(window[id].val.value)
          $(`#${id}`).unbind('mouseleave')
          }}>
        </canvas>
      </div>
    )
  }
}
