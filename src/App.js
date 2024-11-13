// App.js
import React, {useState} from 'react';
import SatelliteTracker from './SatelliteTracker';
import {SatelliteDropdown, fetchTleData} from "./SatelliteDropdown";

function App() {
    const [tleData, setTleData] = useState(null);
    const [selectedSatellite, setSelectedSatellite] = useState(null);

    const onSelectSatellite = (satellite) => {
        console.log(`inside onSelectSatellite: ${satellite}`)
        setSelectedSatellite(satellite)
        fetchTleData(satellite)
            .then((data) => setTleData(data))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <div style={{zIndex: 12000, position: 'relative'}}>
                <SatelliteDropdown onSelectSatellite={onSelectSatellite}/>
            </div>
            {tleData && (
                <div>
                    <h2>{selectedSatellite.value + " : " + selectedSatellite.label}</h2>
                    <div>
                        <SatelliteTracker name={selectedSatellite.value} tleLine1={tleData[0]} tleLine2={tleData[1]}/>
                    </div>
                </div>
            )}
        </div>
    );
}


export default App;
