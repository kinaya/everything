import React from 'react'
import L from 'leaflet'

class Map extends React.Component {

  componentDidMount() {

    const coordinates = this.props.item.coordinates;

    this.map = L.map('map').setView(coordinates, 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    L.marker(coordinates).addTo(this.map)
  }

  render() {
    return (<div id="map"></div>)
  }
}

export default Map;
