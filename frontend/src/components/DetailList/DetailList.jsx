import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Image, Button, Card, Input,Icon,Grid,Header,Rating,Flag} from 'semantic-ui-react'
import Navbar from '../Navbar/Navbar.jsx'

var pics = require('../fakeData/pics.js').pics;
var intro = require('../fakeData/intro.js').intro;

import styles from './styles.scss'

class DetailList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false
        }
        this.allCard = [];
    }

    getCardList(){
      this.allCard = pics.map((elem) => {
        return(
          <List.Item>
          <Card centered fluid>
          <Card.Header>
             <Image  spaced='both' avatar size='huge' src={elem.user_image} />
             <span>{elem.user_name}</span>
          </Card.Header>
          <Image  size='massive' src={elem.pic_url}/>
            <Card.Content>
             <Card.Description>
               {elem.comment}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
              <a>
                <Icon size = 'large' name='like' />
              </a>
              <span className='comment'>
                <Input size = 'mini' fitted placeholder='Comment...' />
              </span>
           </Card.Content>
           </Card>
          </List.Item>
        )
      })
      console.log(this.allCard);
    }

    render() {
      this.getCardList();
      return(
        <div>
          <Navbar isLoggedIn = {this.state.isLoggedIn} />
        <div className = "detail-list">
        <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column width = {3}>
          </Grid.Column>
          <Grid.Column width = {8}>
            <List floated = 'right'>
              {this.allCard}
            </List>
          </Grid.Column>
          <Grid.Column width = {3}>
          <div>
            <Header as='h2' icon textAlign='left'>
              <Header.Content>
                {intro.name}
              </Header.Content>
            </Header>
            <div>
              {intro.state},
              {intro.country} <Flag name={intro.country} />
            </div>
            <Rating icon='star' defaultRating={intro.Rating} maxRating={5} />
            <div>
            {intro.intro}
            </div>
          </div>
          </Grid.Column>
        </Grid.Row>
        </Grid>
        </div>
        </div>
      )
}
}

export default DetailList
