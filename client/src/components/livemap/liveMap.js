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
import DetailDialog from "../orderDetailsPopUp";
import { selectUnstyledClasses } from "@mui/base";
import { API_PREFIX } from "../../utils/Constants";
import { useSelector } from "react-redux";
import MopedRoundedIcon from '@mui/icons-material/MopedRounded';

const libraries = ["places"];
const mapContainerStyle = {
    height: "100%",
    width: "100%",
    borderRadius: "4px"
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function LiveMap(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCxybb6x6s3MOJUFj-9GfQ_V2zMtU5DY4c",
        libraries,
    });
    const { allLatLangs, ordersByShipments } = useSelector((state) => state.data);
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(false);
    const [sendDataToDialog, setSendDataToDialog] = React.useState([]);
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

    React.useEffect(() => {

    }, [])

    const handlePopUpclose = () => {
        setSelected(false);
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={latlan}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {allLatLangs && allLatLangs?.map((item, idx) => {
                    return (
                        <Marker
                            key={`${item?.addresses[0]?.latitude}-${item?.addresses[0]?.longitude}`}
                            icon={MopedRoundedIcon}
                            position={{ lat: item?.addresses[0]?.latitude, lng: item?.addresses[0]?.longitude }}
                            onClick={() => {
                                setSendDataToDialog(ordersByShipments[idx]?.data?.data)
                                setSelected(true);
                            }}
                        />
                    )
                })}
            </GoogleMap>
            {selected ? <DetailDialog open={selected} handlePopUpclose={handlePopUpclose} data={sendDataToDialog} /> : null}
        </div>
    );
}