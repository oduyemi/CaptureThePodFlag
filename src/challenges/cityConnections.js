const validateCityConnections = (input) => {
    const coordinates = {
      Gbagada: { lat: 6.5584, lon: 3.3915 },
      Florida: { lat: 27.6648, lon: -81.5158 },
    };
  
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = (degree) => (degree * Math.PI) / 180;
      const R = 6371; // Earth's radius in kilometers
  
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) ** 2;
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };
  
    const expectedDistance = haversineDistance(
      coordinates.Gbagada.lat,
      coordinates.Gbagada.lon,
      coordinates.Florida.lat,
      coordinates.Florida.lon
    );
  
    const roundedDistance = Math.round(expectedDistance);
    if (parseInt(input) === roundedDistance) {
      return "FLAG{city_connections_success}";
    }
  
    return "Incorrect submission";
  };
  
  module.exports = validateCityConnections;
  