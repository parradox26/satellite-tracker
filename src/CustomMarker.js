import React from 'react';
import './CustomMarker.css';

const CustomMarker = ({ text }) => (
  <div className="custom-marker">
    <div className="marker-text">{text}</div>
    <div className="marker-arrow"></div>
  </div>
);

export default CustomMarker;
