import React from 'react'

// Textfield
export const TextField = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <h6>{label}</h6>
    <input {...input} {...rest} />
    {meta.touched && meta.error && (
      <div className="error">{meta.error}</div>
    )}
  </div>
)

// Textarea
export const TextArea = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <div className="input-field">
      <h6>{label}</h6>
      <textarea id="textarea" {...input} {...rest} className="materialize-textarea" />
    </div>
    {meta.touched && meta.error && (
      <div className="error">{meta.error}</div>
    )}
  </div>
)

// Radiobutton
export const RadioButton = ({ input, meta, ...rest }) => (
  <input type="radio" {...input} {...rest} />
)

// Switch
export const Switch = ({input, label, meta, ...rest}) => (
  <div className={`formFild switch ${input.name}`}>
    <label>
      <input checked={input.value} type="checkbox" {...input} {...rest} />
      <span className="lever"></span>
    </label>
    {input.value ? 'Visas för andra' : 'Visas inte för andra'}
    {meta.touched && meta.error && (
      <div className="error">{meta.error}</div>
    )}
  </div>
)

// Checkbox
export const Checkbox = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <label>
      <input checked={input.value} className="filled-in" type="checkbox" {...input} {...rest} />
      <span>{label}</span>
    </label>
  </div>
)
