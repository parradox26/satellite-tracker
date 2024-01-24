// App.js
import React from 'react';
import SatelliteTracker from './SatelliteTracker';

function App() {
  const tleLine1 = '1 25544U 98067A   24023.07374280  .00024895  00000+0  44611-3 0  9998';
  const tleLine2 = '2 25544  51.6425 319.3558 0004949 119.1990 352.4849 15.49780674435890';


  return (
    <div>
      <SatelliteTracker tleLine1={tleLine1} tleLine2={tleLine2} />
    </div>
  );
}

export default App;
