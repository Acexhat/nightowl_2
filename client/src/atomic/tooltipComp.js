import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip({ childern, title }) {
    console.log(childern, title)
    return (
        <Tooltip title={title}>
            {childern}
        </Tooltip>
    );
}