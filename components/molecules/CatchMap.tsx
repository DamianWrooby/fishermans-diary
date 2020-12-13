import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
import { fromLonLat, toLonLat } from 'ol/proj';
import olms from 'ol-mapbox-style';

// Dokończyć geolocation API

const CatchMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let viewPosition: string;
    const polandLonLat = [19.408318, 52.121216];
    const polandWebMercator = fromLonLat(polandLonLat);
    const source = new TileJSON({
      url:
        'https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu',
      tileSize: 512,
      crossOrigin: 'anonymous',
    });

    const mapInit = (position) => {
      const map = new Map({
        layers: [
          new TileLayer({
            source,
          }),
        ],
        target: mapRef.current,
        view: new View({
          constrainResolution: true,
          center: position,
          zoom: 19,
        }),
      });

      map.on('click', (evt) => {
        console.info(evt.pixel);
        const coords = toLonLat(evt.coordinate);
        const [lon, lat] = coords;
      });
    };

    const getLocation = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        viewPosition = fromLonLat([
          position.coords.longitude,
          position.coords.latitude,
        ]);
        mapInit(viewPosition);
      });
    };

    if ('geolocation' in navigator) {
      console.log('Geolocation API available');
      getLocation();
    } else {
      console.log('Geolocation API not available');
      viewPosition = polandWebMercator;
      mapInit(viewPosition);
    }

    // const styleJson =
    //   'https://api.maptiler.com/maps/76c95155-3672-495b-a1b0-e2cf76a359d6/style.json?key=GflTzOMvFDCYQ9RjOmMu';

    // const olMap1 = new Map({
    //   target: mapRef.current,
    //   view: new View({
    //     constrainResolution: true,
    //     center: polandWebMercator,
    //     zoom: 6,
    //   }),
    // });

    // olms(olMap, styleJson);
  }, []);

  return (
    <div className="w-screen m-auto">
      <div
        id="map"
        className="w-4/6 h-screen/2 m-auto  cursor-pointer"
        ref={mapRef}
      >
        {' '}
      </div>
    </div>
  );
};

export default CatchMap;
