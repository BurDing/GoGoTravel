import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment, Icon, Divider, activeItem  } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router'
import Navbar from '../Navbar/Navbar.jsx';

import styles from './styles.scss'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                password: '',
                email: ''
            },
            redirect: false,
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        console.log(password);
        // const redirect = encodeURIComponent(this.state.user.redirect);
        // const formData = `email=${email}&password=${password}&redirect=${redirect}`;
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!',
                    redirect: true
                })
            } else {
                this.setState({
                    message: 'Unable to log in: Username/Password may be not correct'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.props.state.isLoggedIn = true;
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      this.props.state.isLoggedIn = true;

    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }



    render() {
      if(this.state.redirect){
        return (
          <Redirect to={
              {
                pathname: '/profile',
                state: {isLoggedIn: true}
              }
            }/>
        )
      }
      else{
        return(
          <div>
            <Navbar isLoggedIn = {false} />
                <div className='Login'>
                  <Grid className = 'Login__container' textAlign = 'center'  verticalAlign = 'middle'>
                    <Grid.Column className = 'Login__content'>
                      <Header as='h2' textAlign='center' className = 'header' color = 'black'>
                        <Icon name = 'sign in'/>
                        Login in to your account
                      </Header>
                      <Form size='large'>
                        <Segment stacked>
                          <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={this.onChangeEmail}
                            />
                          <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password(6 or more characters)'
                            type='password'
                            onChange={this.onChangePassword}
                            />
                          <Button color = 'black' fluid size='large' onClick = {this.onSubmit}>Sign In</Button>
                          <br/>
                          <p className = 'Login__message'>{this.state.message}</p>
                          </Segment>
                      </Form>
                      <Message>
                        Not a member? <Link to="/register">Join now</Link>
                    </Message>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
    )
  }
}
}

export default Login
