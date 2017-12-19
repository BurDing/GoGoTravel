import React, { Component } from 'react'
import { Button, Card, Grid, Image, Icon, Header, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import CardUploadImg from './UploadCard/CardUploadImg.jsx'
import * as actions from '../../actions'
import { connect } from 'react-redux'


import styles from './styles.scss'

class ProfileSettingsFormField extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
    // <form onSubmit =  {this.props.handleSubmit}>
      <Input {...this.props.input} fluid/>
  );
  }
}

export default ProfileSettingsFormField
