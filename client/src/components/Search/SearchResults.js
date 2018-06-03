import React, { Component } from 'react';
import axios from 'axios';
import { Spin, message, Pagination } from 'antd';
import SearchItem from './SearchItem'

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount() {
    axios
      .get('/current_vehicles')
      .then(({data})=> {
        this.setState({
          data: data.sort((a,b) => a.lot - b.lot),
          loading: false
        });
    }).catch((err)=> {})
  }

  returnResults(year, make, model, key, reason) {
    // onload dsiplay all vehicles since this items are not yet defined
    if (year === "" && make === "" && model === "" && key === "" && reason === "") {
      return (
        this.state.loading === true ? <Spin /> : this.state.data.map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
        )
      )
    // search by only year
    } else if (year !== "" && make === "" && model === "" && key === "" && reason === "") {
      return (
        this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.year === this.props.searchYear).map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
        )
      )
      // search by only make
    } else if (year === "" && make !== "" && model === "" && key === "" && reason === "") {
        return (
          this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.make === this.props.searchMake).map((e, key) =>
            <div key = {key}>
              <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
            </div>
          )
        )
        // search by only model
      } else if (year === "" && make === "" && model !== "" && key === "" && reason === "") {
          return (
            this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.model === this.props.searchModel).map((e, key) =>
              <div key = {key}>
                <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
              </div>
            )
          )
        // search by only keys
        } else if (year === "" && make === "" && model === "" && key !== "" && reason === "") {
            return (
              this.state.loading === true ? <Spin /> : this.state.data.filter(x => (x.k === 'K' ? 'Yes' : 'No') === this.props.searchKey).map((e, key) =>
              <div key = {key}>
                <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
              </div>
              )
            )
          // search by only reason
          } else if (year === "" && make === "" && model === "" && key === "" && reason !== "") {
              return (
                this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.reason === this.props.searchReason).map((e, key) =>
                  <div key = {key}>
                    <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
                  </div>
                )
              )
          // search by year and make
          } else if (year !== "" && make !== "" && model === "" && key === "" && reason === "") {
            let results =
            this.state.loading === true ? <Spin /> :
            this.state.data
              .filter(x => x.year === this.props.searchYear && x.make === this.props.searchMake)
              .map((e, key) =>
                <div key = {key}>
                  <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
                </div>
              )
            if (results.length === 0) message.error('No Results Found');
            return (results)
           // search by year and model
         } else if (year !== "" && make === "" && model !== "" && key === "" && reason === "") {
            let results =
            this.state.loading === true ? <Spin /> :
            this.state.data
              .filter(x => x.year === this.props.searchYear && x.model === this.props.searchModel)
              .map((e, key) =>
                <div key = {key}>
                  <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
                </div>
              )
            if (results.length === 0) message.error('No Results Found');
            return (results)
            // search by make and model
          } else if (year === "" && make !== "" && model !== "" && key === "" && reason === "") {
             let results =
             this.state.loading === true ? <Spin /> :
             this.state.data
               .filter(x => x.make === this.props.searchMake && x.model === this.props.searchModel)
               .map((e, key) =>
                 <div key = {key}>
                   <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
                 </div>
               )
             if (results.length === 0) message.error('No Results Found');
             return (results)
          }
    }

    render() {
      return (
        <div style = {{textAlign: 'center', marginTop: 20}}>
          {this.returnResults(this.props.searchYear, this.props.searchMake, this.props.searchModel, this.props.searchKey, this.props.searchReason)}
        </div>
      )
    }
}
