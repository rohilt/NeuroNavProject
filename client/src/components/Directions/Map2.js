// 
/*global google*/
import React, { Component, useState } from "react";
import { Map,GoogleApiWrapper, InfoWindow} from 'google-maps-react';

import {
  Marker,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";



export class MapContainer extends Component {
 

  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      // lat: 0,
      // lng: 0,
    };
  }

  componentDidMount(){
    const directionsService = new google.maps.DirectionsService();

    // if (!!navigator.geolocation) {
    //   navigator.geolocation.watchPosition((position) => {
    //     this.setState({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     });
        
    //   },
    //   (err) => console.log(err),
    //   { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
    //   );
    // } else {
      
     
    // }
  
    // const origin = { lat: lat, lng: lng };
    // const destination = { lat: 29.640749, lng: -82.341230 };

    // directionsService.route(
    //   {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: google.maps.TravelMode.WALKING
    //   },
    //   (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.setState({
    //         directions: result
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );


  }



  onMarkerClick = () => {
    {window.open("https://www.google.com/maps/dir//Parking+Garage+10,+Gainesville,+FL+32601/@29.640861,-82.341648,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88e8a39ee4f0ef5f:0x69423fe6af8aa344!2m2!1d-82.3416286!2d29.6406474?hl=en")}
  }
  render() {
    const { lat, lng } = this.state;
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 29.640749, lng: -82.341621}}
        defaultZoom={18}
      >
        <Marker onClick={this.onMarkerClick}
        name={'Parking Lot 10'}
        position={{lat: 29.640749, lng: -82.341621}} />
  <Marker />
      </GoogleMap>
    ));

    return (
      <div>
         <div>
        <b>
        PARKING LOT 10
        </b>
        </div>
        <div>
        <i>
        CLICK ON MARKER TO VIEW DIRECTIONS TO PARKING LOT
        </i>
        </div>
        <GoogleMapExample
          containerElement={<div style={{ height: `450px`, width: "450px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
})(MapContainer);
