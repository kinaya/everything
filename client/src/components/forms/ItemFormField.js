import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export const TextField = ({input, label, meta, ...rest}) => (
  <div>
    <label>{label}</label>
    <input {...input} {...rest} />
    <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
  </div>
)

export const TextArea = ({input, label, meta, ...rest}) => (
  <div>
    <textarea {...input} {...rest} className="materialize-textarea" />
    <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
  </div>
)

export const RadioButton = ({ input, meta, ...rest }) => {
  return (
    <input type="radio" {...input} {...rest} />
  )
};

export const Checkbox = ({input, meta, ...rest}) => {
  return (
    <div className="switch">
      <label>
        <input checked={input.value} type="checkbox" {...input} {...rest} />
        <span className="lever"></span>
      </label>
      {input.value ? 'Visas för utlåning' : 'Visas inte för utlåning'}
    </div>
  )
}




export const DateTimePicker = ({ input, meta, ...rest}) => {
  console.log('Value', input)
  return (
    <DatePicker
      {...input}
      dateForm="MM/DD/YYY"
      date={input.value}
      onDateChange={input.onChange}
    />
  )
}




// For images

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

export const FileUpload = ({
  input: { value: omitValue, onChange, onBlur, ...input },
  meta: omitMeta,
  ...props
}) => {
  return (
    <div>
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
};

//   <input type="radio" {...input} {...rest} checked={input.value === rest.value} />
