import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import mapStyles from "./mapStyles";
import axios from "axios";
import DetailDialog from "./orderDetailsPopUp";
import { selectUnstyledClasses } from "@mui/base";

const libraries = ["places"];
const mapContainerStyle = {
    height: "80vh",
    width: "80vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function Map(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCxybb6x6s3MOJUFj-9GfQ_V2zMtU5DY4c",
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(false);
    const [latlan, setLatLang] = React.useState();

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const getLetLang = (address) => {
        // let headersList = {
        //     "Content-Type": "application/json"
        // }
        // const bodyContent = {
        //     "address": address
        // }
        // var config = {
        //     method: 'get',
        //     url: `/api/ship/getlatlang`,
        //     headers: headersList,
        //     data: bodyContent
        // };

        // axios(config)
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        var geocoder = new window.google.maps.Geocoder();
        var address = "delhi";
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                console.log(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    React.useEffect(() => {
        getLetLang(props.address)
    }, [])

    React.useEffect(() => {
        console.log(latlan);
    }, [latlan])

    const handlePopUpclose = () => {
        setSelected(false);
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={latlan}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Marker
                    key={`${latlan?.lat}-${latlan?.lng}`}
                    position={{ lat: latlan?.lat, lng: latlan?.lng }}
                    onClick={() => {
                        setSelected(true);
                    }}
                />
            </GoogleMap>
            {selected ? <DetailDialog open={selected} handlePopUpclose={handlePopUpclose} data={props.data} /> : null}
        </div>
    );
}