import React, { Component } from 'react'
import { Button, Card, Image, Dropdown, Input, Item, Grid, Rating, Icon, Feed, Statistic, Header} from 'semantic-ui-react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Navbar from '../Navbar/Navbar.jsx'
import ExploreCard from './ExploreCard.jsx'

import styles from './styles.scss'

const options1 = [
  {
    key: '1',
    text: 'By Expenses',
    value: 'by_expenses',
    content: 'By Expenses',
  },
  {
    key: '2',
    text: 'By Days',
    value: 'by_days',
    content: 'By Days',
  }
]

const options2 = [
  {
    key: '3',
    text: 'Descending Order',
    value: 'Descending',
    content: 'Descending Order',
  },
  {
    key: '4',
    text: 'Ascending Order',
    value: 'Ascending',
    content: 'Ascending Order',
  }
]

class Explore extends Component {

  constructor(props) {
      super(props);
      this.state = {
        content: [],
        new_content: [],
        model_content: [],
        marker_con: [],
        rand: [],
        info: false,
        model: false,
        showingInfoWindow: false,
        activeMarker: {},
        city: '',
        quote: '',
        say: ''
      }
      this.quotes = {
        "Chicago" : ["Eventually, I think Chicago will be the most beautiful great city left in the world.", "Frank Lloyd Wright"],

        "Los Angles": ["All life is inherently dangerous. But beyond that, Los Angeles is just a wonderful place to be.", "John Gregory Dunne"],

        "Paris": ["But Paris was a very old city and we were young and nothing was simple there, not even poverty, nor sudden money, nor the moonlight, nor right and wrong nor the breathing of someone who lay beside you in the moonlight.", " Ernest Hemingway"],

        "New York":["One belongs to New York instantly, one belongs to it as much in five minutes as in five years.", "Tom Wolfe"],

        "Barcelona": ["Barcelona is a very old city in which you can feel the weight of history; it is haunted by history. You cannot walk around it without perceiving it.", "Carlos Ruiz Zafón"],

        "Tokyo": ["You'll be going back to Tokyo before much longer, And you'll return to real life. You need to live life to the fullest. No matter how shallow and dull things might get, this life is worth living. I guarantee it.", "Haruki Murakami"],

        "Beijing": ["Nobody is right and nobody is wrong. Only one thing is right, and that is the Truth, but nobody knows what it is. It is a thing that changes all the time, and then comes back to the same thing", "Lin Yutang, Moment in Peking"],

        "Rome": ["I found Rome a city of bricks and left it a city of marble.", "Augustus"],

        "London": ["When a man is tired of London, he is tired of life; for there is in London all that life can afford.", "Samuel Johnson"],

        "San Francisco": ["That's one of the things I like about San Francisco. It's not like anywhere else in the world.", "Tracy Chapman"],

        "Champaign": ["Champaign is notable for sharing the campus of the University of Illinois at Urbana–Champaign with its sister city of Urbana.", "Wikipedia"],

        "Istanbul": ["If one had but a single glance to give the world, one should gaze on Istanbul.", "Alphonse de Lamar"],
        "Mexico City": ["I went to Mexico City to visit, and I fell in love with the city. I went to my house to pick up my stuff. It was the craziest, most impulsive move I've ever done. I just felt like I had to stay there", "Julieta Venegas"],

        "Shanghai": ["The rise or fall of Shanghai means the birth or death of the whole nation", "Chiang Kai-shek"],

        "Seoul": ["She’d never forgotten their last night in Seoul, or above it in fact, surveying the city lights from atop Namsan Mountain", "Giacomo Lee, Funereal"],

        "Miami": ["Miami Beach is where neon goes to die.", "Lenny Bruce"],

        "Madrid": ["I love Madrid. I am happy to be here. I have been here three years and hope to be here longer. But I am proud of where I come from and never forget the people I grew up with.","Zinedine Zidane"],

        "Toronto": ["When I think of myself, I think of Toronto. My music would never sound the way it does if it weren't for Toronto.", "Drake"],

        "Singapore": ["If Singapore is a nanny state, then I am proud to have fostered one.", "Lee Kuan Yew"],

        "Orlando": ["Love, the poet said, is woman's whole existence.", "Virginia Woolf,Orlando"],

        "Jerusalem": ["The view of Jerusalem is the history of the world; it is more, it is the history of earth and of heaven.", "Benjamin Disraeli"],

       "Vienna": ["Vienna is the gate to Eastern Europe.", "Niki Lauda"],

       "Sydney": ["If Paris is a city of lights, Sydney is the city of fireworks.", "Baz Luhrmann"],

       "Other": ["The gladdest moment in human life, me thinks, is a departure into unknown lands.", "Sir Richard Burton"],

       "Boston": ["And it was from Boston that one in every six American families began their journey into the land of the free.", "Thomas Menino"],

       "Milan": ["Milan is a true metropolis: strong and fearless but welcoming, too. Little by little, I came to realize that I could become someone here.", "Giorgio Armani"],
     };

      this.minm = 0;
      this.maxm = 999999999;
      this.mind = 0;
      this.maxd = 999999999;
      this.lat = 31.8566;
      this.lng = -88.3522;
      this.sort1 = 'by_expenses';
      this.sort2 = 'Descending';
      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
      this.search = this.search.bind(this);
      this.money_c1 = this.money_c1.bind(this);
      this.money_c2 = this.money_c2.bind(this);
      this.day_c1 = this.day_c1.bind(this);
      this.day_c2 = this.day_c2.bind(this);
      this.getmore = this.getmore.bind(this);
      this.close = this.close.bind(this);
      this.sort_1 = this.sort_1.bind(this);
      this.sort_2 = this.sort_2.bind(this);
      this.onClickChange = this.onClickChange.bind(this);
  }

  componentDidMount() {
      console.log("Did");
      axios.get('/api/collections')
        .then((res) => {
            console.log(Math.ceil(Math.random() * res.data.data.length));
            console.log(this.state.content);
            this.setState({
              //lifecycle trigger
              content: res.data.data,
              new_content: res.data.data,
              rand: res.data.data[Math.floor(Math.random() * res.data.data.length)]
            });
        })
        .catch((error) => {
            console.log(error);
        });
  }


  onMarkerClick(props, marker, e) {
    console.log("click");
    this.setState({
      marker_con: props.m,
      info: true,
      model: false,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked() {
    console.log("clicked");
    this.setState({
      info: false,
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  search() {
    console.log("change money");
    let temp_content = [];
    if (this.maxm == '') this.maxm = 999999999;
    if (this.minm == '') this.minm = 0;
    if (this.maxd == '') this.maxd = 999999999;
    if (this.mind == '') this.mind = 0;
    for (let i = 0; i < this.state.content.length; i++) {
      if (this.state.content[i].money <= this.maxm && this.state.content[i].money >= this.minm
      && this.state.content[i].day <= this.maxd && this.state.content[i].day >= this.mind) {
        temp_content.push(this.state.content[i]);
      }
    }
    console.log(this.maxm);
    console.log(temp_content);
    this.setState({
      info: false,
      model: false,
      new_content: temp_content,
      showingInfoWindow: false,
      rand: temp_content[Math.floor(Math.random() * temp_content.length)]
    });
  }

  money_c1(e) {
    this.minm = e.target.value;
  }
  money_c2(e) {
    this.maxm = e.target.value;
  }
  day_c1(e) {
    this.mind = e.target.value;
  }
  day_c2(e) {
    this.maxd = e.target.value;
  }

  close() {
    this.setState({
      model: false
    });
  }

  sort_1(e){
    console.log(e);
    this.sort1 = e;
    let content = this.state.model_content;
    if (this.sort1 == 'by_expenses' && this.sort2 == 'Descending') {
      content.sort(function(a,b) {
        return a.money < b.money;
      });
    } else if (this.sort1 == 'by_expenses' && this.sort2 == 'Ascending') {
      content.sort(function(a,b) {
        return a.money > b.money;
      });
    } else if (this.sort1 == 'by_days' && this.sort2 == 'Descending') {
      content.sort(function(a,b) {
        return a.day < b.day;
      });
    } else {
      content.sort(function(a,b) {
        return a.day > b.day;
      });
    }
    this.setState({});
  }

  sort_2(e){
    console.log(e);
    this.sort2 = e;
    let content = this.state.model_content;
    if (this.sort1 == 'by_expenses' && this.sort2 == 'Descending') {
      content.sort(function(a,b) {
        return a.money < b.money;
      });
    } else if (this.sort1 == 'by_expenses' && this.sort2 == 'Ascending') {
      content.sort(function(a,b) {
        return a.money > b.money;
      });
    } else if (this.sort1 == 'by_days' && this.sort2 == 'Descending') {
      content.sort(function(a,b) {
        return a.day < b.day;
      });
    } else {
      content.sort(function(a,b) {
        return a.day > b.day;
      });
    }
    this.setState({});
  }

  getmore() {
    console.log("more");
    let temp_content = [];
    for (let i = 0; i < this.state.new_content.length; i++) {
      if (this.state.new_content[i].Latitude == this.state.marker_con.Latitude &&
      this.state.new_content[i].Longitude == this.state.marker_con.Longitude) {
        temp_content.push(this.state.new_content[i]);
      }
    }
    console.log(temp_content);
    temp_content.sort(function(a,b) {
      return a.money < b.money;
    });
    let city1 = this.state.marker_con.city_name;
    let quote1;
    let say1;
    if (this.quotes[city1] == null) {
      quote1 = this.quotes["Other"][0];
      say1 = this.quotes["Other"][1];
    } else {
      quote1 = this.quotes[city1][0];
      say1 = this.quotes[city1][1];
    }
    this.lat = this.state.marker_con.Latitude;
    this.lng = this.state.marker_con.Longitude;
    this.setState({
      model_content: temp_content,
      model: true,
      city: city1,
      quote: quote1,
      say: say1
    });
  }

  onClickChange(){
    this.setState({});
  }

  render() {
      console.log("render");

      const map1 = {
        position: 'absolute',
        top: '20%',
        left: '3%',
        height: '75%',
        width: '67%'
      };

      const money1 = {
        position: 'absolute',
        top: '11%',
        left: '3%',
        width: '8%',
        zIndex: '100'
      };
      const money2 = {
        position: 'absolute',
        top: '11%',
        left: '26%',
        width: '8%',
        zIndex: '100'
      };
      const day1 = {
        position: 'absolute',
        top: '11%',
        left: '39%',
        width: '8%',
        zIndex: '100'
      };
      const day2 = {
        position: 'absolute',
        top: '11%',
        left: '62%',
        width: '8%',
        zIndex: '100'
      };

      const sub = {
        position: 'absolute',
        top: '11%',
        left: '73%',
        zIndex: '100'
      };
      const choice = {
        position: 'absolute',
        bottom: '-1%',
        left: '88%',
        zIndex: '100'
      }

      const extra = (
        <div>
          <h5 className = "spend">Spend:&nbsp;${this.state.marker_con.money}</h5>
          <h5 className = "day">Time:&nbsp;{this.state.marker_con.day}&nbsp;Days</h5>
        </div>
      )

      const dropdown1 = {
        position: 'absolute',
        top: '10%',
        left: '4%',
        zIndex: '100'
      }

      const dropdown2 = {
        position: 'absolute',
        top: '10%',
        left: '27%',
        zIndex: '100'
      }

      if (this.state.model) {
        return(
          <div>
            <Navbar/>
            <Header as='h4' style = {dropdown1} >
              <Icon name='trophy' />
              <Header.Content>
                Trending repos
                {' '}
                <Dropdown options={options1} defaultValue={options1[0].value} onChange = {(event, data) => this.sort_1(data.value)}/>
              </Header.Content>
            </Header>

            <Header as='h4' style = {dropdown2} >
              <Icon name='trophy' />
              <Header.Content>
                Trending repos
                {' '}
                <Dropdown options={options2} defaultValue={options2[0].value} onChange = {(event, data) => this.sort_2(data.value)}/>
              </Header.Content>
            </Header>
            <div className = "bac">
              <Button className = "close" onClick = {this.close}>
                Go Back
              </Button>
              <div className = "model">
                <Grid divided>
                  <Grid.Row>
                      <Card.Group itemsPerRow={1}>

                {this.state.model_content
                  .map((pos) =>
                  {
                    return (
                      <ExploreCard cardinfo = {pos} getmore = {this.getmore}  onClickChange = {this.onClickChange}  cardType = {"1"}/>);
                  }
                )}
                      </Card.Group>
                  </Grid.Row>
                </Grid>
              </div>
            </div>

            <div className = "art">
                <p className = "city">
                  {this.state.city}
                </p>
                <p className = "quote">
                  {this.state.quote}
                </p>
                <p className = "say">
                  {this.state.say}
                </p>
            </div>

          </div>
        )
      } else {
        if (this.state.info) {
          return(
            <div>
              <Navbar/>
              <Input
                action={{ color: 'teal', labelPosition: 'left', icon: 'dollar', content: 'Expense' }}
                actionPosition='left'
                style = {money1}
                onChange = {this.money_c1}
                placeholder='Min Spend'
              />
              <Input
                style = {money2}
                onChange = {this.money_c2}
                placeholder='Max Spend'
              />
              <Input
                action={{ color: 'teal', labelPosition: 'left', icon: 'calendar', content: 'Duration' }}
                actionPosition='left'
                style = {day1}
                onChange = {this.day_c1}
                placeholder='Min Day'
              />
              <Input
                style = {day2}
                onChange = {this.day_c2}
                placeholder='Max Day'
              />
              <Button style = {sub} onClick = {this.search}>Search</Button>
              <Statistic size = 'huge' style = {choice}>
                <Statistic.Value>{this.state.new_content.length}</Statistic.Value>
                <Statistic.Label>Choices</Statistic.Label>
              </Statistic>



              <Map  style = {map1}
                    google = {this.props.google}
                    onClick = {this.onMapClicked}
                    zoom = {2}
                    initialCenter = {{
                      lat: this.lat,
                      lng: this.lng
                    }}>

                    {this.state.new_content
                      .map((pos) =>
                      {let lat_long = {lat: pos.Latitude, lng: pos.Longitude};
                        return (
                        <Marker key = {pos._id}
                          m = {pos}
                          position = {lat_long}
                          onClick = {this.onMarkerClick}
                        />);
                      }
                    )}

                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div className = "i">
                          <h1>{this.state.marker_con.city_name}</h1>
                        </div>
                    </InfoWindow>

                    <div className = "mar">
                      <div className = "zhidi">
                        <ExploreCard cardinfo = {this.state.marker_con} getmore = {this.getmore} cardType = {"2"}/>
                      </div>
                    </div>
              </Map>
            </div>
          )
        } else {
            return(
              <div>
                <Navbar/>
                <Input
                  action={{ color: 'teal', labelPosition: 'left', icon: 'dollar', content: 'Expense' }}
                  actionPosition='left'
                  style = {money1}
                  onChange = {this.money_c1}
                  placeholder='Min Spend'
                />
                <Input
                  style = {money2}
                  onChange = {this.money_c2}
                  placeholder='Max Spend'
                />
                <Input
                  action={{ color: 'teal', labelPosition: 'left', icon: 'calendar', content: 'Duration' }}
                  actionPosition='left'
                  style = {day1}
                  onChange = {this.day_c1}
                  placeholder='Min Day'
                />
                <Input
                  style = {day2}
                  onChange = {this.day_c2}
                  placeholder='Max Day'
                />
                <Button style = {sub} onClick = {this.search}>Search</Button>
                <Statistic size = 'huge' style = {choice}>
                  <Statistic.Value>{this.state.new_content.length}</Statistic.Value>
                  <Statistic.Label>Choices</Statistic.Label>
                </Statistic>

                <Map  style = {map1}
                      google = {this.props.google}
                      onClick = {this.onMapClicked}
                      zoom = {2}
                      initialCenter = {{
                        lat: this.lat,
                        lng: this.lng
                      }}>

                      {this.state.new_content
                        .map((pos) =>
                        {let lat_long = {lat: pos.Latitude, lng: pos.Longitude};
                          return (
                          <Marker key = {pos._id}
                            m = {pos}
                            position = {lat_long}
                            onClick = {this.onMarkerClick}
                          />);
                        }
                      )}

                      <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                          <div>
                            <h1>Here~~~!</h1>
                          </div>
                      </InfoWindow>

                      <div className = "mar1">
                        <div className = "zhidi">
                          <ExploreCard cardinfo = {this.state.rand} getmore = {this.getmore} cardType = {"3"}/>
                        </div>
                      </div>
                </Map>
              </div>
            )
        }
      }
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyAJNbOFFGV2FE-yLYI8L-XWK5GG3Gpb-2U"
})(Explore)
