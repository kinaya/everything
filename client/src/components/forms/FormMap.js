import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'

class FormMap extends React.Component {

  componentDidMount() {

    const savedCoordinates = this.props.input.value;
    const userCoordinates = this.props.userCoordinates;

    // Set center
    let center = [57.7091279, 11.9047719];
    if(savedCoordinates) {
      center = savedCoordinates
    } else if (userCoordinates) {
      center = userCoordinates
    }

    // Create map
    this.map = L.map('map').setView(center, 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    // Add a marker if one exists, ie "edit"
    if(savedCoordinates) {
      this.marker = L.marker(savedCoordinates).addTo(this.map)
    }

    // Place marker
    this.map.on('click', (e) => {
      const coordinates = [e.latlng.lat, e.latlng.lng];

      if(!this.marker) {
        this.marker = L.marker(coordinates).addTo(this.map);
      } else {
        this.marker.setLatLng(coordinates)
      }

      this.props.input.onChange(coordinates)
    })

  }

  render() {

    const { input, meta, label } = this.props;

    return (
      <div className={`formField ${input.name}`}>
        <h6>{label}</h6>
        <div id="map" />
        <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
      </div>
    )
  }
}

const mapStateToProps = ({userCoordinates}) => {
  return ({userCoordinates})
}

export default connect(mapStateToProps)(FormMap);
