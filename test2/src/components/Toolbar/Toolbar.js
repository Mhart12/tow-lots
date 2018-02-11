import React from 'react';

import classes from './Toolbar.css'

class toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        alert('Logging in...')
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