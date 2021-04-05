import { Ref, useState, useEffect, useRef, memo } from 'react';
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
import Overlay from 'ol/Overlay';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

interface CatchDataType {
  author_email: string;
  author_name: string;
  author_photo: string;
  author_uid: string;
  bait: string;
  coords: Array<number>;
  date: string;
  exists: boolean;
  hasPendingWrites: boolean;
  id: string;
  image: string;
  length: string;
  method: string;
  private: boolean;
  species: string;
  time: string;
  weight: string;
  __snapshot: any;
}
export interface MapProps {
  sourceUrl: string;
  markers?: Array<Number>;
  catchData?: Array<CatchDataType>;
  centerCoords: Array<Number>;
  getDataCallback?: (args: Array<Number>) => void;
  showFormCallback?: () => void;
  geolocation?: boolean;
  zoom?: number;
  tooltips?: boolean;
}

const MapComponent = ({
  sourceUrl,
  catchData,
  markers,
  centerCoords,
  getDataCallback,
  showFormCallback,
  geolocation,
  zoom,
  tooltips,
}: MapProps) => {
  const mapRef: Ref<any> = useRef(null);
  let id: undefined | number;
  let popupContainer: undefined | HTMLElement;
  let popupContent: undefined | HTMLElement;
  let popup: Overlay;
  const zoomVal = zoom ? zoom : 6;
  const t = useLanguage() === 'en' ? en : pl;

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
        zoom: zoomVal,
      }),
    });

    const button: HTMLButtonElement = document.createElement('button');
    button.innerHTML = '<div class="center-btn-icon"></div>';
    const element: HTMLDivElement = document.createElement('div');
    element.className = 'center-btn ol-unselectable ol-control';
    const centerBtn = new Control({ element: element });

    if (markers) {
      let marker: Feature;
      if (catchData) {
        console.log(catchData);
        catchData.forEach((el) => {
          marker = new Feature({
            geometry: new Point(fromLonLat(el.coords)),
            name: `${t[el.species]} - ${el.weight} kg`,
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
      } else {
        markers.forEach((el) => {
          marker = new Feature({
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
    }

    if (showFormCallback && getDataCallback) {
      map.on('click', (evt) => {
        const coords = toLonLat(evt.coordinate);
        getDataCallback(coords);
        showFormCallback();
      });
    }

    if (tooltips) {
      popupContainer = document.getElementById('popup');
      popupContent = document.getElementById('popup-content');
      popup = new Overlay({
        element: popupContainer,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });
      map.addOverlay(popup);
      map.on('pointermove', function (evt) {
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          function (feature) {
            return feature;
          }
        );
        const pixel = map.getEventPixel(evt.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
        if (feature) {
          var coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          popupContent.innerHTML = `${feature.get('name')}`;
          popup.setPosition(coordinates);
          console.log(coordinates);
        } else {
          popup.setPosition(undefined);
        }
      });
    }

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
    <>
      <div
        id="map"
        className={`w-full h-full m-auto  ${
          getDataCallback ? 'cursor-pointer' : null
        } border border-gray-400 bg-gray-600 rounded`}
        ref={mapRef}
      >
        {' '}
      </div>
      <div
        id="popup"
        className="ol-popup absolute w-32 p-2 text-xs text-center bg-white text-gray-900 shadow border-2 rounded -top-8 -left-16"
      >
        <div id="popup-content"></div>
        <div className="ol-popup-arrow w-2 h-2 relative m-auto top-4 shadow bg-white"></div>
      </div>
    </>
  );
};

export const MemoMapComponent = memo(MapComponent, (prevProps, nextProps) => {
  if (prevProps.sourceUrl === nextProps.sourceUrl) {
    return true;
  } else {
    return false;
  }
});
