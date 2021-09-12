import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn, resetImage }) => {
    return (
        isSignedIn ?
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim pa3 pointer white' onClick={() => {
                onRouteChange('Signin');
                resetImage();
                }}>Sign Out</p>
        </nav> :
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim pa3 pointer white' onClick={() => onRouteChange('Signin')}>Sign In</p>
            <p className='f3 link dim pa3 pointer white' onClick={() => onRouteChange('Register')}>Register</p>
        </nav>
    );
}

export default Navigation;