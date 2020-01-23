import React from 'react'

export const TextField = ({input, label, meta}) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{marginBottom: '5px'}} {...input} />
      <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
    </div>
  )
}

export const TextArea = ({input, meta}) => {
  return (
    <div>
      <textarea {...input} className="materialize-textarea" />
      <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
    </div>
  )
};

export const RadioButton = ({ input, meta, ...rest }) => {
  return (
    <input type="radio" {...input} {...rest} />
  )
};

//   <input type="radio" {...input} {...rest} checked={input.value === rest.value} />
