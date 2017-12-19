import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar/Navbar.jsx'
import * as actions from '../../actions'
import CardList from './UploadCard/CardList.jsx'
import FavoriteList from './FavoriteList/FavoriteList.jsx'


import { connect } from 'react-redux'

import styles from './styles.scss'

class ProfileBar extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }



    render() {
      console.log(this.props.user);
            return(
                <div>


                <div class="overlay">
                  <div class="abs-center overlay-card">
                    <div class="close">X</div>
                    <div class="floated overlay-image">
                      <div class="abs-center post-image"></div>
                    </div>
                    <div class="floated overlay-desc">
                    <CardList />
                      <div class="rela-block desc-title"></div>
                      <div class="rela-block desc-author"></div>
                      <div class="rela-block desc-desc"></div>
                    </div>
                  </div>
                </div>

                  <div class="rela-block containers">
                    <div class="rela-block profile-card">
                      <div class="profile-pic" id="profile_pic">
                        <img alt="" src= {this.props.user.headpicture || "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAkhAAAAJDFiYjhiOGMxLTY2NWEtNGE1OS1hZGY4LTY1MDIzYjFkNDJiZQ.jpg"} />
                      </div>
                      <div class="rela-block profile-name-containers">
                        <div class="rela-block user-name" id="user_name">{this.props.user.email}</div>
                        <div class="rela-block user-desc" id="user_description">{this.props.user.description}</div>
                      </div>
                      <div class="rela-block profile-card-stats">
                        <Link to="/profile"><div class="floated profile-stat works" id="num_works"></div></Link>
                        <Link to="/profile/favorite"><div class="floated profile-stat followers" id="num_followers"></div></Link>
                        <Link to="/profile/settings"><div class="floated profile-stat following" id="num_following"></div></Link>
                      </div>
                    </div>

                  </div>

                  </div>
            )
        }
    }

function mapStateToProps(state){
  return { user : state.auth };
}

export default connect(mapStateToProps, actions)(ProfileBar)
