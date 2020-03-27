/*global google*/
import React, { Component,useState } from "react";
import { Map,GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import {withGoogleMap,GoogleMap,DirectionsRenderer,Marker} from "react-google-maps";

let distString = "Loading..";
let durString = "Loading..";
let address = "..."
var loadState = 0;
var jsonParsed;


var results = '';
var duration = [];


export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      directions2:null,
      currentLatLng: {
        lat: 0,
        lng: 0
      }
      
    };
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isMarkerShown: true
          }))
        }
      )
    } else {
      
    }
  }

  showDirections = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: { lat: 29.649183, lng: -82.338116 },
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
  }
  

  

  componentDidMount() {
    
    this.showCurrentLocation();
    this.showDirections();

    



  }

  onMarkerClick = () => {
    {window.open("https://www.google.com/maps/dir/Parking+Garage+10,+Gainesville,+FL+32601/1505+Southwest+Archer+Road,+Gainesville,+FL/@29.6399896,-82.3438497,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88e8a39ee4f0ef5f:0x69423fe6af8aa344!2m2!1d-82.3416286!2d29.6406474!1m5!1m1!1s0x88e8a39f1ea3f735:0x14befcadd5cd624d!2m2!1d-82.3412409!2d29.6394103!3e2?hl=en")}
  }

  getDistTime ()
  {
    var xhr = new XMLHttpRequest()
    
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
      jsonParsed = JSON.parse(xhr.responseText)
      distString = jsonParsed["distance"]
      durString = jsonParsed["duration"]
      address = jsonParsed["address"]
      if(loadState == 0)
      {
        this.setState({ state: this.state });
      }
     loadState = 1;
    })
    // open the request with the verb and the url
    xhr.open('GET', '/directions?name=SamplePatient')
    // send the request
    xhr.send()
  }

  render() {
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
      
      
        defaultZoom={18}
      >
        <Marker onClick={this.onMarkerClick}
        name={'Parking Lot 10'}
        position={this.state.currentLatLng} />
  <Marker />


        <DirectionsRenderer

          
          directions={this.state.directions}
          options={{
          
        }}
        />
        
      </GoogleMap>
      
    ));

    this.getDistTime();
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
        <b>
        Distance: {distString}
        </b> 
        </div>
        <div>
        <b>
        Estimated Time: {durString}
        </b>
        </div>
      </div>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
  // apiKey: 'AIzaSyDBa6zDWNZyeAGZRbMb6F1gyYNgsd2_gUw'

})(MapContainer);

