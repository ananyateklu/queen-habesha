'use client';

import { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
    lat: 44.790008,
    lng: -93.234089
};

const GoogleMapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    });

    const onUnmount = useCallback(function callback() {
        // Additional cleanup if needed
    }, []);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerClassName="w-full h-full rounded-xl"
            center={center}
            zoom={16}
            onUnmount={onUnmount}
        >
            <Marker position={center} />
        </GoogleMap>
    );
};

export default GoogleMapComponent; 