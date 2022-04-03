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
import Geocode from "react-geocode";
import mapStyles from "./mapStyles";
import axios from "axios";
import DetailDialog from "./orderDetailsPopUp";
import { selectUnstyledClasses } from "@mui/base";

const libraries = ["places"];
const mapContainerStyle = {
    height: "80vh",
    width: "50vw",
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
    const [latlan, setLatLang] = React.useState({
        lat: 28.7041,
        lng: 77.1025
    });

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
        Geocode.setApiKey("AIzaSyCxybb6x6s3MOJUFj-9GfQ_V2zMtU5DY4c");
        Geocode.fromAddress("Eiffel Tower").then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
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
                zoom={14}
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