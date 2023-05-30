import { MapContainer, TileLayer } from 'react-leaflet'
import styles from './Map.module.scss';
import { LocationMarker } from '../LocationMarker';
import { Marker } from '../../types/Marker';
import { MarkersEventHandler } from '../MarkersEventHandler';
import { LatLng } from 'leaflet';

type Callback = (prev: Marker[]) => Marker[];

interface Props {
  getComment: (
    callback: (comment: string) => void,
  ) => void,
  markers: Marker[],
  setMarkers: (arg: Callback) => void,
  targetLocation: LatLng,
}


export const Map: React.FC<Props> = ({
  getComment,
  markers,
  setMarkers,
  targetLocation,
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
          setMarkers={setMarkers}
          getComment={getComment}
          targetLoacation={targetLocation}
        />

        {markers.map(({ position, comment }) => (
          <LocationMarker position={position} popup={comment} />
        ))}
      </MapContainer>
    )
}