import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'

class Map extends React.Component {

  componentDidMount() {

    // Set center
    let center = [57.7091279, 11.9047719];
    if(this.props.value && this.props.value.length > 0) {
      center = this.props.value
    } else if (this.props.coordinates) {
      center = this.props.coordinates
    }

    // Create map
    this.map = L.map('map').setView(center, 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    // Add a marker if one exists, ie "edit"
    if(this.props.value && this.props.value.length > 0) {
      this.marker = L.marker(this.props.value).addTo(this.map)
    }

    // Place marker
    this.map.on('click', (e) => {
      const coordinates = [e.latlng.lat, e.latlng.lng];

      if(!this.marker) {
        this.marker = L.marker(coordinates).addTo(this.map);
      } else {
        this.marker.setLatLng(coordinates)
      }

      this.props.onChange(coordinates)
    })

  }

  render() {
    return <div id="map"></div>
  }
}

const mapStateToProps = ({coordinates}) => {
  return ({coordinates})
}

export default connect(mapStateToProps)(Map);
