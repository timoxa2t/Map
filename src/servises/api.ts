import axios from 'axios';
import { Marker } from '../types/Marker';

const BASE_URL = 'https://seahorse-app-7wlro.ondigitalocean.app'
// const BASE_URL = 'http://localhost:3000'

export const getMarkers = async (): Promise<Marker[]> => {
  const response = await axios.get(`${BASE_URL}/marker`);

  return response.data;
}

export const createMarker = async (marker: Omit<Marker, 'id'>): Promise<Marker> => {
  const response = await axios.post(`${BASE_URL}/marker`, marker);

  return response.data;
}

export const deleteMarker = async (id: number): Promise<Marker> => {
  const response = await axios.delete(`${BASE_URL}/marker/${id}`);

  return response.data;
}

export const editMarker = async (marker: Marker): Promise<Marker> => {
  const response = await axios.put(`${BASE_URL}/marker/${marker.id}`, marker);

  return response.data;
}