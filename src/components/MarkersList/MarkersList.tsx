import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './MarkersList.module.scss';
import { Marker } from '../../types/Marker';
import { LatLng, latLng } from 'leaflet';
import { MarkersItem } from '../MarkersItem';

interface Props {
  markers: Marker[],
  isShown: boolean,
  setShow: (show: boolean) => void,
  goToMarker: (position: LatLng) => void,
}

export const MarkersList: React.FC<Props> = ({
  isShown,
  setShow,
  markers,
  goToMarker,
}) => {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={isShown} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Marker List</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {markers.map(marker => (
            <li
              key={latLng.toString()}
              className={styles.markers__item}
            >
              <MarkersItem marker={marker} goToMarker={goToMarker}/>
            </li>
          ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  )
}