import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { RadioButton, TextField, TextArea } from './ItemFormField';

class ItemForm extends Component {

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

            <Field label="Rubrik" type="text" name="title" component={TextField} />

            <label>Beskrivning</label>
            <div>
              <Field name="body" type="textarea" component={TextArea} />
            </div>

            <label>Visa denna sak för</label>
            <div>
              <p><label><Field name="visibility" component={RadioButton} type="radio" value="all"/><span> Alla</span></label></p>
              <p><label><Field name="visibility" component={RadioButton} type="radio" value="friends"/><span> Mina vänner</span></label></p>
              <p><label><Field name="visibility" component={RadioButton} type="radio" value="hidden"/><span> Visa den inte just nu</span></label></p>
            </div>

          <button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons right">{this.props.submitIcon}</i>{this.props.submitText}</button>
          <Link style={{marginLeft: '1em'}} to="/items" className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">cancel</i>Avbryt</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Du måste ange en rubrik"
  }

  if(!values.body) {
    errors.body = "Du måste ange en beskrivning"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'itemForm',
  initialValues: {visibility: 'all'}
})(withRouter(ItemForm));
