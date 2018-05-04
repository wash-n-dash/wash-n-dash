import React from 'react';
import { Header } from 'semantic-ui-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Locations } from '/imports/api/location/location';

//note: code formatted for ES6 here
export class MachinesMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map 
        style={{width: "100%", margin: "0"}}
        google={this.props.google}
        initialCenter={{
          lat: 21.3,
          lng: -157.82
        }}
        onClick={this.onMapClicked}>
        {this.props.locations.map((loc) =>
          (<Marker
            location={{lat: loc.lat, lng: loc.lng}}
            onClick={this.onMarkerClick}
            name={loc.name} />))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBiFw-tcA7fN9biSJtei2mpITYJqDexBHc"
})(
  withTracker(() => {
    const subscription = Meteor.subscribe('Locations');
    return {
      locations: Locations.find({}).fetch(),
      ready: (subscription.ready()),
    };
})(MachinesMap));
