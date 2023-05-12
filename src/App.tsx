import { useCallback, useRef, useState } from 'react';
import Map, { MapboxStyle, MapLayerMouseEvent, MapRef, Marker } from 'react-map-gl';
import bbox from '@turf/bbox';
import MAP_STYLE from './map-style';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const mapRef = useRef<MapRef | null>(null);
  const [marker, setMarker] = useState<any>(null);

  const onClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0];
      if (feature) {

        const [minLng, minLat, maxLng, maxLat] = bbox(feature);
        const center = mapRef.current?.getCenter()
        setMarker({
          ...center,
          ...feature.properties
        })
        mapRef.current?.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat]
          ],
          { padding: 40, duration: 1000 }
        );
      }
    }, [])

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 37.78,
          longitude: -122.4,
          zoom: 11
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        onClick={onClick}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        {marker && (
          <Marker
            longitude={marker.lng}
            latitude={marker.lat}
            anchor='bottom'
          >
            <div className='map'>population:{marker.population}</div>
          </Marker>
          )}
      </Map>
    </>
  );
}

export default App;