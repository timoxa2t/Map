import { Marker, Popup } from 'react-leaflet'
import styles from './LocationMarker.module.scss';
import { LatLng } from 'leaflet';
import { Marker as MarkerType } from '../../types/Marker';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { deleteMarker } from '../../servises/api';

interface Props {
  marker: MarkerType,
  removeMarker: (id: number) => void,
}

export const LocationMarker: React.FC<Props> = ({ marker , removeMarker }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    name,
    description,
    latitude,
    longitude
  } = marker;

  const handleRemoveMarker = () => {
    setIsLoading(true);

    deleteMarker(id)
      .then(() => {
        removeMarker(id);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const position = new LatLng(latitude, longitude);

  return position === null ? null : (
    <Marker position={position}>
      <Popup className={styles.popup}>
        <Card>
          <Card.Header>
            {name}
          </Card.Header>

          <Card.Body>
            {description}
          </Card.Body>
        </Card>

        <Button
          variant='danger'
          className={styles.popup__delete}
          onClick={handleRemoveMarker}
          disabled={isLoading}
        >
          {isLoading
            ? (<Spinner />)
            : 'Delete'
          }
        </Button>
      </Popup>
    </Marker>
  )
}