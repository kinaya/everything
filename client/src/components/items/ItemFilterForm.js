import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextField } from './ItemFormField';

const ItemFilterForm = () => {
  return (
    <div class="card blue lighten-5">
      <div class="card-content white-text">

        <form>
          <Field key="search" label="Sök" type="text" name="search" component={TextField} />

          <div className="row">
            <div className="col s12 m6 ">
              <label>Sortering</label>
              <Field name="order" component="select" className="browser-default">
              <option></option>
              <option value="datePosted_asc">Nyaste överst</option>
              <option value="datePosted_desc">Äldsta överst</option>
              <option value="title_asc">Titel</option>
              </Field>
            </div>

            <div className="col s12 m6 ">
              <Field name="showHidden" component="checkbox">
              <label>
                <input type="checkbox" className="filled-in" />
                <span>Visa otillgängliga</span>
              </label>
              </Field>
            </div>

            </div>


        </form>


      </div>
    </div>
  )
}

export default reduxForm({
  form: 'itemFilterForm'
})(ItemFilterForm);
