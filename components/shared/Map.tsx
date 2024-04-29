"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/app/lib/getCountries';
import { icon } from 'leaflet';

const ICON = icon({
    iconUrl: 'https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-map-location-marker.png',
    iconSize: [50,50],
})

export default function Map({locationValue}: {locationValue: string}){

    const { getCountryByValue } = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLong;

    return(
        <MapContainer 
            scrollWheelZoom={false} 
            className='h-[50vh] rounded-lg relative z-0' 
            center={ latLang ?? [52.505, -0.09]} 
            zoom={9}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={ latLang ?? [51.505, -0.09]} icon={ICON}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}