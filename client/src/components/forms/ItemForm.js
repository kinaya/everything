import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { TextField, TextArea, FileUpload, Switch, Map, RadioButton } from './ItemFormField';
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

  addImage = async (formValues) => {
    this.setState({loading: true})
    const image = await this.props.createImage(formValues)
    this.setState({image: image})
    this.props.change('_image', image._id)
    this.setState({loading: false})
  }

  removeImage = async () => {
    const status = await this.props.deleteImage(this.state.image._id);
    if(status === 200) {
      this.props.change('_image', '')
      this.props.change('file', '')
      this.setState({image: false})
    }
  }

  render() {

    return (
      <form className="itemCreateForm" onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">

          <Field label="Rubrik" type="text" name="title" component={TextField} />

          <div className="type formField">
            <h6>Vad för typ av resurs är det?</h6>
            <p><label><Field name="type" component={RadioButton} type="radio" value="lend"/><span>Något jag vill låna ut</span></label></p>
            <p><label><Field name="type" component={RadioButton} type="radio" value="giveaway"/><span>Något jag vill skänka bort</span></label></p>
            <p><label><Field name="type" component={RadioButton} type="radio" value="public" /><span>En offentlig resurs jag vill tipsa om</span></label></p>
          </div>

          <div className="image formField">
            <Field type="hidden" name="_image" component="input" />
            <Field type="file" name="file" id="file" onChange={this.addImage} component={FileUpload} />

            <h6>Ladda upp en bild</h6>
            <div className={`file-wrapper image-${!this.state.image ? 'false' : 'true'}`}>
              {this.state.loading && ( <Loading /> )}

              {this.state.image && !this.state.loading && (
                <div className="file-preview-wrapper">
                  <i onClick={this.removeImage} className="small material-icons">remove_circle</i>
                  <img className="file-preview" src={this.state.image.url} alt="preview" />
                </div>
              )}

              {!this.state.image && !this.state.loading && (
                <label htmlFor="file"><i className="material-icons">image</i></label>
              )}
            </div>
          </div>

          <Field label="Plats" name="coordinates" component={Map} />

          <Field label="Beskrivning" name="body" type="textarea" component={TextArea} />

          <Field label="Visa för andra" name="visibility" component={Switch} />

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
  initialValues: {visibility: true, type: 'lend'}
})(withRouter(decoratedComponent))
