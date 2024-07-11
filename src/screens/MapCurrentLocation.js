import React, { useEffect, useState } from 'react'

function MapCurrentLocation() {
    const [location, setlocation] = useState(null)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((value) => {
            // console.log(value.coords)
            setlocation(value.coords)
      })
    }, [])
    
  return (
      <div style={{overflow:"hidden"}} >
          {location ? <iframe height={"800"} width={"800"} src={`//maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}></iframe>: <div>Location not Found</div>}
    </div>
  )
}

export default MapCurrentLocation