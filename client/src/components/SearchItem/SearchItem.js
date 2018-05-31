import React, { Component } from 'react';
import { Card, Row, Col, Button, Modal, Icon, Popover, message} from 'antd';
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
      message.success(`${this.props.year} ${this.props.make} ${this.props.model} Saved!`);
    }

    render() {

      const gridStyle = {
        width: '50%',
        textAlign: 'center',
      };

      const content = (
        <div>
          <p> Click picture to get additional pictures </p>
        </div>
      );

      const Desktop = () => (
        <Col span={8}>
        <Card
          title = {`${this.props.year} ${this.props.make} ${this.props.model}`}
          style = {{margin: '10px 10px 10px 10px', border: '1px solid #DCDCDC', borderRadius: 5, textAlign: 'center', width: 500}}
          cover = {
                    <Popover content={content}>
                    <img
                    style ={{height: 300, width: '100%'}}
                    alt="example"
                    src={this.props.front_pic}
                    onClick={this.showModal} />
                    </Popover>
                  } >
          <Modal
            title="Rear Photo"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel} >
            <img style ={{height: 300, width: '100%'}} src={this.props.back_pic} alt='test' />
          </Modal>
          <Card.Grid style={gridStyle}> {this.props.vin} </Card.Grid>
          <Card.Grid style={gridStyle}> Lot: {this.props.lot} </Card.Grid>
          <Card.Grid style={gridStyle}> Reason: {this.props.reason} </Card.Grid>
          <Card.Grid style={gridStyle}> Keys: {this.props.keys === 'K' ? 'Yes' : 'No'} </Card.Grid>
          <Card.Grid style={gridStyle}> Tow Reference: {this.props.tow_reference} </Card.Grid>
          <Card.Grid style={gridStyle}> Vehicle ID: {this.props.vehicle_id} </Card.Grid>
          <Button style= {{width: '100%', height: 50, backgroundColor: '#F8F8FF'}} onClick={this.saveVehicle}> <Icon type="save" /> Save </Button>
        </Card>
        </Col>
      )

        const Mobile = () => (
            <Card
              title = {`${this.props.year} ${this.props.make} ${this.props.model}`}
              style = {{margin: '0px 10px 10px 10px', border: '1px solid #DCDCDC', borderRadius: 5, textAlign: 'center', width: '90%'}}
              cover = {<img style ={{height: 300, width: '100%'}} alt="example" src={this.props.front_pic} onClick={this.showModal} />} >
              <Modal
                title= "Rear Photo"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <img style ={{height: 300, width: '90%'}} src={this.props.back_pic} alt='test' />
            </Modal>
              <p> VIN: {this.props.vin} </p>
              <p> Lot: {this.props.lot} </p>
              <p> Reason: {this.props.reason} </p>
              <p> Keys: {this.props.keys === 'K' ? 'Yes' : 'No'} </p>
              <p> Tow Reference: {this.props.tow_reference} </p>
              <p> Vehicle ID: {this.props.vehicle_id} </p>
              <p> Comments: {this.props.comments} </p>
              <Button style= {{width: '90%', height: 50, backgroundColor: '#F8F8FF'}} onClick={this.saveVehicle}> <Icon type="save" /> Save </Button>
            </Card>
        )

      return (
        <MediaQuery minDeviceWidth={700}>
          {(matches) => {
            if (matches) {
              return <div> <Desktop /> </div>
            } else {
              return <div> <Mobile /> </div>;
            }
          }}
        </MediaQuery>
      )
    }
}
