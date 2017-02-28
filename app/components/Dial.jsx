import React, { Component } from 'react';

export default class Dial extends Component {

  // allows users to let go of dial off of the dial element and still update the synths
  // calling .mouseup or .dispatchEvent does NOT work in React
  binder(event){
    const { nxDefine, dispatcher, changeAllParams, module, param, id } = this.props
    event.persist()
    $(`#${id}`).bind('mouseleave', function (){
      $('body').one('mouseup', function () {
        changeAllParams(module, param, window[id].val.value)
        dispatcher(window[id].val.value)
        $(`#${id}`).unbind('mouseleave')
      })
    })
  }

  render(){
    const { nxDefine, dispatcher, changeAllParams, module, param, id } = this.props;
    return (
      <div>
        <canvas
        id={id}
        data-type="dial"
        ref={canvas => {nxDefine(canvas)}}
        onMouseDown={(e)=> this.binder(e)}
        onMouseUp={(e)=> {
          changeAllParams(module, param, window[id].val.value)
          dispatcher(window[id].val.value)
          $(`#${id}`).unbind('mouseleave')
          }}>
        </canvas>
      </div>
    )
  }
}
