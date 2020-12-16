import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import olms from 'ol-mapbox-style';

// NIE POJAWIA SIĘ PUNKT!!!

const CatchMap = ({ getDataCallback }) => {
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

    const vectorSource = new VectorSource({
      // empty vector
    });

    const iconStyle = new Style({
      image: new Icon(
        /** @type {olx.style.IconOptions} */ {
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: 'http://ol3js.org/en/master/examples/data/icon.png',
        }
      ),
    });
    const iconFeature = new Feature({
      geometry: new Point(transform([18.01, 53.12], 'EPSG:4326', 'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    vectorSource.addFeature(iconFeature);

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: iconStyle,
    });

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
