import React from 'react';
import './CustomMarker.css';
import satLogo from './satellite.png'


const CustomMarker = ({text}) => (
    <div className="custom-marker">
        <div className="marker-text">{text}</div>
        <div className="marker-arrow"></div>
        <img src={satLogo} width={30} height={30} alt={'satellite'}/>

    </div>
);

export default CustomMarker;
