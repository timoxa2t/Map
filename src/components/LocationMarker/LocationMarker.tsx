import { Marker, Popup } from 'react-leaflet'
import styles from './LocationMarker.module.scss';
import { LatLng } from 'leaflet';
import { Marker as MarkerType } from '../../types/Marker';
import { Card } from 'react-bootstrap';

interface Props {
  marker: MarkerType,
}

export const LocationMarker: React.FC<Props> = ({ marker }) => {
  const {
    name,
    description,
    latitude,
    longitude
  } = marker;

  const position = new LatLng(latitude, longitude);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <Card className={styles.marker}>
          <Card.Header className={styles.marker__header}>
            {name}
          </Card.Header>

          <Card.Body className={styles.marker__body}>
            {description}
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  )
}