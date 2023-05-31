import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Map } from './components/Map';
import { ModalForm } from './components/ModalForm';
import { MarkersList } from './components/MarkersList';
import { Marker } from './types/Marker';
import { LatLng } from 'leaflet';
import { getMarkers } from './servises/api';

const Kyiv = new LatLng(50.443076, 30.534439)

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [latLng, setLatLng] = useState<LatLng>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [targetLocation, setTargetLocation] = useState<LatLng>(Kyiv);


  useEffect(() => {
    getMarkers().then(
      markersFromServer => setMarkers(markersFromServer)
    );
  }, []);

  const getModalForm = (coords: LatLng) => {
    setLatLng(coords);
    setIsModalVisible(true);
  };

  const goToMarker = (position: LatLng) => {
    setTargetLocation(position);
  }

  const removeMarker = (id: number) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
  }

  return (
    <div>
      <main>
        <MarkersList
          markers={markers}
          isShown={isListVisible}
          setShow={setIsListVisible}
          goToMarker={goToMarker}
          removeMarker={removeMarker}
        />
  
        <Map 
          getModalForm={getModalForm}
          markers={markers}
          targetLocation={targetLocation}
        />

        <button
          className={styles['app__sidebar-button']}
          onClick={() => setIsListVisible(true)}
        >
          {'>'}
        </button>
      </main>

      {isModalVisible && (
        <ModalForm
          setMarkers={setMarkers}
          setIsModalVisible={setIsModalVisible}
          latLng={latLng || new LatLng(0, 0)}
        />
      )}
    </div>
  );
}

export default App;
