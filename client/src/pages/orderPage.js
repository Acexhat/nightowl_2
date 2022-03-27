import * as React from 'react';
import { useLocation, useParams } from 'react-router';

export default function OrderPage(props) {
    const { id } = useParams();
    const { state } = useLocation();

    console.log(state);

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#EDEDED",
        }}>
            WELCOME TO ORDER PAGE - {id}
        </div>
    );
}