import { Ref, useEffect, useRef } from 'react';
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
import { fromLonLat, toLonLat, transform } from 'ol/proj';

type MapProps = {
  getDataCallback: (args: Array<Number>) => void;
  showFormCallback: () => void;
};

const CatchMap = ({
  getDataCallback,
  showFormCallback,
}: MapProps): JSX.Element => {
  const mapRef: Ref<any> = useRef(null);

  const fishMarker: Feature = new Feature({
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
    const polandLonLat: Array<Number> = [19.408318, 52.121216];
    const polandWebMercator: Array<Number> = fromLonLat(polandLonLat);
    let id;

    const source = new TileJSON({
      url:
        'https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu',
      tileSize: 512,
      crossOrigin: 'anonymous',
    });
    const vectorSource = new VectorSource({});

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
        center: polandWebMercator,
        zoom: 6,
      }),
      // controls: defaultControls().extend([myZoomToExtent]),
    });

    map.on('click', (evt) => {
      console.info(evt.pixel);
      const coords = toLonLat(evt.coordinate);
      console.log('coords:', coords);
      getDataCallback(coords);
      const [lon, lat] = coords;
      showFormCallback();
    });

    if ('geolocation' in navigator) {
      console.log('Geolocation API available');
      let currPosition;

      const errorCallback = (err: any): void => {
        console.log(err.code, err.message);
      };

      const watchLocation = (): void => {
        const userMarker: Feature = new Feature({
          name: 'User',
          geometry: new Point(polandWebMercator),
        });
        userMarker.setStyle(
          new Style({
            image: new Icon({
              crossOrigin: 'anonymous',
              src: '/point.svg',
              scale: 0.1,
            }),
          })
        );
        vectorSource.addFeature(userMarker);

        id = navigator.geolocation.watchPosition((position) => {
          currPosition = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          console.log('Dynamic position changed:', currPosition);
          userMarker.setGeometry(new Point(currPosition));
        }, errorCallback);
      };

      const centerOnUser = (): void => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const viewPosition: Array<Number> = fromLonLat([
              position.coords.longitude,
              position.coords.latitude,
            ]);
            map.getView().animate({ zoom: 19, center: viewPosition });
          },
          errorCallback,
          { timeout: 10000, enableHighAccuracy: true }
        );
      };

      const button: HTMLButtonElement = document.createElement('button');
      button.innerHTML = '<div class="center-btn-icon"></div>';
      const element: HTMLDivElement = document.createElement('div');
      element.className = 'center-btn ol-unselectable ol-control';
      button.addEventListener('click', function (): void {
        map.getView().animate({ zoom: 19, center: currPosition });
      });
      element.appendChild(button);

      const centerBtn = new Control({ element: element });

      map.addControl(centerBtn);

      watchLocation();
      centerOnUser();
    }

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  return (
    <div className="w-screen m-auto">
      <div
        id="map"
        className="w-9/12 h-2/3 m-auto  cursor-pointer"
        ref={mapRef}
      >
        {' '}
      </div>
    </div>
  );
};

export default CatchMap;
