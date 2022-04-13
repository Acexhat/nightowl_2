import { positions } from '@mui/system';
import React, { useState } from 'react';
import './timeline.css';
import BasicTooltip from '../atomic/tooltipComp';
import { Tooltip } from '@mui/material';

export default function TimeLineComp({ data }) {

    const [date, setDate] = React.useState("");

    const getDateFormat = (data) => {
        let datetemp;
        if (typeof data === "object") {
            datetemp = data.date;
        } else {
            datetemp = data;
        }

        let date = new Date(datetemp);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return dateString;
    }

    const getStatus = (index) => {
        console.log("status", data?.shipment_track_activities[index]?.status);
    }

    return (
        <div id="app" class="container">
            <div class="swiper-wrapper timeline">
                {data?.shipment_track_activities?.slice(0).reverse().map((item, index) => {
                    return (
                        <div class="swiper-slide" key={index}>
                            {index !== data?.shipment_track_activities.length - 1 ? (
                                <Tooltip arrow title={typeof item?.status == 'string' ? item?.status.replace(/_/g, ' ') : item?.status} placement="top">
                                    <div>
                                        <div class="timestamp">
                                            <span class="date">{getDateFormat(item?.date)}</span>
                                        </div>
                                        <div class="status" onClick={() => getStatus(index)}>
                                            <span>{item?.location}</span>
                                        </div>
                                    </div>
                                </Tooltip>) : (
                                <Tooltip arrow title={item?.status} placement="top">
                                    <div style={{
                                        width: "70%",
                                    }}>
                                        <div class="timestamp">
                                            <span class="date">{getDateFormat(item?.date)}</span>
                                        </div>
                                        <div class="final_status">
                                            <span>{item?.location}</span>
                                        </div></div></Tooltip>)
                            }
                        </div>
                    )
                })}
            </div>
        </div >
    );
}