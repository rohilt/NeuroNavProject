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
    {window.open("https://www.google.com/maps/place/Parking+Garage+10,+Newell+Dr,+Gainesville,+FL+32603/@29.6406203,-82.343852,17z/data=!3m1!4b1!4m5!3m4!1s0x88e8a39ee4f6ccf9:0x949ff4a6f6d2cd7f!8m2!3d29.6406203!4d-82.3416633")}
  }

  render() {
    return (
      
      <div>
      

        <div>
        <b>
        PARKING GARAGE 10
        </b>
        </div>
        <div>
        <i>
        CLICK ON MARKER TO VIEW DIRECTIONS TO GARAGE
        </i>
        </div>

      
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={{
         lat: 29.640861,
         lng: -82.341648
        }}
      
      >
      <Marker
        onClick={this.windowOpen}
        name={'Parking Garage'}
        
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
          
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