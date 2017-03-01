import React, { Component } from 'react';

export default class Slider extends Component {

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

  render(){
    const { nxDefine, dispatcher, changeRouter, id, args } = this.props;
    return (
      <div>
        <canvas
        id={id}
        data-type="slider"
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
