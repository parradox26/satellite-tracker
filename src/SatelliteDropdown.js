import Select from 'react-select';
//https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=3le
const satelliteOptions = [
    {value: 'ISS', label: 'International Space Station', noradId: 25544, tle: null},
    {value: 'HST', label: 'Hubble Space Telescope', noradId: 20580, tle: null},
    {value: 'Dragon', label: 'Dragon', noradId: 61791, tle: null},
    {value: 'Starlink', label: 'Starlink', noradId: 25544, tle: null},
    // Add more satellite options as needed
];

const SatelliteDropdown = ({onSelectSatellite}) => {
    const handleChange = (selectedOption) => {
        onSelectSatellite(selectedOption);
    };

    return (
        <Select
            options={satelliteOptions}
            onChange={handleChange}
            placeholder="Select a satellite"
        />
    );
};

const fetchTleData = async (satellite) => {
    if (!satellite) return null;
    try {
        if (satellite.tle) return satellite.tle
        console.log(satellite)
        const url = `https://celestrak.org/NORAD/elements/gp.php?CATNR=${satellite.noradId}&FORMAT=2le`
        console.log('calling', url)
        const response = await fetch(url);
        const tleData = (await response.text()).split('\n').map(line => line.trim());
        //Add tle data to satellite options
        satelliteOptions.find((option) => option.noradId === satellite.noradId).tle = tleData

        return tleData
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {SatelliteDropdown, fetchTleData};