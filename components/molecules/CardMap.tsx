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
import Control from 'ol/control/Control';
import { fromLonLat, toLonLat } from 'ol/proj';

type CardMapProps = {
  catchMarkersCoords?: Array<Array<Number>>;
};

const CardMap = ({ catchMarkersCoords }: CardMapProps): JSX.Element => {
  const mapRef: Ref<any> = useRef(null);

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
    });

    if (catchMarkersCoords) {
      catchMarkersCoords.forEach((el) => {
        const catchMarker: Feature = new Feature({
          geometry: new Point(fromLonLat(el)),
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
      });
    }

    // map.on('click', (evt) => {
    //   const coords = toLonLat(evt.coordinate);
    //   getDataCallback(coords);
    //   showFormCallback();
    // });

    // if ('geolocation' in navigator) {
    //   let currPosition;

    //   const errorCallback = (err: any): void => {
    //     console.log(err.code, err.message);
    //   };

    //   const watchLocation = (): void => {
    //     const userMarker: Feature = new Feature({
    //       name: 'User',
    //       geometry: new Point(polandWebMercator),
    //     });
    //     userMarker.setStyle(
    //       new Style({
    //         image: new Icon({
    //           crossOrigin: 'anonymous',
    //           src: '/point.svg',
    //           scale: 0.1,
    //         }),
    //       })
    //     );
    //     vectorSource.addFeature(userMarker);

    //     id = navigator.geolocation.watchPosition((position) => {
    //       currPosition = fromLonLat([
    //         position.coords.longitude,
    //         position.coords.latitude,
    //       ]);
    //       userMarker.setGeometry(new Point(currPosition));
    //     }, errorCallback);
    //   };

    //   const centerOnUser = (): void => {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const viewPosition: Array<Number> = fromLonLat([
    //           position.coords.longitude,
    //           position.coords.latitude,
    //         ]);
    //         map.getView().animate({ zoom: 19, center: viewPosition });
    //       },
    //       errorCallback,
    //       { timeout: 10000, enableHighAccuracy: true }
    //     );
    //   };

    //   watchLocation();
    //   centerOnUser();

    //   const button: HTMLButtonElement = document.createElement('button');
    //   button.innerHTML = '<div class="center-btn-icon"></div>';
    //   const element: HTMLDivElement = document.createElement('div');
    //   element.className = 'center-btn ol-unselectable ol-control';
    //   button.addEventListener('click', function (): void {
    //     map.getView().animate({ zoom: 19, center: currPosition });
    //   });
    //   element.appendChild(button);
    //   const centerBtn = new Control({ element: element });
    //   map.addControl(centerBtn);
    // }

    return () => {
      //   navigator.geolocation.clearWatch(id);
    };
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
  if (prevProps.catchMarkersCoords === nextProps.catchMarkersCoords) {
    return true;
  } else {
    return false;
  }
});
