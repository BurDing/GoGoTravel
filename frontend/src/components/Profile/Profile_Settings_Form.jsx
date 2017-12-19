import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import CardUploadImg from './UploadCard/CardUploadImg.jsx'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import ProfileSettingsFormField from './Profile_Settings_Form_Field.jsx'

import styles from './styles.scss'

class ProfileSettingsForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
    // <form onSubmit =  {this.props.handleSubmit} className = "reduxform">
    <div className = "profile-form">
    <form onSubmit =  {this.props.handleSubmit}>
    <Divider horizontal>Email</Divider>
        <Field
          key = "email"
          label = "email"
          component = {ProfileSettingsFormField}
          type = 'text'
          name = "email"
        />
        <Divider horizontal>Add your personal description</Divider>

        <Field
          key = "description"
          label = "description"
          component = {ProfileSettingsFormField}
          type = 'text'
          name = "description"
        />
        <Divider horizontal>Upload your profile picture</Divider>

        <Field
          key = "img_url"
          label = "headpicture"
          component = {CardUploadImg}
          type = 'url'
          name = "headpicture"
        />
        <Divider hidden/>
        <Button basic color='blue' type = "submit" icon labelPosition='right' floated = 'right'>Update<Icon name='right arrow' /></Button>
    </form>
    </div>
  );
  }
}

export default reduxForm({
  form: 'updateProfileForm'
})(ProfileSettingsForm);
