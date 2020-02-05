import React from 'react'
import InputMap from './InputMap';

// Textfield
export const TextField = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <h6>{label}</h6>
    <input {...input} {...rest} />
    <div className="error">{meta.touched && meta.error}</div>
  </div>
)

// Textarea
export const TextArea = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <div className="input-field">
      <h6>{label}</h6>
      <textarea id="textarea" {...input} {...rest} className="materialize-textarea" />
    </div>
    <div className="error">{meta.touched && meta.error}</div>
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

// Map
export const Map = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <h6>{label}</h6>
    <InputMap {...input} {...rest} />
    <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
  </div>
)

// FileUpload
const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
export const FileUpload = ({
  input: { value: omitValue, onChange, onBlur, ...input },
  meta: omitMeta,
  ...props
}) => (
  <div className={`formField ${input.name}`}>
    <input
      name="file"
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  </div>
);
