import { useMapEvents } from 'react-leaflet'
import styles from './Map.module.scss';
import { Marker } from '../../types/Marker';
import { LatLng } from 'leaflet';
import { useEffect } from 'react';

type Callback = (prev: Marker[]) => Marker[];

interface Props {
  setMarkers: (arg: Callback) => void,
  getComment: (
    callback: (comment: string) => void,
  ) => void,
  targetLoacation: LatLng,
}

export const MarkersEventHandler: React.FC<Props> = ({
  setMarkers,
  getComment,
  targetLoacation,
}) => {



  const map = useMapEvents({
    dblclick(event) {

      const addMarker = (comment: string) => {
        console.log('callback called', comment)
        if (!comment) {
          return;
        }

        setMarkers(prevMarkers => [
          ...prevMarkers,
          { position: event.latlng, comment },
        ])

        map.flyTo(event.latlng, map.getZoom())
      }
      getComment(addMarker);      
    },
  })

  useEffect(() => {
    if (map) {
      map.flyTo(targetLoacation, map.getZoom())
    }
  }, [targetLoacation, map])


  return null
}