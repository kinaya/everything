import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { TextField, TextArea, FileUpload, Checkbox } from './ItemFormField';

class ItemForm extends Component {

  constructor(props) {
    super(props);
    this.state = { fileUrl: false };
  }

  onSubmit = (formValues) => {
    return this.props.onSubmit(formValues, this.props.history)
  }

  onChange = async (formValues) => {
    const fileUrl = await this.props.onImageChange(formValues)
    this.props.change('fileUrl', fileUrl)
    this.setState({fileUrl: fileUrl})
  }


  render() {

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">


            <label>Ladda upp en bild</label>
            {this.state.fileUrl && (
              <img className="file-preview" src={this.state.fileUrl} alt="preview" />
            )}
            <Field type="hidden" name="fileUrl" component="input" />
            <Field name="file" type="file" onChange={this.onChange} component={FileUpload} />

            <Field label="Rubrik" type="text" name="title" component={TextField} />

            <label>Beskrivning</label>
            <div>
              <Field name="body" type="textarea" component={TextArea} />
            </div>

            <label>Visning</label>
            <Field name="visibility" component={Checkbox} />

            {this.props.error && (
              <div className="card red darken-1">
                <div className="card-content white-text">
                  <p>{this.props.error}</p>
                </div>
              </div>
            )}

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
