import React from 'react';
import Loading from '../Loading';

const FormImage = ({
    input: { value: omitValue, ...input },
    meta: {asyncValidating, touched, error},
    tempImage,
    deleteImage
  }) => {

    return (
      <div className="image formField">

        <div className='formField _image async-validating'>
          <input
            id="file"
            type="file"
            {...input}
            onChange={(e) => input.onChange(e.target.files[0])}
          />
        </div>
        {touched && error && <span>{error}</span>}

        <h6>Ladda upp en bild</h6>
        <div className={`file-wrapper image-${!tempImage ? 'false' : 'true'}`}>
          {asyncValidating ?
            (
              <Loading />
            ) : (
              <div>
              {tempImage && (
                <div className="file-preview-wrapper">
                  <i onClick={deleteImage} className="small material-icons">remove_circle</i>
                  <img className="file-preview" src={tempImage.url} alt="Förhandgranskning av bild" />
                </div>
              )}
              </div>
            )}

            {!tempImage && !asyncValidating && (
              <label htmlFor="file"><i className="material-icons">image</i></label>
            )}
        </div>

      </div>
    )
}

export default FormImage;
