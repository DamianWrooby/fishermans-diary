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
import Control from 'ol/control/Control';
import { defaults } from 'ol/control';
import { fromLonLat, toLonLat, transform } from 'ol/proj';

const CatchMap = ({ getDataCallback, showFormCallback }) => {
  const mapRef = useRef(null);

  let map = undefined;

  const fishMarker = new Feature({
    geometry: new Point(fromLonLat([18, 53])),
    name: 'Berlin',
    population: 40000,
    rainfall: 500,
  });
  fishMarker.setStyle(
    new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        // For Internet Explorer 11
        scale: 0.04,
        src: '/fish.svg',
      }),
    })
  );

  useEffect(() => {
    const polandLonLat = [19.408318, 52.121216];
    const polandWebMercator = fromLonLat(polandLonLat);

    const source = new TileJSON({
      url:
        'https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu',
      tileSize: 512,
      crossOrigin: 'anonymous',
    });
    const vectorSource = new VectorSource({
      features: [fishMarker],
    });
    const button = document.createElement('button');
    button.innerHTML = '<i></i>';
    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);
    const myControl = new Control({ element: element });

    map = new Map({
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
        center: polandWebMercator,
        zoom: 6,
      }),
      controls: defaults().extend([myControl]),
    });

    map.on('click', (evt) => {
      console.info(evt.pixel);
      const coords = toLonLat(evt.coordinate);
      getDataCallback(coords);
      const [lon, lat] = coords;
      showFormCallback();
    });

    if ('geolocation' in navigator) {
      console.log('Geolocation API available');

      const watchLocation = () => {
        const userMarker = new Feature({
          geometry: new Point(polandWebMercator),
        });
        userMarker.setStyle(
          new Style({
            image: new Icon({
              color: '#4271AE',
              crossOrigin: 'anonymous',
              src: '/fish.svg',
              scale: 0.04,
            }),
          })
        );
        console.log('Add feature');
        vectorSource.addFeature(userMarker);
        navigator.geolocation.watchPosition((position) => {
          const newPosition = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          console.log('Dynamic position changed:', newPosition);
          userMarker.setGeometry(new Point(newPosition));
        });
      };
      const centerOnUser = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const viewPosition = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          map.getView().animate({ zoom: 19, center: viewPosition });
        });
      };

      watchLocation();
      centerOnUser();
    }
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
