import { useEffect, useRef } from 'react';
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
import { fromLonLat, toLonLat, transform } from 'ol/proj';

// NIE POJAWIA SIĘ PUNKT!!!

const CatchMap = ({ getDataCallback, showFormCallback }) => {
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

    const berlin = new Feature({
      geometry: new Point(fromLonLat([18, 53])),
      name: 'Berlin',
      population: 40000,
      rainfall: 500,
    });

    berlin.setStyle(
      new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          // For Internet Explorer 11
          scale: 0.04,
          src: '/fish.svg',
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [berlin],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    console.log(vectorSource, berlin);

    const mapInit = (position) => {
      const map = new Map({
        layers: [
          new TileLayer({
            source,
          }),
          vectorLayer,
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
        getDataCallback(coords);
        const [lon, lat] = coords;
        showFormCallback();
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
