import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment, Divider, Icon} from 'semantic-ui-react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar/Navbar.jsx'

import styles from './styles.scss'


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                password: '',
                email: ''
            },
            isLoggedIn: false,
            message: '',
            redirect: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!',
                    redirect: true
                })
            } else {
                this.setState({
                    message: 'Unable to register'
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

    render() {
      if(this.state.redirect){
        return (
          <Redirect to={
              {
                pathname: '/login',
                state: {isLoggedIn: false}
              }
            }/>
        )
      }
        return(

            <div>
              <Navbar isLoggedIn = {false}/>

                <div className='Register'>
              <Grid className = 'Register__container' textAlign = 'center'  verticalAlign = 'middle'>
                <Grid.Column className = 'Register__content'>
                  <Header as='h2' textAlign='center' color = 'black'>
                    <Icon name = 'registered'/>
                    Register to get started!
                  </Header>
                  <Form size='large' onSubmit={this.onSubmit}>
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
                      <Button color = 'black' fluid size='large'>Sign Up</Button>
                      <br/>
                      <p className = 'Register__message'>{this.state.message}</p>
                    </Segment>
                  </Form>
                  <Message>
                    Already a member? <Link to="/login">Login in here</Link>
                </Message>

              </Grid.Column>
            </Grid>
          </div>
            </div>
    )
}
}

export default Register
