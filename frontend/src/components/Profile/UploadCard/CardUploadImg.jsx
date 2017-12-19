import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { reduxForm, Field } from 'redux-form'

const CLOUDINARY_UPLOAD_PRESET = 'travelcard';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ittlepearl/upload';

class CardUploadImg extends Component {
    constructor(props){
      super(props);
      this.uploadedFile = null;
      this.state = {
        uploadedFileCloudinaryUrl:"",
      }
      this.input = this.props.input;
      // this.input.meta.dirty = true;
      // this.input.meta.pristine = false;
      // this.input.meta.ini
    }

    onImageDrop(files) {
      this.uploadedFile = files[0];
      this.handleImageUpload();
    }

    handleImageUpload() {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', this.uploadedFile);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }

        if (response.body.secure_url !== '') {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url,

          });
          this.input.value = this.state.uploadedFileCloudinaryUrl;
          console.log("original",this.state.uploadedFileCloudinaryUrl);
        }
      });
    }

    render(){
      return (
        <div>
        <div className = "dropzone">
          {this.state.uploadedFileCloudinaryUrl === '' ?

            <Dropzone
              style={{"width" : "120%", "height" : "120%"}}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <div className = "dropzone-text"><p>Drop an image or click to select a file to upload.</p></div>
            </Dropzone>
            :
            <div className = "upper">

                <input className = "invisibleInput" {...this.props.input} value = {this.state.uploadedFileCloudinaryUrl} autoFocus/>
                <Image centered src={this.state.uploadedFileCloudinaryUrl} size='medium'/>
            </div>}
            </div>
        </div>
      )
    }
};

export default reduxForm ({
  form: 'CardUploadImg'
})(CardUploadImg);
