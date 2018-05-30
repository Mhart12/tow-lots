import React, { Component } from 'react';
import { Card, Col, Button, Modal, message} from 'antd';
import axios from 'axios';
import MediaQuery from 'react-responsive';

export default class SearchItem extends Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: false
      }
    }

    showModal = () => {
      this.setState({ visible: true });
    }

    handleOk = () => {
      this.setState({ visible: false });
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }

    saveVehicle = () => {
      axios.post('/save_vehicle', {
        vehicle_id: this.props.vehicle_id
      }).catch((err)=> {})
      message.success('Saved!');
    }

    render() {

      const gridStyle = {
        width: '50%',
        textAlign: 'center',
      };

      const Desktop = () => (
        <Card
          title = {`${this.props.year} ${this.props.make} ${this.props.model}`}
          style = {{margin: '0px 10px 10px 10px', border: '1px solid black', textAlign: 'center', width: 500}}
          cover = {<img style ={{height: 300, width: '100%'}} alt="example" src={this.props.front_pic} />}
        >
          <Card.Grid style={gridStyle}> {this.props.vin} </Card.Grid>
          <Card.Grid style={gridStyle}> Lot: {this.props.lot} </Card.Grid>
          <Card.Grid style={gridStyle}> Reason: {this.props.reason} </Card.Grid>
          <Card.Grid style={gridStyle}> Keys: {this.props.keys === 'K' ? 'Yes' : 'No'} </Card.Grid>
          <Button type="primary" onClick={this.showModal}> More Information </Button>
            <Modal
              title=" More Information"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p> Tow Reference: {this.props.tow_reference} </p>
              <p> Vehicle ID: {this.props.vehicle_id} </p>
              <p> Comments: {this.props.comments} </p>
              <img style ={{height: 300}} src={this.props.back_pic} alt='test' />
          </Modal>
          <Button type="primary" onClick={this.saveVehicle}> Save </Button>
        </Card>
      )

        const Mobile = () => (
          <Col span={24}>
            <Card
              title = {`${this.props.year} ${this.props.make} ${this.props.model}`}
              style = {{margin: '0px 10px 10px 10px', border: '1px solid black', textAlign: 'center', width: '100%'}}
              cover = {<img style ={{height: 300}} alt="example" src={this.props.front_pic} />}
            >
              <Card.Grid style={gridStyle}> {this.props.vin} </Card.Grid>
              <Card.Grid style={gridStyle}> Lot: {this.props.lot} </Card.Grid>
              <Card.Grid style={gridStyle}> Reason: {this.props.reason} </Card.Grid>
              <Card.Grid style={gridStyle}> Keys: {this.props.keys === 'K' ? 'Yes' : 'No'} </Card.Grid>
              <Button type="primary" onClick={this.showModal}> More Information </Button>
                <Modal
                  title=" More Information"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p> Tow Reference: {this.props.tow_reference} </p>
                  <p> Vehicle ID: {this.props.vehicle_id} </p>
                  <p> Comments: {this.props.comments} </p>
                  <img style ={{height: 300}} src={this.props.back_pic} alt='test' />
              </Modal>
              <Button type="primary" onClick={this.saveVehicle}> Save </Button>
            </Card>
          </Col>
        )

      return (
        <MediaQuery minDeviceWidth={700}>
          {(matches) => {
            if (matches) {
              return <div style ={{display: 'flex', justifyContent: 'center'}}> <Desktop /> </div>;
            } else {
              return <div> <Mobile /> </div>;
            }
          }}
        </MediaQuery>
      )
    }
}
