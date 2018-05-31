import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Main from './components/Main'
import { Layout, Menu, Button, Icon } from 'antd';
import MediaQuery from 'react-responsive';
const { Header, Content } = Layout;

export default class App extends Component {
  render() {

    const Desktop = () => (
      <Layout>
        <Header>
          <h1 style = {{float: 'left', color: 'white'}}> Kansas City Tow Lots </h1>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{lineHeight: '64px', float: 'right'}}
          >
            <Menu.Item key="1"><Link to='/'><Icon type="home" />Home</Link></Menu.Item>
            <Menu.Item key="2"><a href='https://data.kcmo.org/view/2uje-k9n5' rel="noopener noreferrer" target='_blank'> <Icon type="car" /> Auction Information </a> </Menu.Item>
            <Menu.Item key="3"><Link to='/login'> <Icon type="login" /> Login </Link></Menu.Item>
          </Menu>
        </Header>
        <Content style = {{backgroundColor: '#F8F8FF'}}>
          <Main />
        </Content>
      </Layout>
    )

    const Mobile = () => (
      <Layout>
        <Header>
          <h1 style = {{fontSize: 20, textAlign: 'center', color: 'white'}}> Kansas City Tow Lots </h1>
        </Header>
        <Content style = {{backgroundColor: '#F8F8FF'}}>
          <Button style = {{width: '100%', backgroundColor: '#001529', color: 'white', fontWeight: 'bold'}}><Link to='/'><Icon type="home" />Home</Link></Button>
          <br />
          <a style={{ textDecoration: 'none' }} href='https://data.kcmo.org/view/2uje-k9n5' rel="noopener noreferrer" target='_blank'> <Button style = {{width: '100%', color: 'white', backgroundColor: '#001529', fontWeight: 'bold'}}> <Icon type="car" /> Auction Information </Button> </a>
          <br />
          <Button style = {{width: '100%', color: 'white', backgroundColor: '#001529', fontWeight: 'bold'}}><Link to='/login'> <Icon type="login" /> Login </Link></Button>
          <Main />
        </Content>
      </Layout>
    )

    return (
      <MediaQuery minDeviceWidth={700}>
        {(matches) => {
          if (matches) {
            return <div> <Desktop /> </div>
          } else {
            return <div> <Mobile /> </div>
          }
        }}
      </MediaQuery>
    );
  }
}
