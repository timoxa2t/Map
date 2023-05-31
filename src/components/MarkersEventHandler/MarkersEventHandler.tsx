import { useMapEvents } from 'react-leaflet'
// import styles from './Map.module.scss';
import { LatLng } from 'leaflet';
import { useEffect } from 'react';

interface Props {
  getModalForm: (
    coords: LatLng,
  ) => void,
  targetLoacation: LatLng,
}

export const MarkersEventHandler: React.FC<Props> = ({
  getModalForm,
  targetLoacation,
}) => {



  const map = useMapEvents({
    click(event) {
      getModalForm(event.latlng);      
    },
  })

  useEffect(() => {
    if (map) {
      map.flyTo(targetLoacation, map.getZoom())
    }
  }, [targetLoacation, map])


  return null
}