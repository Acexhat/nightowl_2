import * as React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_PREFIX } from '../utils/Constants';

export default function AuthDashboard(props) {
    const navigate = useNavigate();
    React.useEffect(() => {
        // Authentication
        const token = localStorage.getItem("token");
        if (token) {
            // check for authentication properly
            let headersList = {
                "Authorization": `Bearer ${token}`
            }

            let reqOptions = {
                url: `${API_PREFIX}api/private`,
                method: "GET",
                headers: headersList,
            }

            axios.request(reqOptions).then(function (response) {
                if (response.data.success) navigate('/dashboard');
                else navigate('/login')
            }).catch((err) => {
                console.log(err);
                navigate('/login')
            })
        } else {
            // route to login
            navigate('/login')
        }
    }, [])

    return (
        <div>
            Hello
        </div>
    );
}