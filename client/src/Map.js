import React, { Component } from 'react';
import { Map,GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '30%',
  height: '60%'
};


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

windowOpen = () => {
  {window.open("https://www.google.com/maps/dir//29.6394103,-82.3412409/@29.640024,-82.341305,17z?hl=en-US")}
}



  render() {
    return (
      
      <div>
        <div>
        <b>
        DEPARTMENT OF NEUROSURGERY
        </b>
        </div>
        <div>
        <i>
        CLICK ON MARKER TO VIEW DIRECTIONS FROM GARAGE TO CLINIC
        </i>
        </div>
        
        

      
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={{
         lat: 29.639418,
         lng: -82.341230
        }}
      
      >
      <Marker
        onClick={this.windowOpen}
      
        name={'UF Department of Neurosurgery'}
        
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>

          <button onClick={this.windowOpen}>
            View in Maps
          </button>
  
        </div>
       
      </InfoWindow>
    </Map>


    
    </div>
   
           
    );
      
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
})(MapContainer);