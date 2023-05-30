import React, { useState } from 'react';
import styles from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { Map } from './components/Map';
import { ModalForm } from './components/ModalForm';
import { MarkersList } from './components/MarkersList';
import { Marker } from './types/Marker';
import { LatLng } from 'leaflet';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [modalCallback, setModalCallback] = useState<(comment: string) => void>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [targetLocation, setTargetLocation]
    = useState<LatLng>(new LatLng(50.443076, 30.534439));


  const getComment = (
    callback: (comment: string) => void) => {
    setModalCallback(() => callback);
    setIsModalVisible(true);
  };

  const goToMarker = (position: LatLng) => {
    setTargetLocation(position);
  }

  return (
    <div>
      <main>
        <MarkersList
          markers={markers}
          isShown={isListVisible}
          setShow={setIsListVisible}
          goToMarker={goToMarker}
        />
  
        <Map 
          getComment={getComment}
          markers={markers}
          setMarkers={setMarkers}
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
          callback={modalCallback}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
}

export default App;
