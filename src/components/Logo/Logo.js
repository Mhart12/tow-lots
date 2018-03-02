import React from 'react';

import kcLogo from '../../assets/images/KCMOlogo-zchp.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={kcLogo} alt="KC" />
    </div>
);

export default logo;