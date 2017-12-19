import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import axios from 'axios'
import NavBar from '../../Navbar/Navbar.jsx'
import ProfileBar from '../Profile_bar.jsx'
import CardReview from './CardReview.jsx'
import CardForm from './CardForm.jsx'
import formFields from './formFields.js'

import styles from './styles.scss'

class CardNew extends Component {

    constructor() {
        super();
        this.state = {
            showCardReview: false
        }
    }



    render() {
      if(this.state.showCardReview){
        return(
          <div>
            <CardReview
              onCancel = {() => this.setState({showCardReview: false})}
              />
          </div>
        )
      } else {
        return(
            <div>
              <CardForm
                onCardSubmit = {() => this.setState({showCardReview: true})}
                />
            </div>
          )
      }
    }
  }

  // export default reduxForm({
  //   form: 'surveyForm'
  // })(SurveyNew);

export default reduxForm({
  form: 'cardForm'
})(CardNew);
