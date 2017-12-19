//just before the upload, should present data as a real card

import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import axios from 'axios'
import NavBar from '../../Navbar/Navbar.jsx'
import ProfileBar from '../Profile_bar.jsx'
import formFields from './formFields.js'

import styles from './styles.scss'


const CardReview= ({ onCancel, formValues, submitCard, history }) => {
    const addressList = formValues.address.split(",");
    const city_name = addressList[0];

      console.log(formValues);
      return(
        <div className = "reviewContainer">
          <Card centered fluid>
            <Image size='medium' centered src = {formValues.picture}/>
            <Card.Content>
              <Card.Header>
                {formValues.card_name}
              </Card.Header>
              <Card.Meta>
                <span><Icon name='dollar' color='yellow' circular/>{formValues.money}  <Icon name='travel' color='blue' circular/> {formValues.day} days</span>
              </Card.Meta>
              <Card.Description>
                {formValues.post_txt} <br />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='point' />
                {city_name}
              </a>
            </Card.Content>
          </Card>

          <Button basic color='red' icon labelPosition='left' onClick={onCancel}>
            <Icon name='remove'/>
            Back
          </Button>

          <Button basic color='blue' type = "submit" icon labelPosition='right' floated = 'right' onClick={() => submitCard(formValues, history)}>
            Post
            <Icon name='right arrow' />
          </Button>
        </div>

      )


  }


  function mapStateToProps(state) {
    console.log(state);
    //here the formValue collect all the value user put in
    return { formValues: state.form.cardForm.values };
  }

  export default connect(mapStateToProps, actions)(withRouter(CardReview));
