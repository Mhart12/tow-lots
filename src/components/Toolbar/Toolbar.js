import React from 'react';

import classes from './Toolbar.css'

class toolbar extends React.Component {

    render() {
    	return (
			<header className = {classes.Toolbar}>
        <div> Kansas City Towlots </div>
			</header>
		)
	}
}

export default toolbar;
