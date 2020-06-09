
export const addDistance = (items, coordinates) => {
  const userLat = coordinates[0]
  const userLng = coordinates[1]

  if(Array.isArray(items)) {

    items.forEach(item => {
      if(item.coordinates) {
        const itemLat = item.coordinates[0]
        const itemLng = item.coordinates[1]
        if(itemLat && itemLng) {
          const distance = getDistance(userLat, userLng, itemLat, itemLng)
          item.distance = distance
        } else {
          item.distance = false
        }
      }
    })

  } else {

    if(items.coordinates) {
      const itemLat = items.coordinates[0]
      const itemLng = items.coordinates[1]

      if(itemLat && itemLng) {
        const distance = getDistance(userLat, userLng, itemLat, itemLng)
        items.distance = distance
      } else {
        items.distance = false
      }      
    }

  }

  return items;
}

const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1) * (Math.PI/180);
  var dLon = (lon2-lon1) * (Math.PI/180);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos((lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180))) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  var distance = Math.round(d)
  return distance;
}
