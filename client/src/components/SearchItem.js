import React, { Component } from 'react';
import { Card, Col, Button, Modal, message} from 'antd';
import axios from 'axios';

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

      return (
        <div>
          <Col span={8}>
            <Card
              title = {`${this.props.year} ${this.props.make} ${this.props.model}`}
              style = {{margin: '0px 10px 10px 10px', border: '1px solid black', textAlign: 'center'}}
              cover = {<img style ={{height: 300}} alt="example" src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" />}
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
              </Modal>
              <Button type="primary" onClick={this.saveVehicle}> Save </Button>
            </Card>
          </Col>
        </div>
      )
    }
}
