import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';



export default class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {}
    }
  }
  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      center: props
    })
  }
  render() {
    console.log("Props:", this.props)
    console.log("State: ", this.state.center)
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDQ7rLLKJO_YC-av1T8GLELprcBGcl1OLc"
        }}
        center={this.props.center}
        defaultZoom={11}
      >
        
      </GoogleMapReact>
    );
  }
}