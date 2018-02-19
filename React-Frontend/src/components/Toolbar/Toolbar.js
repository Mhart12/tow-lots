import React from 'react';

import axios from 'axios'; 

import classes from './Toolbar.css'
// import Logo from '../Logo/Logo'

class toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        axios
          .get('https://kc-tow-lots.firebaseio.com/savedVehicles.json')
          .then(({data})=> {
            this.setState({ 
              data: data,
            });
        }).catch((err)=> {})
    }

    login() {
        alert('Logging in...')
        console.log(this.state.data)
    }  

    render() {
    	return (
			<header className = {classes.Toolbar}>	
                <div> Kansas City Towlots </div>
				<button className ={classes.Login} onClick = {this.login}> Log In </button>
			</header>
		)
	}
}

export default toolbar;