import React, { Component } from 'react'
import { Button, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import CardUploadImg from './UploadCard/CardUploadImg.jsx'
import * as actions from '../../actions'
import {updateProfile} from '../../actions'
import { connect } from 'react-redux'

import ProfileSettingsForm from './Profile_Settings_Form.jsx'
import styles from './styles.scss'

class ProfileSettings extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value){
    this.props.updateProfile(value, this.props.history);
  }

  render() {
    return(
      <ProfileSettingsForm onSubmit = { this.handleSubmit} />
    );
  }
}

function mapStateToProps(state){
  console.log(state);
  return {a : ''};
}

export default connect(mapStateToProps, {updateProfile})(withRouter(ProfileSettings));
