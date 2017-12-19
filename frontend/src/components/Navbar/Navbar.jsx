import React, { Component } from 'react'
import { Button, Segment, Label, Menu, activeItem, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import styles from './styles.scss'

class NavBar extends Component {
  constructor(){
    super();
    this.renderContent = this.renderContent.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
      axios.get('/api/logout').then( (res) => {
          console.log("Logged out");
      })
  }

  renderContent() {
    //this.props.auth has 3 cases
    switch (this.props.auth) {
      //still deciding: waiting for a result
      case null:
        return;
      case false:
        return(
          <Menu fixed='top' size='massive' >
            <Link to = {'/'}>
              <Menu.Item name="GoGoTravel" active={activeItem === "GoGoTravel"}/>
            </Link>
              <Menu.Menu position='right'>

                  <Menu.Item href="/explore" name = 'Explore' active={activeItem === 'Explore'} />

                  <Link to = {'/login'}>
                    <Menu.Item name = 'Login' active={activeItem === 'Login'} />
                  </Link>
                  <Link to = {'/register'}>
                    <Menu.Item name = 'Register' active={activeItem === 'Register'} />
                  </Link>
              </Menu.Menu>
            </Menu>
        )
      default:
        return (
          <Menu fixed='top' size='massive'>
            <Link to = {
                {
                  pathname: '/'
                }
              }>
              <Menu.Item name="GoGoTravel" active={activeItem === "GoGoTravel"}/>
            </Link>
              <Menu.Menu position='right'>

                    <Menu.Item href="/explore" name = 'Explore' active={activeItem === 'Explore'} />

                    <Menu.Item href="/profile" name = 'Profile' active={activeItem === 'Profile'} />


                    <Menu.Item href="/api/logout" name = 'Logout' active={activeItem === 'Logout'} />
              </Menu.Menu>
            </Menu>
        );
    }
  }

    render() {
        console.log(this.props);
        return(
          <div>
          {this.renderContent()}
          </div>
        )
  }
}

//called with the entire state in the redux store
//here, the state is defined in reducers/index.js
//the state ==
// { auth: authReducer,
//   form: reduxForm,
//   profile: profileReducer }

function mapStateToProps(state) {
  return { auth: state.auth };
}

//tranport the state from mapStateToProps as Props to the NavBar
export default connect(mapStateToProps)(NavBar);
