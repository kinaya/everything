import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'

class Map extends React.Component {

  componentDidMount() {

    this.map = L.map('map').setView(this.props.item.coordinates, 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    L.marker(this.props.item.coordinates).addTo(this.map)
  }

  render() {
    return (<div id="map"></div>)
  }
}

const mapStateToProps = ({userCoordinates}) => (
  {userCoordinates}
)

export default connect(mapStateToProps)(Map);
