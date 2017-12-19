import React, { Component } from 'react'
import { Button, Card, Grid, Image, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar/Navbar.jsx'

import styles from './styles.scss'

class Gallerycard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            img: this.props.img,
            city: this.props.city
        }
    }



    render() {
            return(
              <Card>
                <Image src= {this.state.img} />
                <Card.Content>
                  <Card.Header>
                    {this.state.city}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Country
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    The Description of the city and the country
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Expense: 2000 Dollars
                  </a>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Days: 5 Days
                  </a>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='grey'>Update</Button>
                    <Button basic color='blue'>Delete</Button>
                  </div>
                </Card.Content>
              </Card>
            )
        }
    }


export default Gallerycard
