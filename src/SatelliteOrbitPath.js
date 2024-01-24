// SatelliteOrbitPath.js
import React, { useState, useEffect } from 'react';
import { Polyline } from 'react-leaflet';
import * as satellite from 'satellite.js';

const SatelliteOrbitPath = ({ tleLine1, tleLine2 }) => {
  const [orbitPaths, setOrbitPaths] = useState([]);

  useEffect(() => {
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    const generateOrbitPaths = () => {
      let paths = [];
      let currentPath = [];
      let previousLongitude = null;

      for (let i = 0; i <= 90; i++) {
        const time = new Date();
        time.setMinutes(time.getMinutes() + i * 2); // 2-minute intervals
        const positionAndVelocity = satellite.propagate(satrec, time);
        const positionEci = positionAndVelocity.position;
        const gmst = satellite.gstime(time);
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);

        // Check for crossing the antimeridian
        if (previousLongitude !== null && Math.abs(longitude - previousLongitude) > 180) {
          paths.push(currentPath);
          currentPath = [];
        }

        currentPath.push([latitude, longitude]);
        previousLongitude = longitude;
      }

      paths.push(currentPath); // Add the last path
      return paths;
    };

    setOrbitPaths(generateOrbitPaths());
  }, [tleLine1, tleLine2]);

  return (
    <>
      {orbitPaths.map((path, index) => (
        <Polyline key={index} positions={path} color="red" />
      ))}
    </>
  );
};

export default SatelliteOrbitPath;
