import React, { Component } from 'react'
import { Button, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Navbar from '../Navbar/Navbar.jsx'
import Profilebar from './Profile_bar.jsx'

import {fetchFollowers} from "../../actions"
import * as actions from "../../actions"

import styles from './styles.scss'

class Follower extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            username: ""
        }
        this.renderFollowers = this.renderFollowers.bind(this);
    }

    componentDidMount(){
      this.props.fetchFollowers();
    }

    renderFollowers(){
      return this.props.followers.map(follower => {
        return (
          <Card key = {follower._id}>
            <Card.Content>
              <Image floated = "right" size = "tiny"  src= {follower.headpicture || "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAkhAAAAJDFiYjhiOGMxLTY2NWEtNGE1OS1hZGY4LTY1MDIzYjFkNDJiZQ.jpg"}/>
            <Card.Header>
              {follower.email}
            </Card.Header>
            <Card.Meta>
            <span className='date'>
            Joined in 2017
            </span>
            </Card.Meta>
            <Card.Description>
            Thomas is a student living in Chicago.
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Icon name='user' />
            15 Friends
            </a>
            </Card.Content>
          </Card>
        )
      })
    }

    render() {
        if (true) {
            return(
                <div>
                  {this.renderFollowers()}
                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                  <Navbar/>
                  <Card>
                      <h1>You must log in before you can see this page.</h1>
                      <Link to="/">
                          Back
                      </Link>
                  </Card>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
  console.log(state.followers);
  return ( {followers: state.followers} );
}

export default connect(mapStateToProps, {fetchFollowers})(Follower)
