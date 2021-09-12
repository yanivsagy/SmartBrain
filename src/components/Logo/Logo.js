import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
       <div className='index ma4 mt0'>
            <Tilt className="index Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="index Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} src={brain} alt='brain logo'/>
                </div>
            </Tilt>
       </div>
    );
}

export default Logo;