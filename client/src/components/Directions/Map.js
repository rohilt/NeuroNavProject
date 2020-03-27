/*global google*/
import React, { Component,useState } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Map,GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import {withGoogleMap,GoogleMap,DirectionsRenderer,Marker,Polyline} from "react-google-maps";
import { geolocated } from "react-geolocated";
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
            destination: {lat: 29.639418, lng: -82.341230},
            //destination: new google.maps.LatLng(29.640749, -82.341621),
            travelMode: google.maps.TravelMode.WALKING,
            waypoints: [
                 {
                    location: {lat: 29.640749, lng: -82.341621}
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

  onClick = () => {
    {window.open("https://www.google.com/maps/dir/The+Courtyards,+Southwest+3+Avenue,+Gainesville,+FL/Parking+Garage+10,+Gainesville,+FL/@29.6445242,-82.3432803,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88e8a384cf37eeef:0x6f9b8a40956146ba!2m2!1d-82.3381267!2d29.6489028!1m5!1m1!1s0x88e8a39ee4f0ef5f:0x69423fe6af8aa344!2m2!1d-82.3416286!2d29.6406474!3e0?hl=en")}
  }

  onClick2 = () => {
    {window.open("https://www.google.com/maps/dir/Parking+Garage+10,+Gainesville,+FL/UF+Health+Neuromedicine+%E2%80%93+Neuromedicine+Hospital/@29.6400288,-82.3438497,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88e8a39ee4f0ef5f:0x69423fe6af8aa344!2m2!1d-82.3416286!2d29.6406474!1m5!1m1!1s0x0:0x975ed398aad0d9a9!2m2!1d-82.3412409!2d29.6394103!3e2?hl=en")}
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
        <CardHeader title="Neuromedicine Hospital">
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
        <Button variant="contained" onClick={this.onClick}>
          View Directions to Parking
        </Button>
        <br/>
        <Button variant="contained" onClick={this.onClick2}>
          Walking Directions
        </Button>
        </CardActions>
      </Card>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD37HaMa828w2lvGbwkVZ2Y4dKAGoULOe4'
  // apiKey: 'AIzaSyDBa6zDWNZyeAGZRbMb6F1gyYNgsd2_gUw'

})(MapContainer);

