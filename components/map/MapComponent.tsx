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
import { fromLonLat, toLonLat } from 'ol/proj';
import Control from 'ol/control/Control';
import { PinchZoom, defaults as defaultInteractions } from 'ol/interaction';
export interface MapProps {
  sourceUrl: string;
  markers?: Array<Number>;
  centerCoords: Array<Number>;
  getDataCallback?: (args: Array<Number>) => void;
  showFormCallback?: () => void;
  geolocation?: boolean;
}

const MapComponent = ({
  sourceUrl,
  markers,
  centerCoords,
  getDataCallback,
  showFormCallback,
  geolocation,
}: MapProps) => {
  const mapRef: Ref<any> = useRef(null);
  let id;

  const source = new TileJSON({
    url: sourceUrl,
    tileSize: 512,
    crossOrigin: 'anonymous',
  });

  const vectorSource = new VectorSource({});

  useEffect(() => {
    const map: Map = new Map({
      interactions: defaultInteractions().extend([new PinchZoom()]),
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
        center: fromLonLat(centerCoords),
        zoom: 17,
      }),
    });

    const button: HTMLButtonElement = document.createElement('button');
    button.innerHTML = '<div class="center-btn-icon"></div>';
    const element: HTMLDivElement = document.createElement('div');
    element.className = 'center-btn ol-unselectable ol-control';
    const centerBtn = new Control({ element: element });

    if (markers) {
      markers.forEach((el) => {
        const marker: Feature = new Feature({
          geometry: new Point(fromLonLat(el)),
          name: 'Catch',
        });
        marker.setStyle(
          new Style({
            image: new Icon({
              crossOrigin: 'anonymous',
              // For Internet Explorer 11
              scale: 0.04,
              src: '/fish.svg',
            }),
          })
        );
        vectorSource.addFeature(marker);
      });
    }

    map.on('click', (evt) => {
      const coords = toLonLat(evt.coordinate);
      getDataCallback(coords);
      showFormCallback();
    });

    map.addControl(centerBtn);

    if (geolocation) {
      if ('geolocation' in navigator) {
        let currPosition;

        const errorCallback = (err: any): void => {
          console.log(err.code, err.message);
        };

        // Set user marker
        const userMarker: Feature = new Feature({
          name: 'User',
          geometry: new Point(centerCoords),
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

        // Watch position
        id = navigator.geolocation.watchPosition((position) => {
          currPosition = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          userMarker.setGeometry(new Point(currPosition));
        }, errorCallback);

        // Center on user pos
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

        button.addEventListener('click', function (): void {
          map.getView().animate({ zoom: 19, center: currPosition });
        });
        element.appendChild(button);
      } else {
        console.log('Geolocation not allowed');
      }
    }

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [
    sourceUrl,
    markers,
    centerCoords,
    getDataCallback,
    showFormCallback,
    geolocation,
  ]);

  return (
    <div
      id="map"
      className="w-full h-full m-auto  cursor-pointer border border-gray-400 bg-gray-600 rounded"
      ref={mapRef}
    >
      {' '}
    </div>
  );
};

export const MemoMapComponent = memo(MapComponent, (prevProps, nextProps) => {
  if (prevProps.markers === nextProps.markers) {
    return true;
  } else {
    return false;
  }
});
