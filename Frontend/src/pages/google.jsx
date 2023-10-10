import React, { useEffect } from "react";

function GoogleMap({ rideDetails }) {
  useEffect(() => {
    const iframeData = document.getElementById("iframeId");

    if (rideDetails && rideDetails.startLocation && rideDetails.startLocation.coordinates) {
      const lat = rideDetails.startLocation.coordinates[0];
      const lon = rideDetails.startLocation.coordinates[1];
      iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
      
    }
  }, [rideDetails]);

  return (
    <div>
      <iframe id="iframeId" title="Google Map" height="500px" width="100%"></iframe>
    </div>
  );
}

export default GoogleMap;