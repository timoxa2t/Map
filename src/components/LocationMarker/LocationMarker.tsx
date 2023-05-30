import { Marker, Popup } from 'react-leaflet'
import styles from './LocationMarker.module.scss';
import { LatLng } from 'leaflet';

interface Props {
  position: LatLng,
  popup: string,
}

export const LocationMarker: React.FC<Props> = ({ position, popup }) => {

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{popup}</Popup>
    </Marker>
  )
}