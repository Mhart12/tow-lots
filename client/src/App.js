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
            <div style = {{float: 'left', color: 'white', fontWeight: 'bold', fontSize: 20}}> Kansas City Tow Lots </div>
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
