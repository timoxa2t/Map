import { MapContainer, TileLayer } from 'react-leaflet'
import styles from './Map.module.scss';
import { LocationMarker } from '../LocationMarker';
import { Marker } from '../../types/Marker';
import { MarkersEventHandler } from '../MarkersEventHandler';
import { LatLng, marker } from 'leaflet';

interface Props {
  getModalForm: (
    coords: LatLng,
  ) => void,
  markers: Marker[],

  targetLocation: LatLng,
}


export const Map: React.FC<Props> = ({
  markers,
  targetLocation,
  getModalForm,
}) => {
 
    return (
      <MapContainer
        center={targetLocation}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkersEventHandler
          getModalForm={getModalForm}
          targetLoacation={targetLocation}
        />

        {markers.map(marker => (
          <LocationMarker key={marker.id} marker={marker} />
        ))}
      </MapContainer>
    )
}