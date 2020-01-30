import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { TextField, TextArea, FileUpload, Checkbox } from './ItemFormField';
import Loading from '../Loading';
import { connect } from 'react-redux'
import * as actions from  '../../actions'

class ItemForm extends Component {

  constructor(props) {
    super(props);
    this.state = { image: this.props.imageState, loading: false };
  }

  onSubmit = (formValues) => {
    return this.props.onSubmit(formValues, this.props.history)
  }

  onChange = async (formValues) => {
    this.setState({loading: true})
    const image = await this.props.createImage(formValues)
    this.setState({image: image})
    this.props.change('imageId', image._id)
    this.setState({loading: false})
  }

  removeImage = async () => {
    const status = await this.props.deleteImage(this.state.image._id);
    if(status === 200) {
      this.props.change('imageId', '')
      this.props.change('file', '')
      this.setState({image: false})
    }
  }

  render() {

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">

            <Field type="hidden" name="imageId" component="input" />
            <Field type="file" name="file" id="file" onChange={this.onChange} component={FileUpload} />

            <div className="file-wrapper">
              {this.state.loading && (
                <Loading />
              )}

              {this.state.image && !this.state.loading && (
                <div className="file-preview-wrapper">
                  <i onClick={this.removeImage} className="material-icons">remove_circle</i>
                  <img className="file-preview" src={this.state.image.url} alt="preview" />
                </div>
              )}

              {!this.state.image && !this.state.loading && (
                <label htmlFor="file"> <i className="material-icons">image</i></label>
              )}
            </div>

            <Field label="Rubrik" type="text" name="title" component={TextField} />

            <label>Beskrivning</label>
            <div>
              <Field name="body" type="textarea" component={TextArea} />
            </div>

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

const decoratedComponent = connect(null, actions)(ItemForm)

export default reduxForm({
  validate,
  form: 'itemForm',
  initialValues: {visibility: true}
})(withRouter(decoratedComponent))
