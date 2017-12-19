import React, { Component } from 'react'
import { Button, Card, Image, Dropdown, Input, Item, Grid, Rating, Icon, Feed} from 'semantic-ui-react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './styles.scss'

class ExploreCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isfavorite: false
    }
    this.flipIfFavorite = this.flipIfFavorite.bind(this);
  }

  componentDidMount(){
    axios.post('/api/checkiffavorite', this.props.cardinfo._id).then((res) => {
      this.setState({isfavorite: res.data});
    });
  }

  flipIfFavorite(){
    console.log(this.state.isfavorite);
    this.props.onClickChange();
    if(this.state.isfavorite){
      axios.post('/api/cancelcardfavorite', this.props.cardinfo._id).then((res) => {
          this.setState({isfavorite: res.data});
      });
    }
    else{
      axios.post('/api/addcardfavorite', this.props.cardinfo._id).then((res) => {
          this.setState({isfavorite: res.data});
      });
    }

  }


  render(){
    console.log(this.props.cardinfo._id);
    console.log(this.state);
    if(this.props.cardinfo == undefined){
      return (<div></div>);
    }

    if(this.props.cardType == "1"){
        return(
          <Card color='teal' key = {this.props.cardinfo.card_name}>
            <Image src={this.props.cardinfo.picture} />
            <Card.Content>
              <Image floated='right' size='massive' src={this.props.cardinfo.user_head_photo} circular avatar/>
              <Card.Header>
                {this.props.cardinfo.card_name}<br/><br/>
              </Card.Header>
              <Card.Meta>
                {this.props.cardinfo.username}<br/><br/>
              </Card.Meta>
              <Card.Description>
                <Icon name='dollar' color='yellow' circular />{this.props.cardinfo.money}&nbsp;USD&nbsp;&nbsp;
                <Icon name='calendar' color='blue' circular />{this.props.cardinfo.day}&nbsp;Days&nbsp;&nbsp;
                  <Icon name='heart'  color='red' circular />{this.props.cardinfo.likes_number}&nbsp;Likes<br/><br/>
                  <br />
              </Card.Description>
              <Card.Description>
                { this.props.cardinfo.post_txt }
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button toggle active={this.state.isfavorite} icon='heart' onClick = { this.flipIfFavorite}/>
            </Card.Content>
          </Card>
      );
  } else if(this.props.cardType == "2"){
      return(
        <Card color='teal' key = {this.props.cardinfo.card_name}>
          <Image src={this.props.cardinfo.picture} />
          <Card.Content>
            <Image floated='right' size='small' src={this.props.cardinfo.user_head_photo} circular avatar/>
            <Card.Header>
              {this.props.cardinfo.card_name}
            </Card.Header>
            <Card.Meta>
              {this.props.cardinfo.username}
            </Card.Meta>
            <Card.Description>
              <Icon name='dollar' color='yellow' circular/>{this.props.cardinfo.money}&nbsp;USD &nbsp;&nbsp;
              <Icon name='calendar' color='blue' circular/>{this.props.cardinfo.day}&nbsp;Days
                <br />
            </Card.Description>
            <Card.Description>
              { this.props.cardinfo.post_txt }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.cardinfo.likes_number} Likes
              <a className = "more" onClick = {this.props.getmore}>Get More</a>
              <br/>
          </Card.Content>
        </Card>
    );
  } else if(this.props.cardType == "3"){
      return(
        <Card color='teal' key = {this.props.cardinfo.card_name}>
          <Image src={this.props.cardinfo.picture} />
          <Card.Content>
            <Image floated='right' size='small' src={this.props.cardinfo.user_head_photo} circular avatar/>
            <Card.Header>
              {this.props.cardinfo.card_name}
            </Card.Header>
            <Card.Meta>
              {this.props.cardinfo.username}
            </Card.Meta>
            <Card.Description>
              <Icon name='dollar' color='yellow' circular/>{this.props.cardinfo.money}&nbsp;USD &nbsp;&nbsp;
              <Icon name='calendar' color='blue' circular/>{this.props.cardinfo.day}&nbsp;Days
                <br />
            </Card.Description>
            <Card.Description>
              { this.props.cardinfo.post_txt }
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
}



export default ExploreCard
