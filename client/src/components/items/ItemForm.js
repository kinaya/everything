import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import ItemFormField from './ItemFormField';

const formFields = [
  {label: 'Items Title', name: 'title'},
  {label: 'Items Description', name: 'body'}
];

class ItemForm extends Component {

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

          {formFields.map(field => { return (
            <Field key={field.name} label={field.label} type="text" name={field.name} component={ItemFormField} />
          )})}

          <button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons right">{this.props.submitIcon}</i>{this.props.submitText}</button>
          <Link style={{marginLeft: '1em'}} to="/items" className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">cancel</i>Avbryt</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({name}) => {
    if(!values[name]) {
      errors[name] = 'You must provide a value'
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'itemForm'
})(withRouter(ItemForm));
