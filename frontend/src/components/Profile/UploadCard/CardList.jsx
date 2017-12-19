import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Divider, Card, Grid, Image, Icon, Header, Modal} from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchCards, deleteCards } from '../../../actions';

import axios from 'axios'
import NavBar from '../../Navbar/Navbar.jsx'
import ProfileBar from '../Profile_bar.jsx'
import CardFormField from './CardFormField.jsx'
import formFields from './formFields.js'

import styles from './styles.scss'

class CardList extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
    this.renderCards = this.renderCards.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  handleOpen(){
    this.setState({ modalOpen: true });
  }

  handleClose(){
     this.setState({ modalOpen: false });
  }

  renderCards(){
    console.log("yyyyy");
    var count = 0;
    console.log(this.props);
    return this.props.cards.map(card => {
        console.log(count);
        count++;
        return (
          <div class="column">
            <div class="ui fluid card">
              <div class="image">
                <img src= {card.picture} />
              </div>
              <div class="content">
                <a class="header">{card.card_name}</a><br/>
                  <div class="meta">
                    <span><Icon name='dollar' color='yellow' circular/>{card.money}  <Icon name='travel' color='blue' circular/> {card.day} days</span> <span> <Icon name='heart'  color='red' circular />{card.likes_number} likes </span><br/><br/>
                  </div>
                <div class="description">
                  K{card.post_txt}
                </div>
              </div>
              <div class="extra content">
                <span>
                  <Icon name='point' />
                  {card.city_name}
                  <button style={{color: 'grey',backgroundColor: 'Transparent',border: 'none', float:'right'}}  onClick = {() => this.props.deleteCards(card._id, this.props.history)} content='Delete'>
                 <i class="fa fa-remove"></i>
                   Delete
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
        <div className = 'cardlist'>
          <div className="ui container">
            <div className="ui three column doubling stackable masonry grid">
            {this.renderCards()}
            </div>
          </div>
          <br/><br/>
          <Link to = '/profile/uploadcard'>
          <div className="rela-inline button more-images add-button">Post a New story</div>
          </Link>
        </div>
      );
    }
  }


  function mapStateToProps(state) {
    console.log(state);
    return {cards: state.profile};
  }

  export default connect(mapStateToProps, { fetchCards, deleteCards })(CardList);
