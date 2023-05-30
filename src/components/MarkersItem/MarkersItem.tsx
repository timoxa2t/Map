import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './MarkersItem.module.scss';
import { Marker } from '../../types/Marker';
import { LatLng } from 'leaflet';

interface Props {
  marker: Marker,
  goToMarker: (position: LatLng) => void,
}

export const MarkersItem: React.FC<Props> = ({
  marker,
  goToMarker,
}) => {
  const { comment, position } = marker;

  return (
    <Card>
      <Card.Body className={styles.marker__content}>
        {marker.comment}
        <Button
          variant="primary"
          onClick={() => goToMarker(position)}
        >
          Go to marker
        </Button>
      </Card.Body>
    </Card>
  )
}