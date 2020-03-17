/*global google*/
import React, { Component,useState } from "react";
import { Map,GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import {withGoogleMap,GoogleMap,DirectionsRenderer,Marker} from "react-google-maps";



var results = '';
var duration = [];


export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      directions2:null
      
    };
  }

  
  

  

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const duration = new google.maps.DistanceMatrixService;

    const origin = { lat: 29.640749, lng: -82.341621 };
    const destination = { lat: 29.639418, lng: -82.341230 };
    
    directionsService.route({
      origin: new google.maps.LatLng(29.649183, -82.338116),
      destination: new google.maps.LatLng(29.639418, -82.341230),
      //destination: new google.maps.LatLng(29.640749, -82.341621),
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: [
           {
              location: new google.maps.LatLng(29.640749, -82.341621)
           }
      ]
   }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
         this.setState({
            directions: result,
         });
      } else {
        console.error(`error fetching directions ${result}`);
      }
   });

   directionsService.route({
    origin: new google.maps.LatLng(29.640749, -82.341621),
    destination: new google.maps.LatLng(29.639418, -82.341230),
    //destination: new google.maps.LatLng(29.640749, -82.341621),
    travelMode: google.maps.TravelMode.WALKING,
    // waypoints: [
    //      {
    //         location: new google.maps.LatLng(29.640749, -82.341621)
    //      }
    // ]
 }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
       this.setState({
          directions2: result,
       });
    } else {
      console.error(`error fetching directions ${result}`);
    }
 });

    // directionsService.route(
    //   {
    //     origin: origin,
    //     destination: destination,
    //     waypoints:[
    //       {
    //          location: new google.maps.LatLng(26.639418, -82.341230)
    //       }],
    //     travelMode: google.maps.TravelMode.DRIVING
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

  onMarkerClick = () => {
    {window.open("https://www.google.com/maps/dir/Parking+Garage+10,+Gainesville,+FL+32601/1505+Southwest+Archer+Road,+Gainesville,+FL/@29.6399896,-82.3438497,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88e8a39ee4f0ef5f:0x69423fe6af8aa344!2m2!1d-82.3416286!2d29.6406474!1m5!1m1!1s0x88e8a39f1ea3f735:0x14befcadd5cd624d!2m2!1d-82.3412409!2d29.6394103!3e2?hl=en")}
  }

  render() {
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
      
      >


        <DirectionsRenderer
          
          directions={this.state.directions}
          options={{
            // polylineOptions: {
            //     strokeOpacity: 0.5,
            //     strokeColor: '#FF0000',
            // },
            // markerOptions:{
            //   visible:true,
              
            // }
      
        }}
        />
         {/* <DirectionsRenderer
          directions={this.state.directions2}
        /> */}

        
        
{/* <Marker onClick={this.onMarkerClick}
        name={'Clinic'}
        position={{lat: 29.639418, lng: -82.341230 }} />
  <Marker /> */}
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
          
        </div>
        
      </div>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
  // apiKey: 'AIzaSyDBa6zDWNZyeAGZRbMb6F1gyYNgsd2_gUw'

})(MapContainer);

