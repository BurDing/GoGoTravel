import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header, Modal} from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchFavoriteCards, cancelFavorite} from '../../../actions';

import axios from 'axios'
import NavBar from '../../Navbar/Navbar.jsx'
import ProfileBar from '../Profile_bar.jsx'

import styles from './styles.scss'

class FavoriteList extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: []
    }
    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
      axios.get('/api/favoritecards').then((res) => {
        this.setState({cards: res.data});
      });
  }

  cancelFavorite(value, history){
      axios.post('/api/cancelcardfavorite', value).then((res) => {
        axios.get('/api/favoritecards').then((res) => {
          this.setState({cards: res.data});
        });
      });
  }


  renderCards(){
    return this.state.cards.map(card => {
        return(
            <div class="column">
              <div class="ui fluid card">
                <div class="image">
                  <img src= {card.picture} />
                </div>
                <div class="content">
                  <a class="header">{card.card_name}</a>
                  <div class="meta">
                    {card.username}
                  </div>
                  <div class="meta">
                    <span><Icon name='dollar' color='yellow' circular/>{card.money}  <Icon name='travel' color='blue' circular/> {card.day} days</span> <span> <Icon name='heart'  color='red' circular />{card.likes_number} likes </span><br/>
                  </div>
                  <div class="description">
                    {card.post_txt}
                  </div>
                </div>
                <div class="extra content">
                  <span>
                    <Icon name='point' />
                    {card.city_name}
                    <button style={{color: 'grey',backgroundColor: 'Transparent',border: 'none', float:'right'}}  onClick = {() =>  {this.cancelFavorite(card._id, this.props.history)}} content='Unlike'>
                      <i class="fa fa-remove"></i>
                        Unlike
                    </button>
                  </span>
                </div>
              </div>
            </div>


        );
      });
  }

    render() {
      return(
        <div class="cardlist">
          <div class="ui container">
            <div class="ui three column doubling stackable masonry grid">
              {this.renderCards()}
            </div>
          </div>
        </div>
      );
    }
  }



  export default withRouter(FavoriteList);
