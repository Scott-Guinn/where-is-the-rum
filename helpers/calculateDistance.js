// haversine formula
const calculateDistance = (pointA, pointB) => {
  console.log('calculateDistance has been called - pointA: ', pointA, 'pointB: ', pointB);
  // returns distance between point A and point B in meters
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((pointB.lat - pointA.lat) * p) / 2 +
    c(pointA.lat * p) * c(pointB.lat * p) *
    (1 - c((pointB.lng - pointA.lng) * p)) / 2;

  return 1000 * 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

module.exports = { calculateDistance };