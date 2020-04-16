import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import mapStyles from './Map.module.css';

const isDomAvailable = typeof window !== 'undefined';

if ( isDomAvailable ) {
  // To get around an issue with the default icon not being set up right between using React
  // and importing the leaflet library, we need to reset the image imports
  // See https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
    iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
    shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' )
  });
}

const Map = ({ children }) => {
  if ( !isDomAvailable ) {
    return (
      <div className={mapStyles.map}>
        <p className={mapStyles.mapLoading}>Loading map...</p>
      </div>
    );
  }

  const mapSettings = {
    className: mapStyles.mapBase,
    zoomControl: false,
    center: [0, 0],
    zoom: 4
  };

  return (
    <div className={mapStyles.map}>
      <BaseMap {...mapSettings}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <ZoomControl position="bottomright" />
        { children }
      </BaseMap>
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultBaseMap: PropTypes.string,
  mapEffect: PropTypes.func,
};

export default Map;