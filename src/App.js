import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import AuctionTime from './components/AuctionTime'
import { Layout, Menu} from 'antd';
const { Header, Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <div style = {{float: 'left', color: 'white', fontWeight: 'bold', fontSize: 30}}> Kansas City Tow Lots </div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px', float: 'right' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <AuctionTime />
            <SearchBar />
          </Content>
        </Layout>
      </div>
    );
  }
}
