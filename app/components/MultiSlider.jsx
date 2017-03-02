import React, { Component } from 'react';

// when the drum machine can add more rows, its multislider will have to handle adding more sliders
// this will have to occur in the Home component's nxLoad function - possibly put that on Home.jsx's state and have a function in MultiSlider update that state
// can also set slider numbers with .setNumberOfSliders()
export default class MultiSlider extends Component {
  binder(event){
    const { dispatcher, change, id } = this.props
    // event.persist()
    $(`#${id}`).bind('mouseleave', function (){
      $('body').one('mouseup', function () {
        change(window[id].val)
        dispatcher(window[id].val)
        $(`#${id}`).unbind('mouseleave')
      })
    })
  }

  render(){
    const { id, nxDefine, change, dispatcher } = this.props;
    return (
      <div className='multislider'>
        <canvas
        data-type="multislider"
        id={id}
        ref={(canvas) => nxDefine(canvas)}
        onMouseDown={(e) => this.binder(e)}
        onMouseUp={(e)=> {
          change(window[id].val)
          dispatcher(window[id].val)
          $(`#${id}`).unbind('mouseleave')
          }}>
        >
        </canvas>
      </div>
    )
  }
}
