import React, { Component } from 'react'
import { Button, Card, Grid, Image, Icon, Header, Popup, Modal} from 'semantic-ui-react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchUser, fetchCards} from '../../actions';

import axios from 'axios'
import Navbar from '../Navbar/Navbar.jsx'
import Profilebar from './Profile_bar.jsx'
import Gallerycard from './Gallerycard.jsx'
import CardList from './UploadCard/CardList.jsx'
import CardNew from './UploadCard/CardNew.jsx'
import ProfileFollowing from './Following.jsx'
import ProfileFollower from './Follower.jsx'
import ProfileSettings from './Profile_Settings.jsx'
import scriptLoader from 'react-async-script-loader'
import FavoriteList from './FavoriteList/FavoriteList.jsx'


import styles from './styles.scss'

class Profile extends Component {

    constructor(props) {
        super(props);
        console.log("ssssss");
        console.log(this.props);
        this.state = {
            username: ""
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
      this.props.fetchUser();
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }



    render() {

        if (this.props.auth) {
            return(
              <div>
                  <BrowserRouter>
                    <div className = "profile">
                      <Profilebar/>
                      <Route exact path="/profile" component={CardList}/>
                      <Route exact path="/profile/favorite" component={FavoriteList}/>
                      <Route exact path="/profile/settings" component={ProfileSettings}/>
                      <Route exact path="/profile/uploadcard" component={CardNew}/>
                    </div>
                  </BrowserRouter>
                </div>
            );
        } else {
            return(
                <div className="Dashboard">
                </div>
            )
        }
    }
}

function mapStateToProps({ auth }) {
  return { auth };
}


const wrapper = scriptLoader(
    [
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJNbOFFGV2FE-yLYI8L-XWK5GG3Gpb-2U&libraries=places"
    ]
)(Profile)


export default connect(mapStateToProps, {fetchUser, fetchCards})(wrapper);
