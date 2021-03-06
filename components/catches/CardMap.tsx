import { Ref, useEffect, useRef, memo } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

type CardMapProps = {
  catchMarkerCoords: Array<Number>;
};

const CardMap = ({ catchMarkerCoords }: CardMapProps) => {
  const mapRef: Ref<any> = useRef(null);

  useEffect(() => {
    let id;

    //* Define source
    const source = new TileJSON({
      url:
        'https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu',
      tileSize: 512,
      crossOrigin: 'anonymous',
    });
    //* Define vectorSource
    const vectorSource = new VectorSource({});
    //* Define map
    const map: Map = new Map({
      layers: [
        new TileLayer({
          source,
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      target: mapRef.current,
      view: new View({
        constrainResolution: true,
        center: fromLonLat(catchMarkerCoords),
        zoom: 19,
      }),
    });
    //* Put markers on map
    if (catchMarkerCoords) {
      const catchMarker: Feature = new Feature({
        geometry: new Point(fromLonLat(catchMarkerCoords)),
        name: 'Catch',
      });
      catchMarker.setStyle(
        new Style({
          image: new Icon({
            crossOrigin: 'anonymous',
            // For Internet Explorer 11
            scale: 0.04,
            src: '/fish.svg',
          }),
        })
      );
      vectorSource.addFeature(catchMarker);
    }
  }, []);

  return (
    <div className="h-80">
      <div
        id="map"
        className="w-full h-full m-auto  cursor-pointer border border-gray-400 bg-gray-600 rounded"
        ref={mapRef}
      >
        {' '}
      </div>
    </div>
  );
};

export const MemoCardMap = memo(CardMap, (prevProps, nextProps) => {
  if (prevProps.catchMarkerCoords === nextProps.catchMarkerCoords) {
    return true;
  } else {
    return false;
  }
});
