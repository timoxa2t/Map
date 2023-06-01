import Card from 'react-bootstrap/Card';
import styles from './MarkersItem.module.scss';
import { Marker } from '../../types/Marker';
import { LatLng } from 'leaflet';
import { deleteMarker } from '../../servises/api';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  marker: Marker,
  goToMarker: (position: LatLng) => void,
  removeMarker: (id: number) => void,
}

export const MarkersItem: React.FC<Props> = ({
  marker,
  goToMarker,
  removeMarker,
}) => {
  const {
    id,
    name,
    description,
    latitude,
    longitude
  } = marker;
  const position = new LatLng(latitude, longitude);
  const [isLoading, setIsLoading] = useState(false);

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


  return (
    <Card className={styles.marker}>
      <Card.Header className={styles.marker__header}>
        <button
          onClick={() => goToMarker(position)}
        >
          <span className={styles.marker__title}>{name}</span>
          {' '}
          <div className={styles.marker__goto}></div>
        </button>
        

        <div className={styles.marker__actions}>
          <button
            className={styles.marker__edit}
            onClick={() => {}}
          ></button>

          <button
            className={styles.marker__delete}
            onClick={handleRemoveMarker}
          >
            &times;
          </button>
        </div>
        
      </Card.Header>

      <Card.Body className={styles.marker__body}>
        {description}
      </Card.Body>

      {isLoading && (
        <div className={styles.marker__loader}>
          <Spinner />
        </div>
      )}
    </Card>
  )
}