/* global google */

import React from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

let center = {
  lat: 36.5843,
  lng: -121.7535
};
const library = ['places'];
class MyComponents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      infoWindow: false,
      currentLocation: center,
      places: ''
    };
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.searchShops = this.searchShops.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.handleMapLoaded = this.handleMapLoaded.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({
          currentLocation: center
        });
      }
    );
  }

  handleMapLoaded(map) {
    navigator.geolocation.getCurrentPosition(
      position => {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({
          currentLocation: center,
          map: map
        },
        () => {
          this.searchShops();
          map.setCenter(this.state.currentLocation);
        });
      }
    );
  }

  searchShops() {
    const map = this.state.map;
    const request = {
      query: 'Mechanic',
      location: this.state.currentLocation,
      radius: '300'
    };
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          places: results
        });
      }
    });
  }

  openInfoWindow(index) {
    this.setState({
      infoWindow: index
    });
  }

  closeInfoWindow() {
    this.setState({
      infoWindow: null
    });
  }

  myLocationMarker(location) {
    return (
      <>
        <Marker icon={'https://maps.google.com/mapfiles/kml/paddle/blu-blank.png'} onLoad={() => this.openInfoWindow('myLocation')} position={location} onClick={() => this.openInfoWindow('myLocation')}>
          {this.state.infoWindow === 'myLocation' && <InfoWindow position={location} onCloseClick={() => this.closeInfoWindow()}>
            <div>
              <p className='fw-bolder m-0'>Your Location</p>
            </div>
          </InfoWindow>}
        </Marker>
      </>
    );
  }

  createMarker(place, index) {
    const { formatted_address: address, geometry, name, place_id: placeId } = place;
    const splitAddress = address.split(',');
    const query = `https://www.google.com/maps/search/?api=1&query=${name}&${geometry.location.lat}%2C${geometry.location.lng}&query_place_id=${placeId}`;
    return (
        <Marker key={index.toString()} position={geometry.location} onClick={() => this.openInfoWindow(index)}>
          {this.state.infoWindow === index && <InfoWindow position={geometry.location} key={`A${index}`} onCloseClick={() => this.closeInfoWindow()}>
            <div key={`B${index}`}>
                <p key={`C${index}`} className='fw-bolder m-1'>{name}</p>
                <p key={`D${index}`} className='m-0'>{splitAddress[0]}</p>
                <p key={`E${index}`} className='m-0'>{`${splitAddress[1]}, ${splitAddress[2]}`}</p>
                <a target='_blank' rel='noopener noreferrer' href={query} className='text-decoration-none'>
                  <p className='m-0'>View on Google Maps</p>
                </a>
            </div>
          </InfoWindow>}
        </Marker>
    );
  }

  render() {
    const defaultMapOptions = {
      disableDefaultUI: true
    };
    return (
      <div className='h-100 position-relative'>
        <button className='mt-2 btn btn-light search-button position-absolute' onClick={this.getLocation}>Get My Location</button>
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_TOKEN} libraries={library}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={this.handleMapLoaded}
            mapContainerClassName=''
            center={this.state.currentLocation}
            {...(this.state.maps ? { onCenterChanged: this.state.searchShops } : {})}
            zoom={13}
            options={defaultMapOptions}
          >
            {this.state.places && this.state.places.map((place, index) => this.createMarker(place, index))}
            {this.state.places && this.myLocationMarker(this.state.currentLocation)}
          </GoogleMap>
        </LoadScript>

      </div>
    );
  }
}

export default MyComponents;
