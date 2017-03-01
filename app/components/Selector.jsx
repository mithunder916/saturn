import React, { Component } from 'react';

// dispatcher is an optional prop for selectors that change a value stored in redux store (synth params)
export const Selector = props => {
  return (
    <div>
      <select
      name={props.name}
      value={props.value}
      onChange={(e) => {
        props.changeOption(e);
        props.dispatcher ? props.dispatcher(e.target.value, e.target.name.slice(-1)) : null;
        }}
        defaultValue={props.defaultValue}>
      {props.options.map(option => {
        return (
          <option value={option} key={option.toString()}>{option}
          </option>
        )
      })}
      </select>
    </div>
  )
}
