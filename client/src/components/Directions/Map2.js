/*global google*/
import React, { Component,useState } from "react";
import { Map,GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import {withGoogleMap,GoogleMap,DirectionsRenderer,Marker,Polyline} from "react-google-maps";
import { geolocated } from "react-geolocated";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CardHeader, CardActions, CardMedia, CardContent, Typography } from "@material-ui/core";




let distString = "Loading..";
let durString = "Loading..";
let address = "..."
var loadState = 0;
var jsonParsed;


var results = '';
var duration = [];
let latitude = 0;
let longitude = 0;





export class MapContainer extends Component {
  

  constructor(props) {
    
    
    super(props);

    this.state = {
      
      directions: null,

      
      
    };

  }
  



  

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(() => ({
            
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            
          }))
        }
      )
      console.log(this.state.currentLatLng)
    } else {
      
    }
   
  }

  showDirections = () => {



    
    const directionsService = new google.maps.DirectionsService();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          
          latitude = position.coords.latitude
          longitude = position.coords.longitude
          console.log(latitude);
          directionsService.route({
            origin: {lat: latitude, lng: longitude},
            destination: {lat: 29.606026, lng: -82.365255},
            //destination: new google.maps.LatLng(29.640749, -82.341621),
            travelMode: google.maps.TravelMode.DRIVING
            
         }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
               this.setState({
                  directions: result,
               });
            } else {
              console.error(`error fetching directions ${result}`);
            }

          })
        }
      )
      console.log(latitude)
    } else {
      
    }
    
  }
  

  
  

  componentDidMount() {
    
    // this.showCurrentLocation();
    this.showDirections();

    


    //set destination
   

    // this.showCurrentLocation.then(() => {
    //   this.showDirections();
  //  });
    
    

  }

  onMarkerClick = () => {
    {window.open("https://www.google.com/maps/dir//Norman+Fixel+Institute+for+Neurological+Diseases,+3009+SW+Williston+Rd,+Gainesville,+FL+32608/@29.605887,-82.3666739,16.91z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88e8a35939af2041:0x30cb2d3cb1346c33!2m2!1d-82.3652425!2d29.6057575!3e0?hl=en")}
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
      
      // defaultCenter={{lat: 29.649183, lng: -82.338116 }}
        defaultZoom={18}
      >
        {/* <Polyline path={[{lat: 29.649183, lng: -82.338116 },{lat: 29.639418, lng: -82.341230}]} options={{ strokeColor: "#FF0000 " }} /> */}
        <Marker onClick={this.onMarkerClick}
        name={'Parking Lot 10'}
        position={{lat: this.state.lat, lng:this.state.lng}} />
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
      <Card variant="outlined">
        <CardHeader title="Norman Fixel Institute">
        </CardHeader>
        <CardMedia>
        <GoogleMapExample
          containerElement={<div style={{ height: `450px`, width: "450px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        </CardMedia>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Distance: {distString}
        <br/>
        Estimated Time: {durString}
        </Typography>
        </CardContent>
        {/* <div>
        <b>
        latitude: {this.props.coords.latitude}
        </b>
        </div>
        <div>
        <b>
        longitude: {this.props.coords.longitude}
        </b>
        </div> */}
        <CardActions>
        <Button variant="contained" onClick={this.onMarkerClick}>
          View in Maps
        </Button>
        </CardActions>
      </Card>
      // <div>
      //   <div>
      //   <b>
      //   NORMAN FIXEL INSTITUTE
      //   </b>
      //   </div>
      //   <div>
      //   <button onClick={this.onMarkerClick}>
      //     View in Maps
      //   </button>
      //   </div>
      //   <div>
          
      //   </div>
        
      //   <GoogleMapExample
      //     containerElement={<div style={{ height: `450px`, width: "450px" }} />}
      //     mapElement={<div style={{ height: `100%` }} />}
      //   />

      // <div>
      //   <b>
      //   Distance: {distString}
      //   </b> 
      //   </div>
      //   <div>
      //   <b>
      //   Estimated Time: {durString}
      //   </b>
      //   </div>
      //   {/* <div>
      //   <b>
      //   latitude: {this.props.coords.latitude}
      //   </b>
      //   </div>
      //   <div>
      //   <b>
      //   longitude: {this.props.coords.longitude}
      //   </b>
      //   </div> */}
      // </div>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
  // apiKey: 'AIzaSyDBa6zDWNZyeAGZRbMb6F1gyYNgsd2_gUw'

})(MapContainer);

