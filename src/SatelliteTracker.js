// SatelliteTracker.js
import React, {useEffect, useState} from 'react';
import * as satellite from 'satellite.js';
import {MapContainer, Marker, TileLayer, Tooltip} from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import SatelliteOrbitPath from './SatelliteOrbitPath';

const CustomMarkerIcon = ({text}) => {
    // const map = useMap();

    return L.divIcon({
        className: 'custom-marker-icon',
        html: ReactDOMServer.renderToString(<CustomMarker text={text}/>),
        iconSize: L.point(60, 30, true), // Adjust size as needed
        iconAnchor: [30, 30],
    });
};


const SatelliteTracker = ({name, tleLine1, tleLine2}) => {
    const [position, setPosition] = useState([0, 0]);
    const [zoom] = useState(2);

    useEffect(() => {
        console.log(`Tracking ${name} with TLE: ${tleLine1} ${tleLine2}`);
        const interval = setInterval(() => {
            const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
            const positionAndVelocity = satellite.propagate(satrec, new Date());
            const positionEci = positionAndVelocity.position;
            const gmst = satellite.gstime(new Date());

            const positionGd = satellite.eciToGeodetic(positionEci, gmst);
            const longitude = satellite.degreesLong(positionGd.longitude);
            const latitude = satellite.degreesLat(positionGd.latitude);

            setPosition([latitude, longitude]);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [tleLine1, tleLine2]);

    const markerIcon = CustomMarkerIcon({text: name});

    return (
        <MapContainer center={[0, 0]} zoom={zoom} style={{height: '100vh', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position} icon={markerIcon}>
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    {`Lat: ${position[0].toFixed(2)}, Lng: ${position[1].toFixed(2)}`}
                </Tooltip>
            </Marker>
            <SatelliteOrbitPath tleLine1={tleLine1} tleLine2={tleLine2}/>
        </MapContainer>
    );
};

export default SatelliteTracker;
