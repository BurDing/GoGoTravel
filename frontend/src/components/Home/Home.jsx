import React, { Component } from 'react'
import { Button, Card, Menu, activeItem, Container, Image, Header, Segment, Grid, List, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import { Zoom , Slide} from 'react-slideshow-image'


import styles from './styles.scss'
const images = [
  'https://farm5.staticflickr.com/4516/38657079716_51bc3ae8ef_o_d.jpg',
  'https://farm5.staticflickr.com/4639/25128722468_cb63a1b78f_o_d.jpg',
  'https://farm5.staticflickr.com/4572/38962892662_86049315b1_o_d.jpg'
];


class Home extends Component {
    render() {

        return(



            <div>

            <Container text textAlign='center' style={{ marginTop: '-2em', marginBottom: '4em'}}>
              <div className="font">
                <Header className = "font" as='h1' style={{ fontSize: '2em' }}>EXPLORE THE WONDERLAND</Header>
              </div>
            </Container>



            <div className = "trick"></div>
              <Slide
                  images={images}
                  duration="2000"
                  transitionDuration="1000"
                />

            <Segment raised style={{ padding: '0em' }} vertical>
              <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                  <Grid.Column>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
            </Segment>

            <Segment className = "font" raised style={{ padding: '0em' }} vertical>
              <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' className = "font" style={{ fontSize: '1.8em' }}>Welcome</Header>
                    <p className = "font" style={{ fontSize: '1.2em' }}>Greetings! Welcome to Go Go Travel! This is the right place to share your travel stories with others.</p>
                  </Grid.Column>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' className = "font" style={{ fontSize: '1.8em' }}>To get started...</Header>
                    <p className = "font" style={{ fontSize: '1.2em' }}>
                      You can start by first exploring other&#39;s posts. Or, if you can&#39;t wait, here is the right place to start sharing your own stories.
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>


            <Segment
                  inverted
                  vertical
                >
                  <Container textAlign='center'>
                    <Grid style={{ margin: '0em 0em 0em', padding: '0em 0em' }} divided inverted stackable>
                      <Grid.Row>
                        <Grid.Column width={4}>
                          <Header inverted as='h4' content='Member' />
                          <List link inverted className = "font">
                            <List.Item as='a'>Keye Zhang</List.Item>
                            <List.Item as='a'>Cheng Ding</List.Item>
                            <List.Item as='a'>Yubo Ouyang</List.Item>
                            <List.Item as='a'>Qishan Zhu</List.Item>
                            <List.Item as='a'>Yan Xu</List.Item>

                          </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Header inverted as='h4' content='Contact us' />
                          <List link inverted className = "font">
                            <List.Item as='a' href="mailto:keyez2@illinois.edu">keyez2@illinois.edu</List.Item>
                            <List.Item as='a' href="mailto:chengd2@illinois.edu">chengd2@illinois.edu</List.Item>
                            <List.Item as='a' href="mailto:yuboo2@illinois.edu">yuboo2@illinois.edu</List.Item>
                            <List.Item as='a' href="mailto:qishanz2@illinois.edu">qishanz2@illinois.edu</List.Item>
                            <List.Item as='a' href="mailto:yanxu3@illinois.edu">yanxu3@illinois.edu</List.Item>

                          </List>
                        </Grid.Column>

                        <Grid.Column width={8}>
                          <Header inverted as='h4' content='About' />
                          <p className = "font">This is the group project of a course named The Art of Web Programming in UIUC. This app provides a platform where users can share travel stories for wherever they go, and explore recommendation for next destinations from others.</p>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Divider inverted fitted section />
                    <p className = "font" style={{ margin: '0em 0em 0em', padding: '0em 0em' }} align="center">©2017 Go Go Travel</p>

                  </Container>
                </Segment>
            </div>
        )
    }
}

export default Home
