import React from 'react';
import { Header } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Map extends React.Component {
  render() {
    return (
        <div>
          <Header as="h2" inverted textAlign="center">Laundry Room Map</Header>
          <GoogleMapReact>

          </GoogleMapReact>
        </div>
    );
  }
}

export default Map;
