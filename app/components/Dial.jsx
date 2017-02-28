import React, { Component } from 'react';

export default class Dial extends Component {

  // componentDidMount(){
  //   document.querySelector('attackMod').addEventListener('mouseup', function(){
  //     console.log('mouse up fired')
  //   })
  // }

  binder(event){
    // console.log(document.body)
    // console.log(event.target).bind
    event.persist()
    event.target.addEventListener('mouseleave', function (){
      document.body.addEventListener('mouseup', function () {
        // console.log(event.target)
        // event.target.mouseup()
        event.target.dispatchEvent(new Event('mouseup'))
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
          }}>
        </canvas>
      </div>
    )
  }
}
