import { Form, Button, Spinner } from 'react-bootstrap';
import styles from './ModalForm.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LatLng } from 'leaflet';
import { Marker } from '../../types/Marker';
import { createMarker } from '../../servises/api';

type setMarkersCallback = (prev: Marker[]) => Marker[]

interface Props {
  setMarkers: (callback: setMarkersCallback) => void,
  setIsModalVisible: (visible: boolean) => void,
  latLng: LatLng,
}

export const ModalForm: React.FC<Props> = ({
  setMarkers,
  setIsModalVisible,
  latLng,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(latLng.lat);
  const [longitude, setLongitude] = useState(latLng.lng);


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(event.target.value));
  }

  const handleLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLongitude(Number(event.target.value));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name) {
      return
    }

    setIsLoading(true);

    createMarker({
      name,
      description,
      latitude,
      longitude,
    }).then(newMarker => {
      setMarkers(prevMarkers => [
        ...prevMarkers,
        newMarker,
      ]);
    })
    .finally(() => {
      setIsLoading(false);
      setIsModalVisible(false);
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Home"
              value={name}
              onChange={handleNameChange}
              required
            />
            <Form.Text className="text-muted">
              Enter name for your marker
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Here I live"
              value={description}
              onChange={handleCommentChange}
            />
            <Form.Text className="text-muted">
              Enter description for your marker
            </Form.Text>
          </Form.Group>

          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Home"
              value={latitude}
              onChange={handleLatitudeChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Home"
              value={longitude}
              onChange={handleLongitudeChange}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type='submit'
            disabled={isLoading}
          >
            Save
          </Button>

          {'  '}

          <Button
            variant="danger"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Form>
      </div>
      
      {isLoading && (
        <div className={styles.modal__spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}