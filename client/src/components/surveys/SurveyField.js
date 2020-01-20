import React from 'react'

export default ({input, label, meta}) => {
  // We attach all the props.input on <input />
  return (
    <div>
      <label>{label}</label>
      <input style={{marginBottom: '5px'}} {...input} />
      <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
    </div>
  )
}
