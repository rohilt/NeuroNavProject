/*global google*/
import React, { Component,useState } from "react";
import { Map,GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {withGoogleMap,GoogleMap,DirectionsRenderer} from "react-google-maps";



var results = '';
var duration = [];


export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      
    };
  }

  
  

  

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const duration = new google.maps.DistanceMatrixService;

    const origin = { lat: 29.640749, lng: -82.341621 };
    const destination = { lat: 29.639418, lng: -82.341230 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    duration.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;

        for (var i = 0; i < originList.length; i++) {
          results = response.rows[i].elements;
          
          
            
                //setDuration(duration.concat(results[0].duration.text));
          
        }
      
        }
      }
    );
  }

  

  render() {
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        
      >

        <DirectionsRenderer
          directions={this.state.directions}
        />
        
      </GoogleMap>
      
    ));

    
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
        <div>
          
        </div>
        
        <GoogleMapExample
          containerElement={<div style={{ height: `450px`, width: "450px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <div>
          {duration[0]}
        </div>
        
      </div>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
})(MapContainer);

