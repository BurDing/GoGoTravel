import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header,Input } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import axios from 'axios'
import NavBar from '../../Navbar/Navbar.jsx'
import ProfileBar from '../Profile_bar.jsx'
import CardFormField from './CardFormField.jsx'
import formFields from './formFields.js'
import CardUploadImg from './CardUploadImg.jsx'
import NameGeoEncode from './NameGeoEncode.jsx'

import styles from './styles.scss'

class CardForm extends Component {
  constructor(){
    super();
    this.renderField = this.renderField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      cityName: "",
      latitude: Infinity,
      longitude: Infinity,
      value: " "
    }
  }

  renderField(){
    return _.map(formFields, ({label, name, description}) => {
        return (
          <div>
          <Divider horizontal>{description}</Divider>
          <Field
            key = {name}
            component = {CardFormField}
            type = "text"
            name = {name}
          />
          </div>
        );
      });
  }

  handleSubmit(e){
    console.log(e);
  }

  handleChange(e){
    console.log(e.target.name);
    this.setState({value : e.target.value});
  }
    render() {
      return(
        <div>
        <div className = "card-form">
          <form onSubmit = {this.props.handleSubmit(this.props.onCardSubmit)}>
            <Divider horizontal>City</Divider>
            <Field
              key = "address"
              label = "address"
              component = {NameGeoEncode}
              type = 'text'
              name = "address"
            />

            {this.renderField()}
            <Divider horizontal>Upload Photo</Divider>
            <Field
              key = "img_url"
              label = "Photo"
              component = {CardUploadImg}
              type = 'url'
              name = "picture"
            />

            <Divider hidden />

            <div className = "bottonZone">
              <Link to = '/profile'>
              <Button basic color='red' icon labelPosition='left'>
                <Icon name='remove' />
                Remove
              </Button>
              </Link>
              <Button basic color='blue' type = "submit" icon labelPosition='right' floated = 'right'>
                N e x t
                <Icon name='right arrow' />
              </Button>
            </div>

          </form>
          </div>
        </div>
      )
    }
  }

  function validate(values) {
    const errors = {};


    _.each(formFields, ({ name }) => {
      if (!values[name]) {
        errors[name] = 'You must provide a value';
      }
    });

    return errors;
  }


  export default reduxForm ({
    validate,
    form: 'cardForm',
    destroyOnUnmount: false
  })(CardForm);
